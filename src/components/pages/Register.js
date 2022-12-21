import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';

import axios from '../../config/axios'

const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
function Register(props) {

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const body = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }
        //ส่ง request หา back-end
        axios.post("/users/register", body)
        .then(res => {
            console.log(res)
            notification.success({
                message:`คุณ ${values.firstName} สมัครสำเร็จเรียบร้อยแล้ว`
            });
            props.history.push("/login")
        })
        .catch( err => {
            notification.error({
                message: `การสมัครสมาชิกล้มเหลว`
            })
        })
    };

    return (
        <Row justify="center" >
            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div
                    className="Form"
                >
                    <Row justify="center">
                        <Title level={2} className="Title">
                            Register
                        </Title>
                    </Row>
                    <Divider className="Divider" />
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                      {/* FirstName */}
                        <Form.Item
                            name="firstName"
                            label={<span>First Name&nbsp;</span>}
                            rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>

                      {/* LastName */}
                        <Form.Item
                            name="lastName"
                            label={<span>Last Name&nbsp;</span>}
                            rules={[{ required: true, message: 'Please input your larst name!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
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
                            name="confirmPassword"
                            label="Confirm Password"
                            hasFeedback
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Comfirm Password ต้องตรงกับ Password")
                                        
                                    }
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                            <Button className="Button" type="primary" htmlType="submit">
                                Register
                            </Button>

                            <Link to="/login"><Button>Login</Button></Link>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default withRouter(Register)
// export default Register
