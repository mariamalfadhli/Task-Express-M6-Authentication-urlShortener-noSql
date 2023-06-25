const notFoundHandler = (req, res, next) => {
  return res.status(500).json({ message: "PAGE NOT FOUND!!!!" });
};

module.exports = notFoundHandler;
