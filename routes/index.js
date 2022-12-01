import express from "express";
import { getRoot, getUsers,Register, Login, Logout, Whoami, Update } from "../controllers/Users.js";
import { verifyToken  } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {getproduct, getproductById, createproduct, updateproduct, deleteproduct} from"../controllers/Product.js"
import {cereateTransaction} from "../controllers/Transaction.js"
const router = express.Router();
const prefix = "/v1/api/";
//root
router.get('/', getRoot);
router.get('/ticket', getproduct);
//auth
router.post(prefix + 'register-member', Register);
router.post(prefix + 'login', Login);
router.delete(prefix +'logout', Logout);

//user
router.get(prefix + 'token', refreshToken);
router.get(prefix + 'users', verifyToken, getUsers);
router.put(prefix + 'users/:id',verifyToken,Update);
router.get(prefix + 'current-user',verifyToken, Whoami)

//product
router.get(prefix + 'ticket', getproduct);
router.get(prefix + 'ticket/:id', verifyToken, getproductById);
router.post(prefix + 'ticket', verifyToken, createproduct);
router.put(prefix + 'ticket/:id', verifyToken, updateproduct);
router.delete(prefix + 'ticket/:id', verifyToken, deleteproduct);

//transaction
router.post(prefix + 'ticket/transaction', verifyToken, cereateTransaction);



export default router;