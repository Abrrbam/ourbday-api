import { Request, Response } from "express";
import Birthday from "../models/BirthdayUser";

const BirthdayController = {
    index: async (req:Request, res:Response) => {
        try{
//             https://domain-name.com/birthday-user?userId=alamatemail@gmail.com;
            const userId = req.query.userId
            const birthdays = await Birthday.findAll({
                where: {
                    userId: userId
                    }
                })

            return res.status(200).json({
                status: 200,
                message: "Data sent successfully.",
                birthdays: birthdays
                })
            } catch (error: any) {
                return res.status(500).json({
                    status: 500,
                    message: `Error fetching data: ${error.message}`
                    })
                }
        },

    show: async (req: Request, res: Response) => {
        try {
// https://domain-name.com/birthday-user/1;
            const  birthdayId  = req.params.id;

            const birthday = await Birthday.findByPk(birthdayId);

            if (!birthday) {
                return res.status(404).json({
                    status: 404,
                    message: "Birthday not found.",
                });
            }

            return res.status(200).json({
                status: 200,
                message: "Data retrieved successfully.",
                birthday: birthday,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error fetching data: ${error.message}`,
            });
        }
    },

    store: async (req: Request, res: Response) => {
        try {
            if(!req.file) {
                return res.status(400).json({
                    status: 400,
                    message: `Image is required`,
                })
            }

//             https://domain-name.com/public/images/namagambar.jpg;
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;

            const newBirthday = await Birthday.create({
                ...req.body,
                imageId: imageUrl
            });

            return res.status(201).json({
                status: 201,
                message: "Birthday created successfully.",
                birthday: newBirthday,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error creating data: ${error.message}`,
            });
        }
    },

    update: async (req: Request, res: Response) => {
        try {

//             https://domain-name.com/birthday-user/1;
            const birthdayId = req.params.id;
            const birthday = await Birthday.findByPk(birthdayId);

            if (!birthday) {
                return res.status(404).json({
                    status: 404,
                    message: "Birthday not found.",
                });
            }

            if (req.file) {
//                 https://domain-name.com/public/images/namagambar.jpg;
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;
                req.body.imageUrl = imageUrl;
                }

            await birthday.update(req.body);

            return res.status(200).json({
                status: 200,
                message: "Birthday updated successfully.",
                birthday: birthday,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error updating data: ${error.message}`,
            });
        }
    },

    destroy: async (req: Request, res: Response) => {
        try {
            const birthdayId = req.params.id;
            const birthday = await Birthday.findByPk(birthdayId);

            if (!birthday) {
                return res.status(404).json({
                    status: 404,
                    message: "Birthday not found.",
                });
            }

            await birthday.destroy();

            return res.status(200).json({
                status: 200,
                message: "Birthday deleted successfully.",
            });
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error deleting data: ${error.message}`,
            });
        }
    }
};

export default BirthdayController;