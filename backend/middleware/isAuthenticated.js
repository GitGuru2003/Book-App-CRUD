import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default isAuthenticated;
