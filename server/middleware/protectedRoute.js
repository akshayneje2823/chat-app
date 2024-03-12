import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const protectedRoute = async (req, res, next) => {
 
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

    if (!decoded) {
        return res.status(404).json({
            success: false,
            error: "Unauthorized - Invalid token",
        });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "User not found",
        });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("ERROR: " + error)
    return res.status(500).json({
      success: false,
      error: "Unauthoriz ed",
    });
  }
};

export default protectedRoute;