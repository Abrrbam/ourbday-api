import { Request, Response } from "express";
import Birthday from "../models/BirthdayUser";

const getBaseUrl = (req: Request): string => {
  const protocol = req.headers["x-forwarded-proto"] === "https" ? "https" : req.protocol;
  return `${protocol}://${req.get("host")}`;
};

const BirthdayController = {
  // Menampilkan semua data Birthday berdasarkan userId
  index: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
      const birthdays = await Birthday.findAll({ where: { userId } });

      return res.status(200).json({
        status: 200,
        message: "Data sent successfully.",
        birthdays,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching users: ${error.message}`,
      });
    }
  },

  // Menampilkan data Birthday berdasarkan ID
  show: async (req: Request, res: Response) => {
    try {
      const birthdayId = req.params.id;
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
        birthday,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching data: ${error.message}`,
      });
    }
  },

  // Menyimpan data Birthday baru
  store: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image is required",
        });
      }

      const baseUrl = getBaseUrl(req);
      const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;

      const newBirthday = await Birthday.create({
        ...req.body,
        imageUrl,
      });

      return res.status(201).json({
        status: "success",
        message: "Birthday created successfully.",
        newBirthday,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error creating data: ${error.message}`,
      });
    }
  },

  // Mengupdate data Birthday
  update: async (req: Request, res: Response) => {
    try {
      const birthdayId = req.params.id;
      const birthday = await Birthday.findByPk(birthdayId);

      if (!birthday) {
        return res.status(404).json({
          status: 404,
          message: "Birthday not found.",
        });
      }

      if (req.file) {
        const baseUrl = getBaseUrl(req);
        const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;
        req.body.imageUrl = imageUrl;
      }

      await birthday.update(req.body);

      return res.status(200).json({
        status: 200,
        message: "Birthday updated successfully.",
        birthday,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error updating data: ${error.message}`,
      });
    }
  },

  // Menghapus data Birthday
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
  },
};

export default BirthdayController;