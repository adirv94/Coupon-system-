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
  Button,
  Select,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { errorNotification, successNotification } from "../Notification";
import Container from "../Container";
import axios from "axios";
import { Option } from "antd/lib/mentions";
import Search from "antd/lib/input/Search";

const PurchaseCoupons = () => {
  const api = "CustomerApi";
  const [coupons, setCoupons] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  
  function resetSort() {
    fetchCoupons();
  }
  async function sortMaxPrice(value) {
    // setMaxPrice(document.getElementById("searchMaxPrice").value);
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .get(
        api +
          "/getPurchaseCouponsByMaxPrice/" +
          value +
          "/" +
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

  function handleChange(value) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    if (value.key === "ALL") {
      fetchCoupons();
    } else if (
      value.key === "FOOD" ||
      value.key === "ELECRICITY" ||
      value.key === "RESTAURANT" ||
      value.key === "VACATION"
    ) {
      axios
        .get(
          api +
            "/getPurchaseCouponsByCategory/" +
            value.key +
            "/" +
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
  }

  async function fetchCoupons() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .get(
        api + "/getPurchaseCoupons/" + localStorage.getItem("customerId"),
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
              <h3>Sort By Max Price</h3>
        <h6>(does not work with sorting by category)</h6>
        <Search
          id="searchMaxPrice"
          type="number"
          placeholder="input search text"
          onSearch={sortMaxPrice}
          enterButton
        />
        <Button type="primary" size="small" onClick={resetSort} danger>
          ResetSearch
        </Button>
        <h3>Sort By Category</h3>
        <h6>(does not work with sorting by max price)</h6>
        <Select
          labelInValue
          defaultValue={{ value: "ALL" }}
          style={{ width: 120, display: "flex", justifyContent: "center" }}
          onChange={handleChange}
        >
          <Option value="ALL">All</Option>
          <Option value="FOOD">Food</Option>
          <Option value="ELECRICITY">Elecricity</Option>
          <Option value="RESTAURANT">Restaurant</Option>
          <Option value="VACATION">Vacation</Option>
        </Select>
        <Container>
          <Empty description={<h1>No Purchase Coupon Available</h1>} />
        </Container>
      </>
    );
  }
  return (
    <>
              <h3>Sort By Max Price</h3>
        <h6>(does not work with sorting by category)</h6>
        <Search
          id="searchMaxPrice"
          type="number"
          placeholder="input search text"
          onSearch={sortMaxPrice}
          enterButton
        />
        <Button type="primary" size="small" onClick={resetSort} danger>
          ResetSearch
        </Button>
        <h3>Sort By Category</h3>
        <h6>(does not work with sorting by max price)</h6>
      <Select
        labelInValue
        defaultValue={{ value: "ALL" }}
        style={{ width: 120, display: "flex", justifyContent: "center" }}
        onChange={handleChange}
      >
        <Option value="ALL">All</Option>
        <Option value="FOOD">Food</Option>
        <Option value="ELECRICITY">Elecricity</Option>
        <Option value="RESTAURANT">Restaurant</Option>
        <Option value="VACATION">Vacation</Option>
      </Select>
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
export default PurchaseCoupons;
