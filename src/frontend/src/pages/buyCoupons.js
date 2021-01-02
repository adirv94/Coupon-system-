import React, { useEffect, useState } from "react";
import {
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty,
  Space,
  Popconfirm,
  Select,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { errorNotification, successNotification } from "../Notification";
import Container from "../Container";
import axios from "axios";
import AddCouponForm from "../forms/AddCouponForm";
import UpdateCouponForm from "../forms/UpdateCouponForm";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";

const BuyCoupons = () => {
  const api = "CustomerApi";
  const [coupons, setCoupons] = useState([]);
  const [buyedCoupon, setBuyedCoupon] = useState({});
  const [maxPrice, setMaxPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function buyCoupon(bCoupon) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .post(
        api + "/buyCoupon/" + localStorage.getItem("customerId"),
        bCoupon,
        config
      )
      .then((response) => {
        fetchCoupons();
        setIsFetching(false);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          const message = error.response.data.message;
          const description = error.response.statusText;
          errorNotification(message, description);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        setIsFetching(false);
      });
  }
  async function fetchCoupons() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .get(
        api +
          "/getAllNonePurchaseCoupons/" +
          localStorage.getItem("customerId"),
        config
      )
      .then((response) => {
        setCoupons(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          const message = error.response.data.message;
          const description = error.response.statusText;
          errorNotification(message, description);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        setIsFetching(false);
      });
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchCoupons();
    return () => {
      abortController.abort();
    };
  }, []);

  const dataSource = coupons;

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      render: (text, coupon) => <Avatar size="large">{`${coupon.id}`}</Avatar>,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "EndDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "action",
      // fixed: "right",
      width: 135,
      render: (text, coupon) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to buy?"
            onConfirm={() => {
              // setBuyedCoupon(coupon);
              buyCoupon(coupon);
            }}
          >
            <a>Buy</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isFetching) {
    return (
      <Container>
        <Spin indicator={antIcon}></Spin>
      </Container>
    );
  }
  if (coupons.length === 0) {
    return (
      <>
        <Container>
          <Empty description={<h1>No Coupons are available to buy</h1>} />
        </Container>
      </>
    );
  }
  return (
    <>
      <Container>
        <Table
          style={{ marginBottom: "100px" }}
          dataSource={dataSource}
          columns={columns}
          pagination={{pageSize:50}}
          // scroll={{ x: 1500, y: 300 }}
          scroll={{x:1000, y: 240 }}
          rowKey="id"
        />
      </Container>
    </>
  );
};
export default BuyCoupons;
