import jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";
import { createError } from "./error.js";
// import User from "../models/UserModel"
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return next(createError(401, "You are not authenticated!"));
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return next(createError(403, "Token is not valid!"));
    req.user ={
        userId: decoded.userId,
        name: decoded.name,
        email : decoded.email,
        role: decoded.role,
        phone: decoded.phone,
        address: decoded.address,
        visa: decoded.visa,
        passport: decoded.passport,
        izin: decoded.izin,
    }
    req.email = decoded.email,
    req.role= decoded.role
    next();
    })
}
// export const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         if (req.user.id === req.params.id) {
//           next();
//         } else {
//           return next(createError(403, "You are not authorized!"));
//         }
//       });
// }


