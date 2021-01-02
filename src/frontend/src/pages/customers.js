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
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { errorNotification, successNotification } from "../Notification";
import CustomerFooter from "../footers/CustomerFooter";
import Container from "../Container";
import axios from "axios";
import AddCustomerForm from "../forms/AddCustomerForm";
import UpdateCustomerForm from "../forms/UpdateCustomerForm";

const Customers = () => {
  const api = " AdminApi";
  const [customers, setCustomers] = useState([]);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isAddCustomerModalVisiable, setAddCustomerModalVisiable] = useState(false);
  const [isUpdateCustomerModalVisiable,setUpdateCustomerModalVisiable,] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  function openAddCustomerModal() {
    setAddCustomerModalVisiable(true);
  }

  function closeAddCustomerModal() {
    setAddCustomerModalVisiable(false);
  }

  function openUpdateCustomerModal() {
    setUpdateCustomerModalVisiable(true);
  }

  function closeUpdateCustomerModal() {
    setUpdateCustomerModalVisiable(false);
  }

  function deleteCustomerById(customerId) {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // };
    const res = axios.delete((api + "/deleteCustomer/").concat(customerId), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    fetchCustomers();
    return res;
  }
  async function fetchCustomers() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .get(api + "/getAllCustomers", config)
      .then((response) => {
        setCustomers(response.data);
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
    fetchCustomers();
    return () => {
      abortController.abort();
    };
  }, []);

  const dataSource = customers;

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      render: (text, customer) => (
        <Avatar size="large">
          {`${customer.firstName.charAt(0).toUpperCase()}`}
          {`${customer.lastName.charAt(0).toUpperCase()}`}
        </Avatar>
      ),
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, customer) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              deleteCustomerById(customer.id)
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
              setUpdatedCustomer(customer);
              openUpdateCustomerModal();
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
  if (customers.length === 0) {
    return (
      <>
        <Container>
          <Empty description={<h1>No Customers found</h1>} />
          <Modal
            title="Add new customer"
            visible={isAddCustomerModalVisiable}
            onOk={closeAddCustomerModal}
            onCancel={closeAddCustomerModal}
            destroyOnClose={true}
            width={500}
          >
            <h1>Add Customer</h1>
            <AddCustomerForm
              onSuccess={() => {
                closeAddCustomerModal();
                fetchCustomers();
                successNotification("AddCustomer", "success");
              }}
              onFailure={(error) => {
                const message = error.error.message;
                const description = error.error.httpStatus;
                errorNotification(message, description);
              }}
            />
          </Modal>
          <Modal
          title="Update new customer"
          visible={isUpdateCustomerModalVisiable}
          onOk={closeUpdateCustomerModal}
          onCancel={closeUpdateCustomerModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Update Customer</h1>
          <UpdateCustomerForm
            updatedCustomer={updatedCustomer}
            onSuccess={() => {
              closeUpdateCustomerModal();
              fetchCustomers();
              successNotification("UpdateCustomer", "success");
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
        <CustomerFooter
          numberOfCustomers={customers.length}
          handleAddCustomerClickEvent={openAddCustomerModal}
        />
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

        <Modal
          title="Add new customer"
          visible={isAddCustomerModalVisiable}
          onOk={closeAddCustomerModal}
          onCancel={closeAddCustomerModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Add Customer</h1>
          <AddCustomerForm
            onSuccess={() => {
              closeAddCustomerModal();
              fetchCustomers();
              successNotification("AddCustomer", "success");
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
          title="Update new customer"
          visible={isUpdateCustomerModalVisiable}
          onOk={closeUpdateCustomerModal}
          onCancel={closeUpdateCustomerModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Update Customer</h1>
          <UpdateCustomerForm
            updatedCustomer={updatedCustomer}
            onSuccess={() => {
              closeUpdateCustomerModal();
              fetchCustomers();
              successNotification("UpdateCustomer", "success");
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
      <CustomerFooter
        numberOfCustomers={customers.length}
        handleAddCustomerClickEvent={openAddCustomerModal}
      />
    </>
  );
};

export default Customers;
