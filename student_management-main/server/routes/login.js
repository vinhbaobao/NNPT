import express from "express";
import {
  login,
  createStudentAccount,
  createTeacherAccount,
  deleteStudentAccount,
  changePassword,
} from "../controllers/login.controller.js";
const router = express.Router();

router.post("/login", login);

router.delete("/delete-student-account/:msv", deleteStudentAccount);

router.post("/create-student-account", createStudentAccount);
router.post("/create-teacher-account", createTeacherAccount);


router.patch("/change-password", changePassword);

// export default login;

export default router;
