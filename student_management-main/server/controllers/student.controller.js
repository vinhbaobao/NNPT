import Student from "../models/student.model.js";
import Users from "../models/user.model.js";
import xlsx from "xlsx";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import axios from "axios";
const headers = {
  "PRIVATE-KEY": "b9d2bf98-9a53-48aa-9513-c202983820ca",
};
export const getAllStudent = async (req, res) => {
  try {
    const ListStudents = await Student.find({ lop: req.params.lop });

    res.json({ success: true, ListStudents });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllStudent" });
  }
};

export const getAllTeacher = async (req, res) => {
  try {
    const ListTeachers = await Users.find({ role: ["manager"] });

    res.json({ success: true, ListTeachers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllStudent" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { name, birthday, gender, phone, address } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      { name, birthday, gender, phone, address }
    );
    if (updatedStudent) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updateStudent" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    console.log(req.body);
    const { name, lop } = req.body;
    const updatedTeacher = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      { name, lop }
    );
    if (updatedTeacher) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updateTeacher" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      msv,
      name,
      birthday,
      gender,
      phone,
      address,
      sum_of_credits,
      gpa,
      status,
      lop,
    } = req.body;

    const isExist = await Student.findOne({ msv });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "Student already exist!" });
    }

    const newStudent = new Student({
      msv,
      name,
      birthday,
      gender,
      phone,
      address,
      sum_of_credits,
      gpa,
      status,
      lop,
    });
    await newStudent.save();
    console.log("Create successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createStudent" });
  }
};

export const deleteStudent = async (req, res) => {
  // const userID = req.params.id;
  try {
    const deletedStudent = await Student.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedStudent) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteStudent" });
  }
};

export const deleteTeacher = async (req, res) => {
  // const userID = req.params.id;
  try {
    const deletedTeacher = await Users.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedTeacher) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteTeacher" });
  }
};

export const importFromExcel = async (req, res) => {
  try {
    const wb = xlsx.readFile("./uploads/import.xlsx", { cellDates: true });
    const ws = wb.Sheets["Sheet1"];
    const dataStudent = xlsx.utils.sheet_to_json(ws);
    console.log(dataStudent);
    const dataUser = [];

    // for (let i = 0; i < dataStudent.length; i++) {
    //   dataUser.push({
    //     username: dataStudent[i].msv,
    //     password: await argon2.hash(dataStudent[i].msv.toString()),
    //     lop: dataStudent[i].lop,
    //   });
    // }

    for (let i = 0; i < dataStudent.length; i++) {
      dataUser[i] = new Users({
        username: dataStudent[i].msv,
        password: await argon2.hash(dataStudent[i].msv.toString()),
        lop: dataStudent[i].lop,
      });
      await dataUser[i].save();
      jwt.sign({ userId: dataUser[i]._id }, process.env.ACCESS_TOKEN_SECRET);

      axios.post(
        "https://api.chatengine.io/users/",
        {
          username: dataStudent[i].msv.toString(),
          secret: dataStudent[i].msv.toString(),
        },
        {
          headers: headers,
        }
      );
    }
    //   console.log(dataUser);

    // const isCreatedUser = await Users.insertMany(dataUser);

    const isImported = await Student.insertMany(dataStudent);
    if (isImported) {
      res.send("Import successfully");
    } else {
      res.send("Import fail");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ importFromExcel" });
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const StudentDetail = await Student.find({ _id: req.params.id });
    res.json({ StudentDetail });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getStudentDetail" });
  }
};

export const getTeacherDetail = async (req, res) => {
  try {
    const StudentDetail = await Users.find({ _id: req.params.id });
    res.json({ StudentDetail });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getStudentDetail" });
  }
};
