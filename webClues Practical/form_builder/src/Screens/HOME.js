import React, { Component } from "react";
import { Layout, PageHeader, Table, Divider, Button, Typography } from "antd";
import { connect } from "react-redux";
import { setSelectedFormData, addForm } from "../index";

const { Content } = Layout;
const { Title } = Typography;

class HOME extends Component {
  gotoFormScreen = (name, data) => {
    this.props.changeScreen("form");
    setSelectedFormData(data);
  };

  addNewForm = () => {
    this.props.changeScreen("form");
    const newFormData = {
      name: "New Form " + this.props.forms.length,
      url: "https://www.new_Form_" + this.props.forms.length + ".com",
      questions: [],
      key: this.props.forms.length + 1,
      created_at: new Date(),
    };
    setSelectedFormData(newFormData);
    addForm(newFormData);
  };

  render() {
    const { forms } = this.props;
    let columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name, data) => {
          return (
            <Button type='link' onClick={() => this.gotoFormScreen(name, data)}>
              {name}
            </Button>
          );
        },
      },
      {
        title: "URL",
        dataIndex: "url",
        key: "url",
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        render: (created_at) => {
          return created_at.toString();
        },
      },
    ];

    return (
      <Content>
        <PageHeader
          style={{ margin: "auto 80px" }}
          title={<Title level={3}>Home</Title>}
          extra={<Button onClick={this.addNewForm}>Add Form</Button>}
        />
        <Divider />
        <Table style={{ margin: "auto 100px" }} columns={columns} dataSource={forms} pagination={false} />
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  forms: state.forms,
});
export default connect(mapStateToProps, {})(HOME);
