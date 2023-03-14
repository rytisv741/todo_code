import { Router } from "express";
import { addTodo, updateTodo,deleteTodo,getTodos } from "../controllers/todoController.js";
import { authMiddleware, SetAuthUser } from "../middlewares/auth.js";


const todoRouter = Router();


todoRouter.get("/" , SetAuthUser, authMiddleware,getTodos )
todoRouter.post("/add", SetAuthUser, authMiddleware, addTodo);
todoRouter.post("/update/:id", SetAuthUser, authMiddleware, updateTodo);

todoRouter.delete("/delete/:id", SetAuthUser, authMiddleware, deleteTodo);


export default todoRouter;
