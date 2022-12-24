import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Form, Input, notification } from 'antd';
import axios from '../../config/axios'
import '../../App.css'

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
          message: `คุณ ${values.firstName} สมัครสำเร็จเรียบร้อยแล้ว`
        });
        props.history.push("/login")
      })
      .catch(err => {
        notification.error({
          message: `อีเมลนี้ถูกใช้ไปแล้ว`
        })
      })
  };

  return (
    <>
      <section className="text-center text-lg-start">

        <div className="container py-4" >
          <div className="row g-0 align-items-center">

            <div className="col-lg-6 mb-5 mb-lg-0 ">
              <div className="card cascading-right backdropFilter" style={{ background: " hsla(0, 0%, 100%, 0.55)" }}>
                <div className="card-body p-5 shadow-5 text-center  ">
                  <h2 className="fw-bold mb-1">Sign up</h2>
                  <p className="fw-bold mb-5">create trippost accout</p>

                  <Form

                    onFinish={onFinish}
                    style={{ width: "100%" }}
                  >
                    <div>
                      {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                      <div className="row">
                        <div className="col-md-6 mb-0">

                          <div className="">

                            <Form.Item
                              name="firstName"
                              placeholder="First Namet"
                              // label={<span>First Name&nbsp;</span>}
                              rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                            >
                              <Input placeholder="First name" />
                            </Form.Item>

                          </div>
                        </div>
                        <div className="col-md-6 mb-0">
                          <div className="form-outline">

                            <Form.Item
                              name="lastName"
                              // label={<span>First Name&nbsp;</span>}
                              rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
                            >
                              <Input placeholder="Last name" />
                            </Form.Item>

                          </div>
                        </div>
                      </div>

                      {/* <!-- Email input --> */}
                      <div className="form-outline mb-4">

                        <Form.Item
                          name="email"
                          // label="E-mail"
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
                          <Input placeholder="Email" />
                        </Form.Item>

                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4">

                        <Form.Item
                          name="password"
                          // label="Password"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your password!',

                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password placeholder="Password" />

                        </Form.Item>

                      </div>
                      <div className="form-outline mb-4">

                        <Form.Item
                          name="confirmPassword"
                          // label="Confirm Password"
                          hasFeedback
                          dependencies={["password"]}
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject("Comfirm Password ต้องตรงกับ Password")

                              }
                            })
                          ]}
                        >
                          <Input.Password placeholder="Confirm password" />
                        </Form.Item>

                      </div>

                      {/* <!-- Checkbox --> */}
                      <div className="d-flex justify-content-center mb-4">
                        <p>Wellcom to trippost blog</p>
                      </div>

                      {/* <!-- Submit button --> */}
                      <button type="submit" className="btn  btn-block mb-4 btn-dark" >
                        Sign up
                      </button>

                    </div>
                  </Form>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <img src="https://res.cloudinary.com/dv7ae30yk/image/upload/v1671611352/timo-stern-iUBgeNeyVy8-unsplash_2_yx9qwe.jpg" style={{ height: "700px" }} class="w-100 rounded-4 shadow-4"
                alt="" />

            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default withRouter(Register)