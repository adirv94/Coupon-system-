import React, { useState } from "react";
import { Formik } from "formik";

import { Input, Button, Tag } from "antd";
import { login } from "../client";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { errorNotification } from "../Notification";

const Login = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const inputBottomMargin = { marginBottom: "5px" };
  const tagStyle = {
    backgroundColor: "red",
    color: "black",
    ...inputBottomMargin,
  };
  function setUser(emailIn,tokenIn) {
    if (!tokenIn) {
      return;
    }
    const email = emailIn;
    const config = {
      headers: {
        Authorization: "Bearer " + tokenIn,
      },
    };
    axios
      .get("/user/" + email, config)
      // .get("/user/" + email)
      .then(
        (res) => {
          props.setData(res.data);
          localStorage.setItem("role", res.data.authorities[0].authority);
          const role = localStorage.getItem("role");
          if (localStorage.getItem("role") === "ROLE_COMPANY") {
            axios
              .get("CompanyApi/getCompanyId/" + email, config)
              .then((re) => {
                localStorage.setItem("companyId", re.data);
              });
          }
          else if (localStorage.getItem("role") === "ROLE_CUSTOMER") {
            axios
              .get("CustomerApi/getCustomerId/" + email, config)
              .then((re) => {
                localStorage.setItem("customerId", re.data);
              });
          }
          // console.log(res.data);
        }
        // (err) => {
        //   console.log(err);
        //   errorNotification();
        // }
      )
      .catch((err) => {
        console.log(err);
        // errorNotification();
      });
  }
  if (loggedIn) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h1 style={{ margin: "flex" }}>Login</h1>
          <Formik
            initialValues={{
              // username: '',
              password: "",
              username: "",
              //    gender: ''
            }}
            validate={(values) => {
              const errors = {};
              // if (!values.username) {
              //     errors.username = 'Username Required';
              // }
              if (!values.password) {
                errors.password = "Password Required";
              }
              if (!values.username) {
                errors.username = "Email Required";
              }
              //   else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = "Invalid email address";
              //   }
              // if (!values.gender) {
              //     errors.gender = 'Gender Required';
              // // } else if (!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
              // } else if (!['MALE','FEMALE'].includes(values.gender.toUpperCase()) ) {
              // errors.gender = 'Gender must be (MALE,male,FEMALE,female)';
              // }
              return errors;
            }}
            onSubmit={(user, { setSubmitting }) => {
              axios
                .post("/login", user)
                .then((res) => {
                  localStorage.setItem("token", res.headers.authorization);
                  localStorage.setItem("username", user.username);
                  // localStorage.setItem("config", {
                  //   headers: {
                  //     Authorization: "Bearer " + localStorage.getItem("token"),
                  //   },
                  // });

                  setLoggedIn(true);
                  //   console.log(res);
                  setUser(user.username,res.headers.authorization);
                  //   this.props.user;
                  //   setUser();
                  //   console.log(res.headers.authorization);
                  //   console.log(res);
                  // props.onSuccess();
                  // App.fetchStudents();
                })
                .catch((err) => {
                  // props.onFailure(err);
                  console.log(err);
                })
                .finally(() => {
                  setSubmitting(false);
                });
              // student.gender = student.gender.toUpperCase();
              // addNewStudent(student).then(() => {
              //     props.onSuccess();
              //     // App.fetchStudents();
              // })
              // .catch(err => {
              //     props.onFailure(err);
              // })
              // .finally(() => {
              //     setSubmitting(false);
              // })
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              submitForm,
              isValid,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                {/* <Input
                    style={inputBottomMargin}
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder='Username. E.g John'
                />
                {errors.username && touched.username &&
                    <Tag style={tagStyle}>{errors.username}</Tag>} */}
                <Input
                  style={inputBottomMargin}
                  type="email"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email. E.g example@gmail.com"
                />
                {errors.email && touched.email && (
                  <Tag style={tagStyle}>{errors.email}</Tag>
                )}
                <br />
                <Input
                  style={inputBottomMargin}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password. E.g ****"
                />
                {errors.password && touched.password && (
                  <Tag style={tagStyle}>{errors.password}</Tag>
                )}
                <br></br>
                {/* <Input
                    style={inputBottomMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder='Gender. E.g Male or Female'
                />
                {errors.gender && touched.gender
                    && <Tag style={tagStyle}>{errors.gender}</Tag>} */}
                <Button
                  onClick={() => submitForm()}
                  type="submit"
                  disabled={isSubmitting | (touched && !isValid)}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
