import React, { useEffect } from "react";
import { ReactComponent as CatImg } from "../../images/logo.svg";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = (props) => {
  function handleLogout() {
    localStorage.clear();
    props.setData(null);
  }
  // useEffect(() => {
  //   checkLogin();
  //   checkRole();
  // }, [])
  function checkLogin() {
    const user = localStorage.getItem("username");
    if (user) {
      return (
        <NavBtn>
          <NavBtnLink to="/" onClick={handleLogout} >
            logout
          </NavBtnLink>
          {/* <NavBtnLink to="/logout">logout</NavBtnLink> */}
        </NavBtn>
      );
    } else {
      return (
        <NavBtn>
          <NavBtnLink to="/login" >Login</NavBtnLink>
        </NavBtn>
      );
    }
  }
  function checkRole() {
    // console.log(props);
    // const role = props.getData.authorities[0].authority;
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <>
          <NavLink to="/companys" >Companys</NavLink>
          <NavLink to="/customers" >
            Customers
          </NavLink>
        </>
      );
    } else if (role === "ROLE_COMPANY") {
      return (
        <>
          <NavLink to="/coupons" >
            Coupons
          </NavLink>
        </>
      );
    } else if (role === "ROLE_CUSTOMER") {
      return (
        <>
          <NavLink to="/buyCoupons">
           Buy Coupons
          </NavLink>
          <NavLink to="/purchaseCoupons">
           Purchase Coupons
          </NavLink>
        </>
      );
    } else {
      return <>{/* <Route path="/login" exact component={Login}/> */}</>;
    }
  }
  return (
    <>
      <Nav>
        <NavLink to="/">
          {/* <h1>Logo</h1> */}
          {/* <img src={require('../../images/logo.svg')} alt="logo"/> */}
          <CatImg height={50} width={50} />
        </NavLink>
        <Bars />
        <NavMenu>
          {/* <NavLink to="/about" activeStyle={true}> */}
          <NavLink to="/about" >
            About
          </NavLink>
          {checkRole()}
          {/* SecondNav */}
          {/* <NavBtnLink to="/signin">Sign In</NavBtnLink> */}
        </NavMenu>
        {/* FirstNav &ThirdNav*/}
        {checkLogin()}
      </Nav>
    </>
  );
};

export default Navbar;
