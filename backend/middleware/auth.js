const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware for general authentication
const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: If you need to fetch additional data from the database, uncomment the following lines:
    // const user = await User.findOne({ _id: decoded._id });
    // if (!user) {
    //   throw new Error();
    // }

    // Instead of querying the database, you can directly assign decoded values if sufficient
    req.user = decoded; // Use the decoded token payload

    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized" });
  }
};

// Middleware for admin authentication
const adminAuth = async (req, res, next) => {
  // Call the auth middleware first
  await auth(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access forbidden: Admins only" });
    }
    next();
  });
};

module.exports = { auth, adminAuth };
