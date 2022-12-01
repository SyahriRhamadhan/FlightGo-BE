import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image_user:{
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/duwoisvla/image/upload/v1669719046/photo1669719020_jtqxri.jpg"
    },
    password: DataTypes.STRING,
    role:  DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    visa: DataTypes.STRING,
    passport: DataTypes.STRING,
    izin: DataTypes.STRING,
},{
    freezeTableName:true
});

export default Users;