import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Button,
  InputNumber,
  message,
  Card,
  Space,
  Typography,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import sendAndGet from "../api/request";
import fetchSendAndGet from "../api/fetch";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface FormValues {
  username: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  age: number;
  education: string;
  skills: string[];
  startDate: [dayjs.Dayjs, dayjs.Dayjs];
  bio: string;
  agreement: boolean;
}

const FormPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const validatePhone = (_: any, value: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!value) {
      return Promise.reject(new Error("需要输入手机号"));
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error("请输入正确的十一位手机号"));
    }
    return Promise.resolve();
  };
  const validateUserName = (_: any, name: string) => {
    if (!name) {
      return Promise.reject(new Error("请输入用户名"));
    }
    if (name.length < 3) {
      return Promise.reject(new Error("用户名至少三个字符"));
    }
    return Promise.resolve();
  };
  let submittype: string = "";
  const onFinish = (values: FormValues) => {
    if (submittype === "axios") {
      console.log("=== 走 axios 提交 ===");
      console.log("数据:", values);
      message.success("提交成功。");
      sendAndGet.post("./todo", values).catch((error) => console.log(error.response?.status))
      }
      
      // form.resetFields()
     else {
      //fetch提交
      console.log("=== 走 Fetch 提交 ===");
      fetchSendAndGet(values).then((response) => {
        console.log(response?.status);
      });
      message.success("提交成功。");
    }
  };
  const onFinishFailed = (error: any) => {
    console.log("表单错误:", error);
    message.error("表单错误，无法提交。");
  };
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Title level={2}>表单页</Title>
      <Typography.Paragraph>
        请填写完整个人信息，其中带星号的是必填项。
      </Typography.Paragraph>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Divider orientation="center">基本信息</Divider>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ validator: validateUserName }]}
          >
            <Input placeholder="请输入用户名" prefix={<UserOutlined />}></Input>
          </Form.Item>
          <Form.Item
            name="email"
            label="电子邮件"
            rules={[
              { required: true, message: "请输入邮件" },
              { type: "email", message: "需要填写正确的邮件格式" },
            ]}
          >
            <Input placeholder="请输入邮件" prefix={<MailOutlined />}></Input>
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ validator: validatePhone }]}
          >
            <Input
              placeholder="请输入手机号"
              prefix={<PhoneOutlined />}
            ></Input>
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Radio.Group
              options={[
                { value: 1, label: "男" },
                { value: 2, label: "女" },
                { value: 3, label: "武装直升机" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[
              { required: true, message: "请输入年龄" },
              {
                type: "number",
                min: 18,
                max: 120,
                message: "年龄必须在18-120之间",
              },
            ]}
          >
            <InputNumber min={1} max={120} style={{ width: "100%" }} />
          </Form.Item>

          <Divider orientation="center">教育与技能</Divider>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item
              name="education"
              label="最高学历"
              rules={[{ required: true, message: "请选择学历" }]}
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
              rules={[{ required: true, message: "请至少选择一项技能" }]}
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
              rules={[{ required: true, message: "请选择日期范围" }]}
            >
              <RangePicker placeholder={["开始日期", "结束日期"]} />
            </Form.Item>
          </Space>

          <Divider orientation="center">其他信息</Divider>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item
              name="bio"
              label="个人简介"
              rules={[
                { required: true, message: "请输入个人简介" },
                { min: 10, message: "个人简介至少10个字符" },
              ]}
            >
              <TextArea rows={2} placeholder="请输入个人简介" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("必须同意用户协议")),
                },
              ]}
            >
              <Checkbox>
                我已阅读并同意 <a href="#">用户协议</a> 和{" "}
                <a href="#">隐私政策</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Space wrap>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => {
                    submittype = "axios";
                  }}
                >
                  使用axios提交表单
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => {
                    submittype = "fetch";
                  }}
                >
                  使用fetch提交表单
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
