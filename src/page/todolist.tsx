import React, { useState } from 'react';
import { List, Input, Button, Checkbox, Space, Typography, Radio, Card, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTodoStore } from '../store/todostore';
// import { useTodoContext } from '../store/TodoContext';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } from '../store/todoSlice';

const { Title, Text } = Typography;
const { Search } = Input;

type StateManagementType = 'zustand' | 'context' | 'redux';

const Todolist: React.FC = () => {
  const [stateManagement, setStateManagement] = useState<StateManagementType>('zustand');
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // Zustand状态
  const zustandStore = useTodoStore();
  
//   // Context API状态
//   const contextStore = useTodoContext();
  
//   // Redux状态
//   const reduxTodos = useAppSelector((state) => state.todos.todos);
//   const dispatch = useAppDispatch();

  // 根据选择的状态管理方案获取数据和方法
  const getStore = () => {
    switch (stateManagement) {
      case 'zustand':
        return zustandStore;
    //   case 'context':
    //     return contextStore;
    //   case 'redux':
    //     return {
    //       todos: reduxTodos,
    //       addTodo: (title: string) => dispatch(addTodo(title)),
    //       toggleTodo: (id: string) => dispatch(toggleTodo(id)),
    //       deleteTodo: (id: string) => dispatch(deleteTodo(id)),
    //       updateTodo: (id: string, title: string) => dispatch(updateTodo({ id, title })),
    //       clearCompleted: () => dispatch(clearCompleted()),
    //     };
      default:
        return zustandStore;
    }
  };

  const { todos, addTodo: addTodoMethod, toggleTodo: toggleTodoMethod, deleteTodo: deleteTodoMethod, 
    updateTodo: updateTodoMethod, clearCompleted: clearCompletedMethod } = getStore();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodoMethod(newTodo);
      setNewTodo('');
      message.success('任务添加成功');
    } else {
      message.error('任务内容不能为空');
    }
  };

  const handleEdit = (todo: any) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const handleSaveEdit = () => {
    if (editingText.trim() && editingId) {
      updateTodoMethod(editingId, editingText);
      setEditingId(null);
      setEditingText('');
      message.success('任务更新成功');
    } else {
      message.error('任务内容不能为空');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <Title level={2}>Todo List App</Title>
      <Card style={{ marginBottom: 20 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Radio.Group 
            value={stateManagement} 
            onChange={(e) => setStateManagement(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="zustand">Zustand</Radio.Button>
            {/* <Radio.Button value="context">Context API</Radio.Button>
            <Radio.Button value="redux">Redux Toolkit</Radio.Button> */}
          </Radio.Group>

          <Space style={{ width: '100%' }}>
            <Search
              placeholder="输入新任务"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onSearch={handleAddTodo}
              enterButton
              style={{ flex: 1 }}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAddTodo}
            >
              添加
            </Button>
          </Space>

          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Text type="secondary">
              已完成 {completedCount} / 总计 {todos.length}
            </Text>
            <Button 
              danger 
              onClick={clearCompletedMethod}
              disabled={completedCount === 0}
            >
              清除已完成
            </Button>
          </Space>
        </Space>
      </Card>

      <List
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                icon={<EditOutlined />}
                onClick={() => handleEdit(todo)}
                disabled={editingId !== null}
              />,
              <Button
                key="delete"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteTodoMethod(todo.id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Checkbox 
                  checked={todo.completed} 
                  onChange={() => toggleTodoMethod(todo.id)}
                />
              }
              title={
                editingId === todo.id ? (
                  <Space>
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onPressEnter={handleSaveEdit}
                      autoFocus
                    />
                    <Button type="primary" size="small" onClick={handleSaveEdit}>
                      保存
                    </Button>
                    <Button size="small" onClick={handleCancelEdit}>
                      取消
                    </Button>
                  </Space>
                ) : (
                  <span 
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.6 : 1,
                    }}
                  >
                    {todo.title}
                  </span>
                )
              }
              description={
                <Text type="secondary" style={{ fontSize: 12 }}>
                  创建于: {new Date(todo.createAt).toLocaleString()}
                </Text>
              }
            />
          </List.Item>
        )}
        locale={{
          emptyText: <Text type="secondary">暂无任务，开始添加吧！</Text>,
        }}
      />
    </div>
  );
};

export default Todolist;