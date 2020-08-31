import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  saveBucket,
  saveTodos,
  deleteBucket,
  deleteTodos,
  updateBucket
} from "../redux/actions";
import store from "../redux/store";
import moment from "moment";
import CreatableSelect from "react-select/creatable";
import {
  createOptionForReactSelect,
  getActiveToDos,
  getTodosOfBucket
} from "../utils";
import { AddToDoList } from "./AddToDoList";

export class AddEditBucketModal extends React.Component {
  static defaultProps = {
    data: {},
    todos: []
  };

  state = {
    data: {
      title: "",
      description: "",
      isCompleted: false,
      isDeleted: false,
      lastUpdatedAt: moment().format("Do MMM YY, hh:mm a"),
      todos: []
    },
    todos: [],
    buckets: []
  };

  componentDidMount() {
    const { data = {}, todos = [] } = this.props;
    const { buckets = {} } = store.getState();
    this.setState({
      todos,
      buckets: getActiveToDos(Object.values(buckets))
    });

    if (data.id !== undefined) {
      this.setState({ data });
    }
  }

  updateField = (key, val) => {
    const { data } = this.state;
    this.setState({ data: { ...data, ...{ [key]: val } } });
  };

  addTodoInList = () => {
    const { todos = [] } = this.state;
    const new_state_ins = [...todos];

    new_state_ins.unshift({
      title: "",
      lastUpdatedAt: moment().format("Do MMM YY, HH:MM a"),
      isDeleted: false,
      isCompleted: false
    });
    this.setState({ todos: new_state_ins });
  };

  removeTodoFromList = (index) => {
    const { todos = [] } = this.state;
    const new_state_ins = [...todos];
    new_state_ins.splice(index, 1);
    this.setState({ todos: new_state_ins });
  };

  editTodoInList = (value, index, key) => {
    const { todos = [] } = this.state;
    const new_state_ins = [...todos];
    const current_ins = new_state_ins[index];
    current_ins[key] = value;
    this.setState({ todos: new_state_ins });
  };

  updateForm = () => {
    let { data, todos } = this.state;
    const { id } = data;
    let currentCounter_todos = Object.keys(store.getState().todos || {}).length;
    const currentCounter_buckets = Object.keys(store.getState().buckets || {})
      .length;

    if (!id) {
      saveBucket({
        id: currentCounter_buckets,
        ...this.state.data
      });
    } else {
      updateBucket({
        ...this.state.data
      });
    }
    todos = todos.map((ins) => {
      if (ins.id === undefined) {
        ins.id = currentCounter_todos++;
      }
      if (id === undefined) {
        ins.bucketId = currentCounter_buckets;
      } else {
        ins.bucketId = id;
      }
      return ins;
    });

    saveTodos(todos);
    this.props.onHide();
  };

  delete = () => {
    const { todos = {} } = store.getState();
    const { data } = this.state;
    deleteBucket({
      ...data
    });
    deleteTodos(getTodosOfBucket(Object.values(todos), data.id));
    this.props.onHide();
  };

  handleChange = (newValue: any, actionMeta: any) => {
    const { data } = this.state;
    const { todos = {} } = store.getState();
    if (newValue.__isNew__) {
      this.setState({ data: { ...data, ...{ title: newValue.value } } });
    } else {
      let bucket_todos = getTodosOfBucket(Object.values(todos), newValue.id);
      this.setState({
        data: { ...data, ...newValue },
        todos: bucket_todos
      });
    }
  };

  render() {
    const { data, buckets, todos } = this.state;
    const { id, title = "", description = "" } = data;

    return (
      <Modal
        {...this.props}
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-wide"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {id !== undefined ? `Edit` : `Create`} a Bucket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {id !== undefined ? (
              <Form.Group>
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  onChange={(e) => this.updateField("title", e.target.value)}
                  type="text"
                  value={title}
                  maxLength={50}
                />
              </Form.Group>
            ) : (
              <>
                <label class="form-label">Title *</label>
                <CreatableSelect
                  placeholder={"Bucket Title"}
                  onChange={this.handleChange}
                  options={createOptionForReactSelect(buckets)}
                />
              </>
            )}

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
          <AddToDoList
            todos={todos}
            addTodoInList={this.addTodoInList}
            removeTodoFromList={this.removeTodoFromList}
            editTodoInList={this.editTodoInList}
          />
          <br />
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
