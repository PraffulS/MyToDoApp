import React from "react";
import { Button, Form } from "react-bootstrap";

export class AddToDoList extends React.Component {
  static defaultProps = {
    todos: []
  };

  state = {};

  componentDidMount() {}

  render_list = () => {
    const { todos = [] } = this.props;
    return todos.map((ins, index) => {
      const { id, title } = ins;
      if (id !== undefined) {
        return <p>{title}</p>;
      } else {
        return (
          <div>
            <Form.Control
              onChange={(e) =>
                this.props.editTodoInList(e.target.value, index, "title")
              }
              type="text"
              value={title}
              maxLength={50}
            />
          </div>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <p>
          Add/Edit ToDos here..
          <Button
            className="btn-xs btn-outline-primary sleek-button"
            onClick={this.props.addTodoInList}
          >
            + Add
          </Button>
        </p>
        <br />
        {this.render_list()}
      </div>
    );
  }
}
