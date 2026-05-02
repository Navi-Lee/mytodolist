import {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from "react";

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
interface TodoContextType {
  todos: TodoItem[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("it need to be used in a TodoProvider");
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  useEffect(() => {
    const saveTodos = localStorage.getItem("context-todos");
    if (saveTodos) {
      setTodos(
        JSON.parse(saveTodos, (key, value) =>
          key === "createdAt" ? new Date(value) : value,
        ),
      );
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("context-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newtodo: TodoItem = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newtodo]);
  };
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const deleteTodo = (id: string) => {
    setTodos((prevtodos) => prevtodos.filter((todo) => todo.id != id));
  };
  const updateTodo = (id: string, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };
  const clearCompleted = () => {
    setTodos((prevtodos) => prevtodos.filter((todo) => !todo.completed));
  };

  const value: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
