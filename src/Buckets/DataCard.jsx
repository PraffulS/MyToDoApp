import React from "react";
import { Badge, Button } from "react-bootstrap";
import { AddEditBucketModal } from "./AddEditBucketModal";
import { getTodosOfBucket } from "../utils";

export class DataCard extends React.Component {
  static defaultProps = {
    data: {},
    todos: []
  };

  state = {
    showModal: false
  };

  render_status = (isCompleted) => {
    return (
      <Badge
        pill
        style={{
          backgroundColor: isCompleted ? `#49bd49` : `#d9534f`,
          color: `white`
        }}
      >
        {isCompleted ? `Completed` : `Incomplete`}
      </Badge>
    );
  };
  render() {
    const { showModal } = this.state;
    const { data, todos, index } = this.props;
    const { id, title, lastUpdatedAt, description } = data;
    const active_todos = getTodosOfBucket(Object.values(todos), id);

    return (
      <div className="data-card">
        {!!showModal && (
          <AddEditBucketModal
            onHide={() => this.setState({ showModal: false })}
            data={data}
            todos={active_todos}
          />
        )}
        <div className="display-flex" key={`tb-${id}`}>
          <div style={{ flex: 1 }}>{index + 1}</div>
          <div style={{ flex: 2 }}>{title}</div>
          <div style={{ flex: 1.7 }}>{lastUpdatedAt}</div>
          <div style={{ flex: 2 }}>
            {active_todos.filter((ins) => ins.isCompleted).length} /{" "}
            {active_todos.length}
          </div>

          <div style={{ flex: 1 }}>
            <Button
              className="btn-sm sleek-button btn-outline-primary"
              onClick={() => this.setState({ showModal: true })}
            >
              {" "}
              Edit{" "}
            </Button>
          </div>
        </div>
        <div>
          Description -{" "}
          <i style={{ color: "#6f6f6f" }}>{description ? description : "-"}</i>{" "}
          &nbsp;
        </div>
      </div>
    );
  }
}
