import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { saveTodo, updateTodo, deleteTodo } from "../redux/actions";
import store from "../redux/store";
import moment from "moment";

export class AddEditTodoModal extends React.Component {
  static defaultProps = {
    data: {}
  };

  state = {
    title: "",
    description: "",
    isCompleted: false,
    isDeleted: false,
    lastUpdatedAt: moment().format("Do MMM YY, HH:MM a")
  };

  componentDidMount() {
    const { data = {} } = this.props;
    this.setState({ ...data });
  }

  updateField = (key, val) => {
    this.setState({ [key]: val });
  };

  updateForm = () => {
    const { data } = this.props;
    const { id } = data;
    const { todos = {} } = store.getState();

    if (!id) {
      saveTodo({
        id: Object.keys(todos).length,
        ...this.state
      });
    } else {
      updateTodo({
        ...this.state
      });
    }
    this.props.onHide();
  };

  delete = () => {
    deleteTodo({
      ...this.state
    });
    this.props.onHide();
  };

  render() {
    const { data } = this.props;
    const { title = "", description = "" } = this.state;
    const { id } = data;

    return (
      <Modal
        {...this.props}
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-wide"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {id !== undefined ? `Edit` : `Create`} a To Do
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title *</Form.Label>
              <Form.Control
                onChange={(e) => this.updateField("title", e.target.value)}
                type="text"
                value={title}
                maxLength={50}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("description", e.target.value)
                }
                value={description}
                as="textarea"
                rows="3"
                maxLength={50}
              />
            </Form.Group>
          </Form>

          <div style={{ textAlign: "right" }}>
            {!!(id !== undefined) && (
              <Button className="btn btn-outline-primary" onClick={this.delete}>
                Delete
              </Button>
            )}
            &nbsp;&nbsp;
            <Button
              disabled={!title.length}
              className="btn btn-primary"
              onClick={this.updateForm}
            >
              {id !== undefined ? `Update` : `Create`}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
