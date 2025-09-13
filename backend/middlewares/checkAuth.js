import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "user is not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // replacing userId with id
    const userId = decoded.id; 
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
