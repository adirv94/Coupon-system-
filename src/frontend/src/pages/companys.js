import "../App.css";
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
import CompanyFooter from "../footers/ComapnyFooter";
import Container from "../Container";
import axios from "axios";
import AddCompanyForm from "../forms/AddCompanyForm";
import UpdateCompanyForm from "../forms/UpdateCompanyForm";
import { Option } from "antd/lib/mentions";

const Companys = () => {
  const api = " AdminApi";
  // const url = "AdminApi/getAllCompanies";
  const [companies, setCompanies] = useState([]);
  const [updatedCompany, setUpdatedCompany] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isAddCompanyModalVisiable, setAddCompanyModalVisiable] = useState(
    false
  );
  const [
    isUpdateCompanyModalVisiable,
    setUpdateCompanyModalVisiable,
  ] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


  function openAddCompanyModal() {
    setAddCompanyModalVisiable(true);
  }

  function closeAddCompanyModal() {
    setAddCompanyModalVisiable(false);
  }
  function openUpdateCompanyModal() {
    setUpdateCompanyModalVisiable(true);
  }

  function closeUpdateCompanyModal() {
    setUpdateCompanyModalVisiable(false);
  }

  function deleteCompanyById(companyId) {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // };
    const res = axios.delete((api + "/deleteCompany/").concat(companyId), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    fetchCompanies();
    return res;
  }
  async function fetchCompanies() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .get(api + "/getAllCompanies", config)
      .then((response) => {
        setCompanies(response.data);
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
    fetchCompanies();
    return () => {
      abortController.abort();
    };
  }, []);

  //   }, [companies]);

  const dataSource = companies;

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      render: (text, company) => (
        <Avatar size="large">{`${company.id}`}</Avatar>
      ),
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, company) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              deleteCompanyById(company.id)
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
              setUpdatedCompany(company);
              openUpdateCompanyModal();
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
  if (companies.length === 0) {
    return (
      <>

        <Container>
          <Empty description={<h1>No Companies found</h1>} />
          <Modal
            title="Add new company"
            visible={isAddCompanyModalVisiable}
            onOk={closeAddCompanyModal}
            onCancel={closeAddCompanyModal}
            destroyOnClose={true}
            width={500}
          >
            <h1>Add Company</h1>
            <AddCompanyForm
              onSuccess={() => {
                closeAddCompanyModal();
                fetchCompanies();
                successNotification("AddCompany", "success");
              }}
              onFailure={(error) => {
                const message = error.error.message;
                const description = error.error.httpStatus;
                errorNotification(message, description);
              }}
            />
          </Modal>
          <Modal
            title="Update new company"
            visible={isUpdateCompanyModalVisiable}
            onOk={closeUpdateCompanyModal}
            onCancel={closeUpdateCompanyModal}
            destroyOnClose={true}
            width={500}
          >
            <h1>Update Company</h1>
            <UpdateCompanyForm
              onSuccess={() => {
                closeUpdateCompanyModal();
                successNotification("UpdateCompany", "success");
                fetchCompanies();
              }}
              onFailure={(error) => {
                const message = error.error.message;
                const description = error.error.httpStatus;
                errorNotification(message, description);
              }}
            />
          </Modal>
        </Container>
        <CompanyFooter
          numberOfCompanies={companies.length}
          handleAddComapnyClickEvent={openAddCompanyModal}
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
          // expandable={{
          //   expandedRowRender: (company) => (
          //     <p style={{ margin: 0 }}>{company.coupons}</p>
          //   ),
          //   rowExpandable: (company) => company.name !== "Not Expandable",
          // }}
          rowKey="id"
        />

        <Modal
          title="Add new company"
          visible={isAddCompanyModalVisiable}
          onOk={closeAddCompanyModal}
          onCancel={closeAddCompanyModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Add Company</h1>
          <AddCompanyForm
            onSuccess={() => {
              closeAddCompanyModal();
              fetchCompanies();
              successNotification("AddCompany", "success");
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
          title="Update new company"
          visible={isUpdateCompanyModalVisiable}
          onOk={closeUpdateCompanyModal}
          onCancel={closeUpdateCompanyModal}
          destroyOnClose={true}
          width={500}
        >
          <h1>Update Company</h1>
          <UpdateCompanyForm
            updatedCompany={updatedCompany}
            onSuccess={() => {
              closeUpdateCompanyModal();
              fetchCompanies();
              successNotification("UpdateCompany", "success");
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
      <CompanyFooter
        numberOfCompanies={companies.length}
        handleAddComapnyClickEvent={openAddCompanyModal}
      />
    </>
  );
};

export default Companys;
