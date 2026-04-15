import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button, Tabs } from "antd";
import "./app.css";
const Navi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = [
    {
      key: "/",
      label: "todolist",
    },
    {
      key: "/form/fuck",
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
      <Navi></Navi>
      <Routes>
        <Route path="/" element={<h1>path/</h1>} />
        <Route path="/form/fuck" element={<h1>path//form</h1>} />
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
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
