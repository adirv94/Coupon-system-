import fetch from "unfetch";
import axios from "axios";

const urlAdmin = "/AdminApi";
const urlAllCompany = "/getAllCompanies";
export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    response.json().then((e) => {
      error.error = e;
    });
    return Promise.reject(error);
  }
};

export const getCompanys = () =>
  // fetch('api/student')

  axios.get(urlAdmin.concat(urlAllCompany)).then(checkStatus);

export const login = (user) =>
  fetch("login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  }).then(checkStatus);
// .catch(error => {
//     console.log(error.error.message);
// })
export const addCompany = (company) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  axios.post("/AdminApi/addCompany", company, config).then(checkStatus);
};
