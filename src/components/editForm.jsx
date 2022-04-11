import React from "react";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import { db } from "../firebase";
import moment from "moment";

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {
        amount: "",
        receiver: "",
        giver: "",
        type: "",
        date: "",
        reason: "",
      },
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    db.collection("books")
      .doc(id)
      .get()
      .then((snapshot) => {
        this.setState((prevState) => {
          const books = { ...prevState.users, ...snapshot.data() };
          return { books };
        });
      });
  }

  updateInput = (e) => {
    this.setState((prevState) => {
      let books = { ...prevState.books };
      books[e.target.name] = e.target.value;
      return { books };
    });
  };

  updateUser = () => {
    db.collection("books")
      .doc(this.props.match.params.id)
      .update(this.state.books)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  onChange = (date, dateString) => {
    this.setState((prevState) => {
      let users = { ...prevState.users };
      users.date = dateString;
      return { users };
    });
  };

  // onChange = (date, dateString) => {
  //   this.setState({ date: dateString });
  // };

  selectValue = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Form
          onSubmit={this.updateInput}
          {...layout}
          name="nest-messages"
          style={{ marginTop: "1rem" }}
        >
          <Form.Item label="Amount">
            <Input
              name={"amount"}
              value={this.state.books.amount}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item label="Receiver">
            <Input.TextArea
              name={"receiver"}
              value={this.state.books.receiver}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item label="Giver">
            <Input
              name={"giver"}
              value={this.state.books.giver}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item label="Dt/Cr">
            <Radio.Group
              name={"type"}
              onClick={this.selectValue}
              value={this.state.books.type}
              onChange={this.updateInput}
            >
              <Radio value="Dt">Debit</Radio>
              <Radio value="Cr">Credit</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              onChange={this.onChange}
              name={"date"}
              defaultValue={moment(
                this.state.users.date
                  ? console.log(this.state.books.date)
                  : new Date()
              )}
            />
          </Form.Item>
          <Form.Item label="Reason">
            <Input
              name={"reason"}
              value={this.state.books.reason}
              onChange={this.updateInput}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            <Button type="submit" onClick={this.updateUser}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}
export default Edit;
