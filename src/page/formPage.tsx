import React from 'react';
import { Form, Input, Select, DatePicker, Checkbox, Radio, Button, InputNumber, message, Card, Space, Typography, Divider } from 'antd';
import dayjs from 'dayjs';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface FormValues {
  username: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  education: string;
  skills: string[];
  startDate: [dayjs.Dayjs, dayjs.Dayjs];
  bio: string;
  agreement: boolean;
}

const FormPage:React.FC = ()=>{
  const [form] = Form.useForm<FormValues>()
  const validatePhone = (_:any, value:string)=>{
    const phoneRegex = /^1[3-9]\d{9}$/;
    if(!value){
      return Promise.reject(new Error('需要输入手机号'))
    }
    if(!phoneRegex.test(value)){
      return Promise.reject(new Error('请输入正确的十一位手机号'))
    }
    return Promise.resolve()
  }
  const validateUserName=(_:any, name:string)=>{
    if(!name){
      return Promise.reject(new Error('请输入用户名'))
    }
    if(name.length<3){
      return Promise.reject(new Error('用户名至少三个字符'))

    }
    return Promise.resolve()
  }
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <Title level={2}>表单页</Title>
      <Typography.Paragraph>请填写完整个人信息，其中带星号的是必填项。</Typography.Paragraph>
      <Card>
      <Form
        form={form}
        layout='vertical'
      >
       <Divider orientation='center'>基本信息</Divider>
        <Form.Item
        name='username'
        label='用户名'
        rules={[{validator :validatePhone}]}
        >
          <Input placeholder='请输入用户名' prefix={<UserOutlined />}></Input>
        </Form.Item>
        
      </Form>
      </Card>
    </div>
  )
}

export default FormPage
