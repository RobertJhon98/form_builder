import React, { Component } from "react";
import { Layout, PageHeader, Divider, Input, Row, Col, Typography, Button, Modal, Select, Table } from "antd";
import { connect } from "react-redux";
import { addQuetionToForm, updateFormName } from "../index";

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

class FORM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      type: "text",
      question_title: "sample question",
      questions: [],
    };
  }

  componentDidMount() {
    const { selected_form, forms } = this.props;
    let temp = forms.find((f) => f.key == selected_form.key) ? forms.find((f) => f.key == selected_form.key).questions : [];
    console.log("on mount", temp);
    this.setState({ questions: temp });
  }

  //   componentDidUpdate(prevProps) {
  //     const { selected_form, forms } = this.props;
  //     if (this.props.forms !== prevProps.forms) {
  //       let temp = forms.find((f) => f.key == selected_form.key) ? forms.find((f) => f.key == selected_form.key).questions : [];
  //       this.setState({ questions: temp });
  //     }
  //   }

  addQuestion = () => {
    // console.log("add question", this.state.questions);
    const { question_title, type } = this.state;
    const { selected_form } = this.props;

    this.setState({ showModal: false, type: "text", question_title: "sample question" });
    const question_data = {
      title: question_title,
      type,
      key: selected_form.questions.length,
    };
    addQuetionToForm({ question_data, key: selected_form.key });
    this.updateQuestionsState(question_data);
    // let temp = this.state.questions;
    // temp.push(question_data);
    // // console.log("temp", temp);
    // this.setState({ questions: temp });
  };

  updateQuestionsState = (question_data) => {
    this.setState({ questions: [...this.state.questions, question_data] }, () => {
      console.log(this.state.questions);
      let temp = [];

      this.state.questions.forEach((q) => {
        console.log(q);
        const found = temp.find((Q) => Q.key === q.key);
        if (!found) temp.push(q);
      });

      this.setState({ questions: temp });
    });
  };

  updateFormName = (e) => {
    const { selected_form } = this.props;
    updateFormName({ name: e.target.value, key: selected_form.key });
  };

  render() {
    const { selected_form, forms } = this.props;
    const { showModal, type, question_title } = this.state;

    let columns = [
      {
        title: "Question/Title",
        render: (data) => {
          return data.title;
        },
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type) => {
          if (type === "text") return "Text";
          else if (type === "multi_choice") return "MultiChoice Checkbox";
          else if (type === "single_select") return "Single Select";
          else if (type === "radio") return "Radio";
        },
      },
    ];

    return (
      <Content>
        <PageHeader
          title={selected_form.name}
          style={{ margin: "auto 80px" }}
          extra={
            <>
              <Button onClick={() => this.props.changeScreen("home")}>Go Back</Button>
              <Button onClick={() => this.setState({ showModal: true })}>Add Question</Button>
            </>
          }
        />
        <Divider />
        <div style={{ margin: "auto 100px" }}>
          <Row gutter={[16, 16]}>
            <Col>
              <Text strong>Form Name:</Text>
            </Col>
            <Col>
              <Input value={selected_form.name} onChange={this.updateFormName} />
            </Col>
          </Row>
          <Table
            style={{ marginTop: 24, width: "40vw" }}
            columns={columns}
            // dataSource={forms.find((f) => f.key == selected_form.key) ? forms.find((f) => f.key == selected_form.key).questions : []}
            dataSource={this.state.questions}
            pagination={false}
          />
        </div>

        <Modal title='Add Question' visible={showModal} okText='Save' onOk={this.addQuestion} onCancel={() => this.setState({ showModal: false })}>
          <Row gutter={[16, 16]}>
            <Col span={7}>Question/Title</Col>
            <Col span={10}>
              <Input value={question_title} onChange={(e) => this.setState({ question_title: e.target.value })} />
            </Col>
          </Row>
          <br />
          <Row gutter={[16, 16]}>
            <Col span={7}>Answer Type</Col>
            <Col span={10}>
              <Select style={{ width: "100%" }} value={type} onChange={(val) => this.setState({ type: val })}>
                <Option key='text' value='text'>
                  Text
                </Option>
                <Option key='multi_choice' value='multi_choice'>
                  MultiChoice Checkbox
                </Option>
                <Option key='single_select' value='single_select'>
                  Single Select
                </Option>
                <Option key='radio' value='radio'>
                  Radio
                </Option>
              </Select>
            </Col>{" "}
          </Row>
        </Modal>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  forms: state.forms,
  selected_form: state.selected_form,
});

export default connect(mapStateToProps, {})(FORM);
