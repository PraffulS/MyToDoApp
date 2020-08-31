import React from "react";
import { Button, Form, Badge } from "react-bootstrap";

export class AddToDoList extends React.Component {
  static defaultProps = {
    todos: []
  };

  state = {};

  componentDidMount() {}

  render_status = (isCompleted) => {
    return (
      <Badge
        pill
        style={{
          backgroundColor: isCompleted ? `#49bd49` : `#d9534f`,
          color: `white`,
          fontSize: '10px'
        }}
      >
        {isCompleted ? `Completed` : `Incomplete`}
      </Badge>
    );
  };

  render_list = () => {
    const { todos = [] } = this.props;
    return todos.map((ins, index) => {
      const { id, title, isCompleted } = ins;
      if (id !== undefined) {
        return (
          <p style={{ borderBottom: "1px solid #e0dcdc" }}>
            {title} &nbsp;&nbsp;&nbsp;
            {this.render_status(isCompleted)}
          </p>
        );
      } else {
        return (
          <div className="display-flex" key={`todo-${index}`}>
            <div style={{ flex: 1 }}>
              <Form.Control
                onChange={(e) =>
                  this.props.editTodoInList(e.target.value, index, "title")
                }
                type="text"
                value={title}
                maxLength={50}
              />
            </div>
            <div
              style={{ flex: 0.1, fontSize: "20px", paddingTop: "8px" }}
              onClick={() => {
                this.props.removeTodoFromList(index);
              }}
            >
              <i style={{ float: "right" }} className="fa fa-times cursor" />
            </div>
          </div>
        );
      }
    });
  };

  render() {
    const { todos = [] } = this.props;

    return (
      <div>
        <p>
          Bucket ToDos ({todos.length})
          <Button
            style={{ float: "right" }}
            className="btn btn-sm btn-outline-primary"
            onClick={this.props.addTodoInList}
          >
            + Add
          </Button>
        </p>
        <div className="scroll-div">{this.render_list()}</div>
      </div>
    );
  }
}
