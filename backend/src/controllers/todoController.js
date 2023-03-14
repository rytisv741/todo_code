import catchAsyncError from "../middlewares/catchAsyncError.js";
import Todo from "../models/Todo.js";

const updateTodo = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndUpdate(id, { ...req.body }, { new: true });

  if (!todo) {
    return next(new errorHandler("Failed to Updated the Todo", 400));
  }
  return res.status(200).json({ success: true, todo });
});

const addTodo = catchAsyncError(async (req, res, next) => {
  const todo = new Todo(req.body);
  todo.user = res.locals.user._id;
  await todo.save();
  if (!todo) {
    return next(new errorHandler("Failed to Create the Todo", 400));
  }

  return res.status(200).json({ success: true, todo });
});
const deleteTodo = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);

  return res.status(200).json({ success: true, todo });
});
const getTodos = catchAsyncError(async (req, res, next) => {
  const todos = await Todo.find({ user: res.locals.user._id }).populate('user');

  return res.status(200).json({ success: true, todos });
});
export { updateTodo, addTodo, deleteTodo, getTodos };
