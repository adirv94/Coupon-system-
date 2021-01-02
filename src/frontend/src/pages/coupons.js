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
  Button,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { errorNotification, successNotification } from "../Notification";
import CouponFooter from "../footers/CouponFooter";
import Container from "../Container";
import axios from "axios";
import AddCouponForm from "../forms/AddCouponForm";
import UpdateCouponForm from "../forms/UpdateCouponForm";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";

const Coupons = () => {
  const api = "CompanyApi";
  const [coupons, setCoupons] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null);
  const [updatedCoupon, setUpdatedCoupon] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isAddCouponModalVisiable, setAddCouponModalVisiable] = useState(false);
  const [isUpdateCouponModalVisiable, setUpdateCouponModalVisiable] = useState(
    false
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  function resetSort() {
    fetchCoupons();
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
            "/getAllCouponsByCategory/" +
            value.key +
            "/" +
            localStorage.getItem("companyId"),
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

  function openAddCouponModal() {
    setAddCouponModalVisiable(true);
  }

  function closeAddCouponModal() {
    setAddCouponModalVisiable(false);
  }

  function openUpdateCouponModal() {
    setUpdateCouponModalVisiable(true);
  }

  function closeUpdateCouponModal() {
    setUpdateCouponModalVisiable(false);
  }

  function deleteCouponById(couponId) {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // };
    const res = axios.delete((api + "/deleteCoupon/").concat(couponId), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    fetchCoupons();
    return res;
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
          "/getAllCouponsByMaxPrice/" +
          value +
          "/" +
          localStorage.getItem("companyId"),
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
  async function fetchCoupons() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .get(api + "/getAllCoupons/" + localStorage.getItem("companyId"), config)
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
            title="Sure to delete?"
            onConfirm={() => {
              deleteCouponById(coupon.id)
                .then(() => {
                  successNotification("success", "delete");
                })
                .catch((err) => {
                  errorNotification("fail", "error");
                });
            }}
          >
            <a>Delete</a>
          </Popconfirm>
          <Popconfirm
            title="Sure to update?"
            onConfirm={() => {
              setUpdatedCoupon(coupon);
              openUpdateCouponModal();
            }}
          >
            <a>Update</a>
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
          <Empty description={<h1>No Coupons found</h1>} />
          <Modal
            title="Add new coupon"
            visible={isAddCouponModalVisiable}
            onOk={closeAddCouponModal}
            onCancel={closeAddCouponModal}
            destroyOnClose={true}
            width={500}
          >
            <h1>Add Coupon</h1>
            <AddCouponForm
              onSuccess={() => {
                closeAddCouponModal();
                fetchCoupons();
                successNotification("AddCoupon", "success");
              }}
              onFailure={(error) => {
                const message = error.error.message;
                const description = error.error.httpStatus;
                errorNotification(message, description);
              }}
            />
          </Modal>
          <Modal
            title="Update new coupon"
            visible={isUpdateCouponModalVisiable}
            onOk={closeUpdateCouponModal}
            onCancel={closeUpdateCouponModal}
            destroyOnClose={true}
            width={500}
          >
            <h1>Update Coupon</h1>
            <UpdateCouponForm
              updatedCoupon={updatedCoupon}
              onSuccess={() => {
                closeUpdateCouponModal();
                fetchCoupons();
                successNotification("UpdateCoupon", "success");
                // errorNotification('err','err');
              }}
              onFailure={(error) => {
                console.log(error);
                // const message = error.error.message;
                // const description = error.error.httpStatus;
                errorNotification("message", "description");
              }}
            />
          </Modal>
        </Container>
        <CouponFooter
          numberOfCoupons={coupons.length}
          handleAddCouponClickEvent={openAddCouponModal}
        />
      </>
    );
  }
  return (
    <>
      {/* <Search
      id="searchMaxPrice"
      placeholder="Sort By Max Price"
      type='number'
      allowClear
      enterButton="Sort"
      size="middle"
      // ref={inp =>{
      //   if (inp.state) {
      //     console.log(inp);
      //   }
        
      //   // setMaxPrice(inp.state.value);
      // }}
      // onSearch={maxPrice}
      // value={setMaxPrice}
      onChange={() => {
        // console.log(value);
        // setMaxPrice(value);
        sortMaxPrice();
      }} 
      // onChange={sortMaxPrice}
      
    /> */}
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
          pagination={{ pageSize: 50 }}
          // scroll={{ x: 1500, y: 300 }}
          scroll={{ x: 1000, y: 240 }}
          rowKey="id"
        />

        <Modal
          title="Add new coupon"
          visible={isAddCouponModalVisiable}
          onOk={closeAddCouponModal}
          onCancel={closeAddCouponModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Add Coupon</h1>
          <AddCouponForm
            onSuccess={() => {
              closeAddCouponModal();
              fetchCoupons();
              successNotification("AddCoupon", "success");
            }}
            onFailure={(error) => {
              console.log(error);
              // const message = error.error.message;
              // const description = error.error.httpStatus;
              errorNotification("fail", "err");
            }}
          />
        </Modal>
        <Modal
          title="Update new coupon"
          visible={isUpdateCouponModalVisiable}
          onOk={closeUpdateCouponModal}
          onCancel={closeUpdateCouponModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Update Coupon</h1>
          <UpdateCouponForm
            updatedCoupon={updatedCoupon}
            onSuccess={() => {
              closeUpdateCouponModal();
              fetchCoupons();
              successNotification("UpdateCoupon", "success");
              // errorNotification('err','err');
            }}
            onFailure={(error) => {
              console.log(error);
              // const message = error.error.message;
              // const description = error.error.httpStatus;
              errorNotification("message", "description");
            }}
          />
        </Modal>
        <CouponFooter
          style={{ marginBottom: 100 }}
          numberOfCoupons={coupons.length}
          handleAddCouponClickEvent={openAddCouponModal}
        />
      </Container>
    </>
  );
};

export default Coupons;
