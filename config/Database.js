import { Sequelize } from "sequelize";
 
const db = new Sequelize('railway', 'root', 'tvUJldyBIxNjbUE8RFmg', {
    host: "containers-us-west-76.railway.app",
    dialect: "mysql"
});
 
export default db;