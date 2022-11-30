import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    image_user:{
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/duwoisvla/image/upload/v1669719046/photo1669719020_jtqxri.jpg"
    },
    password:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    phone:{
        type: DataTypes.INTEGER
    },
    address:{
        type: DataTypes.TEXT
    },
    visa:{
        type: DataTypes.STRING
    },
    passport:{
        type: DataTypes.STRING
    },
    izin:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
 
// (async () => {
//     await db.sync();
// })();
 
export default Users;