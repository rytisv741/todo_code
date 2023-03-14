import mongoose from "mongoose";
import validator from "validator";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: [100, "Username cannot exceed 100 characters"],
      required: [true, "Please enter Name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: [true, "Email already in use."],
      validate: [validator.isEmail, "Please enter a valid Email."],
    },
    surName: {
      type: String,
      trim: true,
      maxLength: [100, "Surname cannot exceed 100 characters"],
      required: [true, "Please enter Surname."],
    },
  },
  { timestamps: true }
);
// UserSchema.pre("init", async function (document) {
 
 
// }); 
const User = mongoose.model("User", UserSchema);

export default User;
