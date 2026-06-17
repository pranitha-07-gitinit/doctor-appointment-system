const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // remove "Bearer " if present
    const actualToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // contains user id
    next();

  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;