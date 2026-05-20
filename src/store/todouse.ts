import { useState, useEffect } from "react";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoUse = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem("local-use-state-todos");
    if (saved) {
      return JSON.parse(saved, (key, value) =>
        key === "createdAt" ? new Date(value) : value,
      );
    }
    return [];
  });

  //持久化
  useEffect(() => {
    localStorage.setItem("local-use-state-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id: string, title: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
};
