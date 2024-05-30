const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const Role = db.Role;

exports.register = async (req, res) => {
  try {
    const { username, password, roles } = req.body;

    // Validate request parameters
    if (!username || !password) {
      return res.status(400).send({ message: 'Username and password are required!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword
    });

    // Determine role
    let role;
    if (roles && roles.trim() === 'admin') {
      role = await Role.findOne({ where: { name: 'admin' } });
      if (!role) {
        return res.status(400).send({ message: 'Admin role not found!' });
      }
    } else {
      role = await Role.findOne({ where: { name: 'user' } });
      if (!role) {
        return res.status(400).send({ message: 'User role not found!' });
      }
    }

    // Set the role for the user
    await user.setRoles([role]);

    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }]
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    const authorities = user.roles.map(role => role.name);

    res.status(200).send({
      id: user.id,
      username: user.username,
      roles: authorities,
      accessToken: token
    });
  } catch (error) {
    console.log("ERROR : ",error)
    res.status(500).send({ message: error.message });
  }
};

