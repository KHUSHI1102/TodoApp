const Todo = require("../models/todoSchema");

const createTodo = async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = new Todo({
      todo,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodos = async (req, res) => {
  const { completed } = req.query;

  try {
    let filter = {};

    if (completed === 'true') {
      filter.isCompleted = true;
    }

    const todos = await Todo.find(filter);

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo, isCompleted } = req.body;
  try {
    const updated = await Todo.findByIdAndUpdate(
      id,
      { todo, isCompleted },
      { new: true }
    );
   
    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchTodos = async (req, res) => {
  const { query } = req.query; 
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const todos = await Todo.find({
      todo: { $regex: query, $options: "i" }, 
    });

    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found matching the search" });
    }

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  completeTodo,
  searchTodos,  
};
