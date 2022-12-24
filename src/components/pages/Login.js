import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, notification } from 'antd';
import axios from '../../config/axios';
import localStorageService from '../../services/localStorageService';

export default function Login(props) {
  const onFinish = values => {
    const body = {
      email: values.email,
      password: values.password
    }
    //ส่ง request หา back-end
    axios.post("/users/login", body)
      .then(result => {
        // console.log(result)
        localStorageService.setToken(result.data.token)
        props.setRole("user")
      })
      .catch(err => {
        notification.error({
          message: `การเข้าสู่ระบบล้มเหลว`
        })
      })
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "white" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0" >
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://res.cloudinary.com/dv7ae30yk/image/upload/v1671608024/timo-stern-iUBgeNeyVy8-unsplash_c7xqtn.jpg"
                      alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <div>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          {/* <i className="fas fa-cubes fa-2x me-3" style={{color: `#ff6219`}}></i> */}
                          <span className="h1 fw-bold mb-0">Trippost</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                        <Form
                          className="App"
                          onFinish={onFinish}
                          style={{ width: "100%" }}
                        >

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
                              <Input className='form-control form-control-lg' placeholder="Email" />
                            </Form.Item>

                          </div>

                          <div className="form-outline mb-4">
                            <Form.Item
                              // label="Password"
                              name="password"
                              rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                              <Input type="password" className='form-control form-control-lg' placeholder="Password" />
                            </Form.Item>

                          </div>

                          <div className="pt-1 mb-4">

                            <button type="submit" className="btn  btn-block mb-4 btn-dark" >Sign in</button>
                          </div>

                        </Form>

                        <a className="small text-muted" href="#!">Forgot password?</a>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account?<p> </p>
                          <Link to="/register" style={{ color: "#393f81" }}>Sign up here</Link></p>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
