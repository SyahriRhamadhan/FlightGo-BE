// import { DataTypes } from "DataTypes";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
 
const product = db.define('product',{
    name:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.STRING
    },
    image_product:{
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/duwoisvla/image/upload/v1669719046/photo1669719020_jtqxri.jpg"
    },
    deskripsi: DataTypes.TEXT,
    kotaAsal: DataTypes.STRING,
    bandaraAsal: DataTypes.STRING,
    kotaTujuan: DataTypes.STRING,
    bandaraTujuan: DataTypes.STRING,
    idCountryAsal: DataTypes.STRING,
    idCountryTujuan: DataTypes.STRING,
    typeFlight: DataTypes.STRING,
    typeTrip: DataTypes.STRING,
    timeGo: DataTypes.STRING,
    timeBack: DataTypes.STRING,
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
},{
    freezeTableName:true
});

export default product;