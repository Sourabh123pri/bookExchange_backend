const jwt = require("jsonwebtoken");
const user = require("../Database/UserSchema/userSchima");

const auth = async (req, res, next) => {
  const token = req.cookies.bookToken;
  try {
    if (token) {
      const tokenVerify = await jwt.verify(token, process.env.JWT_SECRAT);
      const userDetail = user.findById(tokenVerify._id);
      req.user = userDetail;
      next();
    } else {
      res.status(401).json({ message: "user not authorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
