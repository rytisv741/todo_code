import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
      maxLength: [100, "Type cannot exceed 100 characters"],
      required: [true, "Please enter a Type."],
    },
    content: {
      type: String,
      required: [true, "Please enter your content."],
     
    },
    endDate: {
      type: Date,
      required: [true, "Please enter a valid EndDate."],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
