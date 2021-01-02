import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import axios from "axios";

export default function UpdateCompanyForm(props) {
  const api = " AdminApi";
  const inputBottomMargin = { marginBottom: "5px" };
  const tagStyle = {
    backgroundColor: "red",
    color: "black",
    ...inputBottomMargin,
  };

  function updateCompany(company) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    return axios.put(api + "/updateCompany", company, config);
  }

  return (
    <Formik preserve={false}
      initialValues={{
         email: props.updatedCompany.email,
        password: props.updatedCompany.password,
        id: props.updatedCompany.id,
        name: props.updatedCompany.name
      }}
      validate={(values) => {
        const errors = {};
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
        updateCompany(comapny)
          .then(() => {
            props.onSuccess();
            // App.fetchStudents();
            console.log('successNotification');
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
            placeholder="Password. E.g **dfgdfg******"
          />
          {errors.password && touched.password && (
            <Tag style={tagStyle}>{errors.password}</Tag>
          )}
          <Button
            onClick={() => submitForm()}
            type="submit"
            disabled={isSubmitting | (touched && !isValid)}
          >
            Update Company
          </Button>
        </form>
      )}
    </Formik>
  );
}
