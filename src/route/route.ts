// @ts-nocheck
import express from 'express';
import BirthdayController from '../controller/birthday_controller';
import upload from '../middleware/upload';

const router = express.Router();

router.get("birthday-user", BirthdayController.index);
router.get("birthday-user/:id", BirthdayController.show);

// Add
router.post("birthday-user", upload.single("image"), BirthdayController.store);

// Update
router.put("birthday-user/:id", upload.single("image"), BirthdayController.update);

// Delete
router.delete("birthday-user/:id", BirthdayController.destroy);


export default router;