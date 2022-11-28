import express from "express";
import { getUsers,Register, Login, Logout, Whoami, Update } from "../controllers/Users.js";
import { verifyToken  } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
const prefix = "/v1/api/";

router.post(prefix + 'register-member', Register);
router.post(prefix + 'login', Login);
router.delete(prefix +'logout', Logout);

router.get(prefix + 'token', refreshToken);
router.get(prefix + 'users', verifyToken, getUsers);
router.put(prefix + 'users/:id',verifyToken,Update);
router.get(prefix + 'current-user',verifyToken, Whoami)



export default router;