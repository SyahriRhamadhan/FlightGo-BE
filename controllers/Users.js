import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import res from "express/lib/response";

export const getRoot = async(req, res) => {
  res.status(200).json({
    status: "OK",
    message: "FlightGo API is up and running!",
  });
}
export const getUsers = async(req, res) => {
    if(req.user.role !== "admin") {
      return res.status(400).json({
          success: false,
          message: "Kamu gak bisa mengakses ini dengan role member",
      });
    }
    try {
        const users = await Users.findAll({
            attributes:['id','image_user','name','email', 'role','phone','address','visa','passport','izin','createdAt','updatedAt']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { email,name, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "member"
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const phone = user[0].phone;
        const address = user[0].address;
        const image_user = user[0].image_user;
        const accessToken = jwt.sign({userId, name, email, role, phone, address, image_user}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({userId, name, email, role, phone, address, image_user}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '183d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        const data = {
            userId,
            email,
            role,
            phone,
            address,
            accessToken,
            refreshToken,
        };
        return res.status(201).json({
            success: true,
            message: "Login Successfully",
            data: data,
        });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}
export const Whoami = async (req, res) => {
    try {
      const currentUser = req.user;
      res.status(200).json(currentUser)
    } catch (error) {
      console.log(error)
    }
}

//update user
export const Update = async(req, res,next) => {
  const id = req.params.id
  const compareId = req.user.userId== id;
  if (!compareId ) {
    res.status(401).json({
      status: "FAIL",
      message: "User who can edit or delete user data is him/herself."
    });
    return;
  }
  const users = await Users.findOne({
    where: {
        id: req.params.id
    }
  });
  const {name, phone, address,visa,passport,izin,image_user} = req.body;
    try {
      await Users.update({
        name: name,
        phone: phone,
        address: address,
        visa: visa,
        passport: passport,
        izin: izin,
        image_user: image_user,
    },{
        where:{
            id: users.id
        }
        
    });
    res.status(200).json({msg: "User Updated"});
    } catch (error) {
      console.log(error);
    }return next;

}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

