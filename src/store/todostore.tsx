import { create } from "zustand";
import { persist } from "zustand/middleware";
interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
interface TodoStore {
  todos: TodoItem[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
  setTodos: (todos: TodoItem[]) => void;
}
export const useTodoStore = create<TodoStore>()(
  persist((set) => ({
    todos: [],
    addTodo: (title) =>
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date(),
          },
        ],
      })),
    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      })),
    deleteTodo: (id) =>
      set((state) => ({ todos: state.todos.filter((todo) => todo.id != id) })),

    updateTodo: (id, title) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, title } : todo,
        ),
      })),

    clearCompleted: () =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.completed === false), //也可写为!todo.completed
      })),
    setTodos: (todos) => set({ todos: todos }),
  }), //

  { name: "todo-storage" },
)
);
