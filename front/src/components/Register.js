import React, { useState } from 'react';
import { Form, Input,message,Button } from 'antd';
import { BASE_URL } from "../constants";
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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

function Register(props) {
    const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const {username,password} = values;

    const opt = {
        method: 'POST',
        url: `${BASE_URL}/signup`,
        data: {
            username: username,
            password: password
        },
        headers: { 'content-type': 'application/json'}
    };
    axios(opt)
    .then( response => {
        console.log(response)
        // case1: registered success
        if(response.status === 200) {
            message.success('Registration succeed!');
            props.history.push('/login');
        }
    })
    .catch( error => {
        console.log('register failed: ', error.message);
        message.success('Registration failed!');
        // throw new Error('Signup Failed!')
    })

  };

    return (
        <Form
      {...formItemLayout}
      form={form}
      name="register"
      className="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button className="register-btn" type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      </Form>
    );
}

export default Register;