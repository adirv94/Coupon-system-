import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import Container from "../Container";
import "./Footer.css";

const CompanyFooter = (props) => (
  <div className="footer">
    <Container>
      {props.numberOfCompanies ? (
        <Avatar
          style={{ backgroundColor: "#f56a00", marginRight: "5px" }}
          size="large"
        >
          {props.numberOfCompanies}
        </Avatar>
      ) : null}
      <Button onClick={() => props.handleAddComapnyClickEvent()} type="primary">
        Add new company +
      </Button>
    </Container>
  </div>
);
export default CompanyFooter;
