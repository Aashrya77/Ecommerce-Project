const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.send("User Unauthenticated");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, user: decoded.name };
    next();
  } catch (error) {
    res.send("Authentication Invalid");
  }
};

module.exports = authentication;
