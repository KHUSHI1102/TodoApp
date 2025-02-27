const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControllers");

router.post("/add", todoController.createTodo);
router.get("/", todoController.getTodos);
router.put("/edit/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.put("/complete/:id", todoController.completeTodo);
router.get('/search', todoController.searchTodos);

module.exports = router;
