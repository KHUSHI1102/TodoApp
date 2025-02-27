import React, { useState, useEffect } from "react";
import axiosCommonInstance from "../../Utils/axios/axiosCommonInstance";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosCommonInstance.get(
          `/todo/?completed=${filterCompleted}`
        );
        if (response.status === 200) {
          setTodos(response.data || []);
        } else {
          console.error("Failed to fetch todos. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [filterCompleted]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axiosCommonInstance.get(
          `/todo/search?query=${searchQuery}`
        );
        if (response.status === 200) {
          setTodos(response.data || []);
        } else {
          console.error("Failed to search todos. Status:", response.status);
        }
      } catch (error) {
        console.error("Error searching todos:", error);
      }
    } else {
      const fetchTodos = async () => {
        try {
          const response = await axiosCommonInstance.get(
            `/todo/`
          );
          if (response.status === 200) {
            setTodos(response.data || []);
          } else {
            console.error("Failed to fetch todos. Status:", response.status);
          }
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
      fetchTodos(); 
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const response = await axiosCommonInstance.post("/todo/add", {
          todo: newTodo,
          isCompleted: false,
        });
        if (response.status === 200 || response.status === 201) {
          setTodos([...todos, response.data]);
          setNewTodo("");
        } else {
          console.error("Failed to add todo. Status:", response.status);
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axiosCommonInstance.delete(`/todo/delete/${id}`);
      if (response.status === 200) {
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        console.error("Failed to delete todo. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = (id, task) => setEditTodo({ id, todo: task });

  const handleSaveEdit = async () => {
    if (editTodo) {
      try {
        const response = await axiosCommonInstance.put(
          `/todo/edit/${editTodo.id}`,
          { todo: editTodo.todo }
        );
        if (response.status === 200) {
          setTodos(
            todos.map((todo) =>
              todo._id === editTodo.id ? { ...todo, todo: response.data.todo } : todo
            )
          );
          setEditTodo(null);
        } else {
          console.error("Failed to save edit. Status:", response.status);
        }
      } catch (error) {
        console.error("Error saving edit:", error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const response = await axiosCommonInstance.put(`/todo/complete/${id}`);
      if (response.status === 200) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          )
        );
      } else {
        console.error("Failed to toggle complete. Status:", response.status);
      }
    } catch (error) {
      console.error("Error toggling complete:", error);
    }
  };

  const handleFilterCompleted = () => {
    setFilterCompleted(!filterCompleted);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center">Todo List</h1>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search todos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 pl-10 pr-4 w-full rounded-md"
          />
          <FiSearch
            className="absolute left-3 text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        <button
          onClick={handleFilterCompleted}
          className="ml-4 border border-blue-500 text-blue-500 p-2 rounded-md"
        >
          {filterCompleted ? "Show All" : "Show Completed"}
        </button>
      </div>

      <form onSubmit={handleAddTodo} className="mb-4 flex items-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md"
          placeholder="Add a new task"
        />
        <button
          type="submit"
          className="ml-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Task</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo) => (filterCompleted ? todo.isCompleted : true))
            .map((todo) => (
              <tr key={todo._id}>
                <td className="px-4 py-2 border-b">
                  {editTodo?.id === todo._id ? (
                    <input
                      type="text"
                      value={editTodo.todo}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, todo: e.target.value })
                      }
                      className="border border-gray-300 p-2 w-full rounded-md"
                    />
                  ) : (
                    <span className={todo.isCompleted ? "line-through" : ""}>
                      {todo.todo}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {editTodo?.id === todo._id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white p-2 rounded-md"
                    >
                      Save
                    </button>
                  ) : (
                    <div className="flex">
                      <FiEdit2
                        onClick={() => handleEditTodo(todo._id, todo.todo)}
                        className="cursor-pointer mx-2 text-primary-600"
                      />
                      <FiTrash2
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="cursor-pointer mx-2 text-primary-600"
                      />
                      <input
                        className="mx-2"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => handleToggleComplete(todo._id)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
