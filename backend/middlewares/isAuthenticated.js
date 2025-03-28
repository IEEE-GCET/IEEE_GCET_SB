import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // jwt.verify is synchronous; if verification fails, an error is thrown.
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId; // Attach user info to the request
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        // Option 1: Send an error response directly
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });

        // Option 2: Pass error to the centralized error handler (if set up)
        // next(error);
    }
};

export default isAuthenticated;
