exports.success = (res, data) => {
    res.status(200).send(data);
  };
  
  exports.error = (res, error) => {
    res.status(500).send({ message: error.message });
  };
  