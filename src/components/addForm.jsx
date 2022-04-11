import React from "react";
import { Form, Input, Button, DatePicker, Radio, PageHeader } from "antd";
import { Link } from "react-router-dom";
import firebase from "../firebase";

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      receiver: "",
      giver: "",
      type: "",
      date: "",
      reason: "",
    };
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChange = (date, dateString) => {
    this.setState({ date: dateString });
  };

  selectValue = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  addUser = (e) => {
    console.log(this.state);
    e.preventDefault();
    var db = firebase.firestore();
    db.collection("books")
      .add({
        amount: this.state.amount,
        receiver: this.state.receiver,
        reason: this.state.reason,
        giver: this.state.giver,
        date: this.state.date,
        type: this.state.type,
      })
      .then((res) => console.log(res));
    this.setState({
      amount: "",
      receiver: "",
      giver: "",
      type: "",
      date: "",
      reason: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <PageHeader
          className="site-page-header"
          title="Accounts book"
          style={{ backgroundColor: "Violet" }}
        />
        <Form
          onSubmit={this.addUser}
          {...layout}
          name="nest-messages"
          style={{ marginTop: "3rem" }}
        >
          <Form.Item label="Amount">
            <Input
              name={"amount"}
              value={this.state.amount}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item label="Receiver">
            <Input
              name={"receiver"}
              value={this.state.receiver}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item label="Giver">
            <Input
              name={"giver"}
              value={this.state.giver}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item label="Dt/Cr">
            <Radio.Group
              name={"type"}
              onChange={this.selectValue}
              value={this.state.type}
            >
              <Radio value="Dt">Debit</Radio>
              <Radio value="Cr">Credit</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"date"} label="Date">
            <DatePicker onChange={this.onChange} value={this.state.date} />
          </Form.Item>
          <Form.Item label="Reason">
            <Input.TextArea
              name={"reason"}
              value={this.state.reason}
              onChange={this.updateInput}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" onClick={this.addUser}>
              <Link to="/list">Submit</Link>
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}
export default NewUser;
