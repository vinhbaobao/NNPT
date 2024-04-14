import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["student", "manager","admin"],
    default: "student",
    required: true,
  },
  lop: {
    type: String,
    required: true,
  },
});
// export collection name 'users' storing login infomation
const Users = mongoose.model("users", userSchema);
export default Users;
