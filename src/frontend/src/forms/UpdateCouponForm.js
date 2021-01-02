import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import axios from "axios";

export default function UpdateCouponForm(props) {
  const api = "CompanyApi";
  const inputBottomMargin = { marginBottom: "5px" };
  const tagStyle = {
    backgroundColor: "red",
    color: "black",
    ...inputBottomMargin,
  };

  function updateCoupon(coupon) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    return axios.put(api + "/updateCoupon", coupon, config);
  }

  return (
    <Formik
      preserve={false}
      initialValues={{
        id:props.updatedCoupon.id,
        amount: props.updatedCoupon.amount,
        category: props.updatedCoupon.category,
        description: props.updatedCoupon.description,
        startDate: props.updatedCoupon.startDate,
        endDate: props.updatedCoupon.endDate,
        price: props.updatedCoupon.price,
        title: props.updatedCoupon.title,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.amount) {
          errors.amount = "Amount Required";
        } else if (!/^\+?(0|[1-9]\d*)$/.test(values.amount)) {
          errors.amount = "Amount Not Valid Only Positive Number";
        }
        if (!values.category) {
          errors.category = "Category Required";
        } else if (
          !["FOOD", "ELECRICITY", "RESTAURANT", "VACATION"].includes(
            values.category.toUpperCase()
          )
        ) {
          errors.category =
            "Category must be (FOOD,ELECRICITY,RESTAURANT,VACATION)";
        }
        if (!values.description) {
          errors.description = "Description Required";
        }
        var sDate = Date.parse(values.startDate);
        if (!values.startDate) {
          errors.startDate = "StartDate Required";
        } else if (isNaN(sDate)) {
          errors.startDate = "StartDate need to be like dd-mm-yyyy";
        }
        var eDate = Date.parse(values.endDate);
        if (!values.endDate) {
          errors.endDate = "EndDate Required";
        } else if (isNaN(eDate)) {
          errors.endDate = "EndDate need to be like dd-mm-yyyy";
        } else if (eDate <= sDate) {
          errors.endDate = "The end date need to be bigger then the start date";
        }
        if (!values.price) {
          errors.price = "Price Required";
        } else if (!/^\+?(0|[1-9]\d*)$/.test(values.price)) {
          errors.price = "Price Not Valid Only Positive Number";
        }
        if (!values.title) {
          errors.title = "Title Required";
        }
        return errors;
      }}
      onSubmit={(coupon, { setSubmitting }) => {
        updateCoupon(coupon)
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
            type="number"
            name="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            placeholder=""
          />
          {errors.amount && touched.amount && (
            <Tag style={tagStyle}>{errors.amount}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.category}
            placeholder="Category . E.g FOOD,ELECRICITY,RESTAURANT,VACATION"
          />
          {errors.category && touched.category && (
            <Tag style={tagStyle}>{errors.category}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            placeholder="Description . E.g This coupon is amazing"
          />
          {errors.description && touched.description && (
            <Tag style={tagStyle}>{errors.description}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            type="date"
            name="startDate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.startDate}
            placeholder="StartDate. E.g 27/12/2020"
          />
          {errors.startDate && touched.startDate && (
            <Tag style={tagStyle}>{errors.startDate}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            type="date"
            name="endDate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.endDate}
            placeholder="EndDate. E.g 31/12/2020"
          />
          {errors.endDate && touched.endDate && (
            <Tag style={tagStyle}>{errors.endDate}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            type="number"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            placeholder=""
          />
          {errors.price && touched.price && (
            <Tag style={tagStyle}>{errors.price}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            placeholder="Title. E.g Meat Coupon"
          />
          {errors.title && touched.title && (
            <Tag style={tagStyle}>{errors.title}</Tag>
          )}
          <Button
            onClick={() => submitForm()}
            type="submit"
            disabled={isSubmitting | (touched && !isValid)}
          >
            Update Coupon
          </Button>
        </form>
      )}
    </Formik>
  );
}
