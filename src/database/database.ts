import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbname = process.env.DB_NAME || "default_db";
const dbhost = process.env.DB_HOST || "localhost";
const dbuser = process.env.DB_USER || "default_user";
const dbpassword = process.env.DB_PASSWORD || "default_password";
const database = new Sequelize(dbname, dbuser, dbpassword, {
    host: dbhost,
    dialect: "mysql"
    })

database.authenticate()
.then(() => console.log("Database connected"))
.catch((error: any) => console.error(`Error Creating Database: ${error.message}`))

export default database;