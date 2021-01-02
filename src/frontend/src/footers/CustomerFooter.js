import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import Container from "../Container";
import "./Footer.css";

const CustomerFooter = (props) => (
  <div className="footer">
    <Container>
      {props.numberOfCustomers ? (
        <Avatar
          style={{ backgroundColor: "#f56a00", marginRight: "5px" }}
          size="large"
        >
          {props.numberOfCustomers}
        </Avatar>
      ) : null}
      <Button onClick={() => props.handleAddCustomerClickEvent()} type="primary">
        Add new customer +
      </Button>
    </Container>
  </div>
);
export default CustomerFooter;
