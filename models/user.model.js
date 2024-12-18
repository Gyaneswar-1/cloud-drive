import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "username must be 3 charecter long"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [13, "Email must be at least 13 characters long"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "password must be 6 charecter long"],
  },
});

export const user = mongoose.model("user", userSchema);
