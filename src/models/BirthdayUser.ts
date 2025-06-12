import { Model, DataTypes } from "sequelize";
import database from "../database/database"

class BirthdayUser extends Model {
    public id!: number;
    public userId!: string; //Email Google
    public nama!: string;
    public tanggalLahir!: string;
    public imageId!: string;
    }

BirthdayUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    userId: {
        type: DataTypes.STRING,
        allowNull: true
        },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
        },
    tanggalLahir: {
        type: DataTypes.STRING,
        allowNull: false
        },
    imageId: {
        type: DataTypes.STRING,
        allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: "birthdays"
    }
).sync()
.then(() => console.log("Model Synced"))
.catch((error: any) => console.error("Error sync model: ${error.message}"));

export default BirthdayUser;