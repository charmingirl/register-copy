
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Flex,
  Select,
} from 'antd';

const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
interface DataType {
  id: string;
  key: React.Key;
  nickname: string;
  age: number;
  phone: string;
  gender: string;
  password: string;
}
const SignupForm: React.FC = () => {
  const [form] = Form.useForm();
   const navigate = useNavigate();
const [searchParams] = useSearchParams();
       const [id, setId] = useState<string>('')
       const [dataList, setDataList] = useState<DataType[]>([])

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const newData = { ...values, id: Math.random() }
        let data: DataType[] = []
    if (id) {
      newData.id = id
      data = editFun(dataList, newData)
      console.log('data-----',data);
      
    } else {
       
    const arr = window.localStorage.getItem('signList')
       data= arr ? JSON.parse(arr): []
    data.push(newData)
    }
    window.localStorage.setItem('signList', JSON.stringify(data))
    navigate('/')
  };
  // 修改注册信息
  const editFun = (arr: DataType[], obj: any) => {
    console.log('editFun',arr,'--',obj);
    const index = arr.findIndex(item => item.id == obj.id)
    if (index !== -1) {
      arr.splice(index, 1, obj)
      return arr
    }
    return []
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );


  useEffect(() => {
    /* 判断跳转链接是否有id
    const id = searchParams.get('id');
    */
    const id = searchParams.get('id') || '';    
    if (id) {
      setId(id)
      const arr = JSON.parse(window.localStorage.getItem('signList') || '')
      setDataList(arr)
      const curData = arr.filter((item:DataType) =>item?.id == id)
      form.setFieldsValue(curData[0])
    }
},[id])

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入有效邮箱',
          },
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请确认新密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('与新密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="昵称"
        rules={[{ required: true, message: '请输入昵称', whitespace: true }]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        name="phone"
        label="手机号"
        rules={[{ required: true, message: '请输入手机号' },{ pattern:new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"), message: '请输入正确格式手机号' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="性别"
        rules={[{ required: true, message: '请选择性别' }]}
      >
        <Select placeholder="请选择性别">
          <Option value="男">男</Option>
          <Option value="女">女</Option>
          <Option value="其他">其他</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Flex gap="small">
        <Button type="primary" htmlType="submit">
          注册
        </Button>
         <Button danger onClick={() => form.resetFields()}>
            重置
          </Button>
          </Flex>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;