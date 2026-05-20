import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button, Tabs, Typography} from "antd";
import "./App.css";
import Todolist from './page/todolist'
import FormPage from "./page/formPage";
import { TodoProvider } from "./store/todocontext";
import { Provider } from "react-redux";
import {store} from './store'
const { Title } = Typography;
const Navi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = [
    {
      key: "/",
      label: "todolist",
    },
    {
      key: "/form",
      label: "表单示例",
    },
    {
      key: "/blank",
      label: "空白页面",
    },
  ];
  return (
    <Tabs
      activeKey={location.pathname}
      items={items}
      onChange={(key) => navigate(key as string)}
      style={{ marginBottom: 20 }}
    />
  );
};
const AppContent = () => {
  const navigate = useNavigate();
  return (
    <>
      
      <div className="container">
        <Title>Todolist，开始于2026/4/15</Title>
      <Navi/>
      <Routes>
        <Route path="/" element={<Todolist/>} />
        <Route path="/form" element={<FormPage/>}/>
        <Route path="/blank" element={<h1>path//blank</h1>} />
        <Route
          path="*"
          element={
            <h1>
              你进入了一片没有东西的荒原。
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                返回首页
              </Button>
            </h1>
          }
        />
      </Routes>
      </div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Provider store={store}>
      <TodoProvider>
      <AppContent />
      </TodoProvider>
      </Provider>
    </Router>
  );
}
