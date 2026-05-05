import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
export interface TodoState {
  todos: TodoItem[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const saveTodos = localStorage.getItem("redux-todos");
  if (saveTodos) {
    const parsedTodos = JSON.parse(saveTodos, (key, value) =>
      key === "createdAt" ? new Date(value) : value,
    );
    return parsedTodos;
  }
  return [];
});

const todoSlice = createSlice({
  //接受一个对象作为参数
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createdAt: new Date(),
      };
      state.todos.push(newTodo);
      localStorage.setItem("redux-todos", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("redux-todos", JSON.stringify(state.todos));
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => (todo.id = action.payload));
      localStorage.setItem("redux-todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<{id:string;title:string}>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        localStorage.setItem("redux-todos", JSON.stringify(state.todos));
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem("redux-todos", JSON.stringify(state.todos));
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodos.pending, (state) => {
          state.status='loading';
        })
        .addCase(fetchTodos.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.todos = action.payload;
        });
    },
}
);
export const {addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted}=todoSlice.actions;
export default todoSlice.reducer;
