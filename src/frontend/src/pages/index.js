import { useEffect,useState } from "react";
import axios from "axios";
import React from "react";

const Home = (props) => {
  // const [user ,setUser] = useState(null);
  // useEffect(() => {
  //   const config ={
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('token')
  //     }
  //   }
  //   axios.get('/user/'+localStorage.getItem('username'),config).then(
  //     res =>{
  //       console.log(res);
  //       setUser(res.data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }, [])
  function helloMessage(){
    const user = localStorage.getItem('username');
    // const user = this.props.user;
    // console.log(user);
    if (user ) {
      return (<h1>Hello {user}</h1>);
    }
    return (<h1>You are not logged in</h1>);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {helloMessage()}
    </div>
  );
};

export default Home;
