import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import Container from "../Container";
import "./Footer.css";

const CouponFooter = (props) => (
    <div className="footer">
      <Container>
        {props.numberOfCoupons ? (
          <Avatar
            style={{ backgroundColor: "#f56a00", marginRight: "5px" }}
            size="large"
          >
            {props.numberOfCoupons}
          </Avatar>
        ) : null}
        <Button onClick={() => props.handleAddCouponClickEvent()} type="primary">
          Add new coupon +
        </Button>
      </Container>
    </div>
  );

export default CouponFooter
