import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import axios from "axios";

function AddCompanyForm(props) {
  const api = " AdminApi";
  const inputBottomMargin = { marginBottom: "5px" };
  const tagStyle = {
    backgroundColor: "red",
    color: "black",
    ...inputBottomMargin,
  };

  function addCompany(company) {
    const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      return axios.post(api+"/addCompany", company, config);
  }

  return (
    <Formik preserve={false}
      initialValues={{ name: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name Required";
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
      onSubmit={(comapny, { setSubmitting }) => {
        addCompany(comapny)
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
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Name. E.g Ronen&Adir Comapny"
          />
          {errors.name && touched.name && (
            <Tag style={tagStyle}>{errors.name}</Tag>
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
            Add Company
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default AddCompanyForm;
