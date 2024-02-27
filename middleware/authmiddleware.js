const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {

      req.body.userId = decoded.userId;
      req.body.authors = decoded.authors;
      next();
    } else {
      res.send({ msg: "you are not authorized " });
    }
  } else {
    res.send({ msg: "you are not authorized " });
  }
};
module.exports = { auth };
// ...