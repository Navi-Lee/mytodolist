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

const FormPage = () => {
  const [form] = Form.useForm<FormValues>();

  // 自定义校验规则
  const validatePhone = (_: any, value: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!value) {
      return Promise.reject(new Error('请输入手机号'));
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error('请输入正确的11位手机号'));
    }
    return Promise.resolve();
  };

  const validateUsername = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入用户名'));
    }
    if (value.length < 3) {
      return Promise.reject(new Error('用户名长度至少为3个字符'));
    }
    return Promise.resolve();
  };



  const onFinish = (values: FormValues) => {
    console.log('表单数据:', values);
    message.success('表单提交成功！');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('表单错误:', errorInfo);
    message.error('表单提交失败，请检查错误信息');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <Title level={2}>用户信息表单</Title>
      <Paragraph type="secondary">
        请填写完整的个人信息，带 * 为必填项
      </Paragraph>

      <Card>
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

          initialValues={{
            gender: 'male',
            age: 20,
            education: 'bachelor',
            skills: [],
            agreement: false,
          }}
        >
          <Divider orientation="left">基本信息</Divider>
          
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ validator: validateUsername }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="手机号"
              rules={[{ validator: validatePhone }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
                <Radio value="other">其他</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="age"
              label="年龄"
              rules={[
                { required: true, message: '请输入年龄' },
                { type: 'number', min: 18, max: 120, message: '年龄必须在18-120之间' },
              ]}
            >
              <InputNumber min={1} max={120} style={{ width: '100%' }} />
            </Form.Item>
          </Space>

          <Divider orientation="left">教育与技能</Divider>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form.Item
              name="education"
              label="最高学历"
              rules={[{ required: true, message: '请选择学历' }]}
            >
              <Select placeholder="请选择最高学历">
                <Option value="highschool">高中</Option>
                <Option value="associate">专科</Option>
                <Option value="bachelor">本科</Option>
                <Option value="master">硕士</Option>
                <Option value="doctor">博士</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="skills"
              label="技能"
              rules={[{ required: true, message: '请至少选择一项技能' }]}
            >
              <Select mode="multiple" placeholder="请选择技能">
                <Option value="javascript">JavaScript</Option>
                <Option value="typescript">TypeScript</Option>
                <Option value="react">React</Option>
                <Option value="vue">Vue</Option>
                <Option value="node">Node.js</Option>
                <Option value="python">Python</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="startDate"
              label="预计工作日期"
              rules={[{ required: true, message: '请选择日期范围' }]}
            >
              <RangePicker placeholder={['开始日期', '结束日期']} />
            </Form.Item>
          </Space>

          <Divider orientation="left">其他信息</Divider>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form.Item
              name="bio"
              label="个人简介"
              rules={[
                { required: true, message: '请输入个人简介' },
                { min: 10, message: '个人简介至少10个字符' },
              ]}
            >
              <TextArea 
                rows={2} 
                placeholder="请输入个人简介"
              />
            </Form.Item>



            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('必须同意用户协议')),
                },
              ]}
            >
              <Checkbox>
                我已阅读并同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Space style={{ justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit" size="large">
                  提交表单
                </Button>
                <Button onClick={() => form.resetFields()} size="large">
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default FormPage;