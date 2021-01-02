import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import axios from "axios";

function AddCustomerForm(props) {
    const inputBottomMargin = { marginBottom: "5px" };
    const tagStyle = {
      backgroundColor: "red",
      color: "black",
      ...inputBottomMargin,
    };
  
    function addCustomer(customer) {
      const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        return axios.post("/AdminApi/addCustomer", customer, config);
    }
  
    return (
      <Formik preserve={false}
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "First Name Required";
          }
          if (!values.lastName) {
            errors.lastName = "Last Name Required";
          }
          if (!values.password) {
            errors.password = "Password Required";
          }
          if (!values.email) {
            errors.email = "Email Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(customer, { setSubmitting }) => {
          addCustomer(customer)
            .then(() => {
              props.onSuccess();
              // App.fetchStudents();
            })
            .catch((err) => {
              props.onFailure(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
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
            <Input
              style={inputBottomMargin}
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              placeholder="First Name. E.g Maya"
            />
            {errors.firstName && touched.firstName && (
              <Tag style={tagStyle}>{errors.firstName}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder="Last Name. E.g Chen"
            />
            {errors.lastName && touched.lastName && (
              <Tag style={tagStyle}>{errors.lastName}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email. E.g example@gmail.com"
            />
            {errors.email && touched.email && (
              <Tag style={tagStyle}>{errors.email}</Tag>
            )}
            <Input.Password
              style={inputBottomMargin}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password. E.g ********"
            />
            {errors.password && touched.password && (
              <Tag style={tagStyle}>{errors.password}</Tag>
            )}
            <Button
              onClick={() => submitForm()}
              type="submit"
              disabled={isSubmitting | (touched && !isValid)}
            >
              Add Customer
            </Button>
          </form>
        )}
      </Formik>
    );
  }
  export default AddCustomerForm;