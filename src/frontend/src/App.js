import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from "./pages";
import About from "./pages/about";
import Companys from "./pages/companys";
import Coupons from "./pages/coupons";
import Customers from "./pages/customers";
import Login from "./pages/login";
import axios from "axios";
import "antd/dist/antd.css";
import BuyCoupons from "./pages/buyCoupons";
import PurchaseCoupons from "./pages/purchaseCoupons";

// const jwt = require('jsonwebtoken')

function App() {
  const [user, setUserData] = useState([]);
  function setData(user) {
    setUserData(user);
  }
  function getData() {
    return user;
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // Promise.all([
    axios
      .get("/user/" + localStorage.getItem("username"), config)
      // ])
      .then(
        (res) => {
          // console.log(res.data);

          setData(res.data);
          // localStorage.setItem("role",res.data.authorities[0].authority);
          // localStorage.setItem("user", res.data);
          // localStorage.setItem("role", res.data.authorities[0].authority);
          // console.log(res.data.authorities[0].authority === "ROLE_ADMIN");
          // setRule(res.data.authorities[0]);
        },
        (err) => {
          console.log(err);
        }
      );
      // return () => {
      //   checkRole();
      // };
  });
  // function setUser() {
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   };
  //   axios.get("/user/" + localStorage.getItem("username"), config).then(
  //     (res) => {
  //       console.log(res.data.authorities[0].authority);
  //       setUserData(res);
  //       // localStorage.setItem("user", res.data);
  //       // localStorage.setItem("role", res.data.authorities[0].authority);
  //       // console.log(res.data.authorities[0].authority === "ROLE_ADMIN");
  //       // setRule(res.data.authorities[0]);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  function checkRole() {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <>
          <Route path="/companys" exact component={Companys} />
          <Route path="/customers" exact component={Customers} />
        </>
      );
    } else if (role === "ROLE_COMPANY") {
      return (
        <>
          <Route path="/coupons" exact component={Coupons} />
        </>
      );
    } else if (role === "ROLE_CUSTOMER") {
      return (
      <>
      <Route path="/buyCoupons" exact component={BuyCoupons} />
      <Route path="/purchaseCoupons" exact component={PurchaseCoupons} />
      </>
      );
    }
  }
  return (
    <Router>
      <Navbar setData={setData} getData={getData} />
      <Switch>
        <Route path={"/","/home"} exact component={Home} />
        <Route path="/about" exact component={About} />
        {checkRole()}
        <Route
          path="/login"
          exact
          component={() => <Login setData={setData} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
