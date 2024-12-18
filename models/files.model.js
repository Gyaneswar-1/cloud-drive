import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "Path is required"],
  },
  originalname: {
    type: String,
    required: [true, "Original file name required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required "],
  },
});
const file = mongoose.model("file", fileSchema);
export default file;
