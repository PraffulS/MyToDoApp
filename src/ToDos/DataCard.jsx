import React from "react";
import { Badge, Button } from "react-bootstrap";
import { markStatus } from "../redux/actions";
import { AddEditTodoModal } from "./AddEditTodoModal";

export class DataCard extends React.Component {
  static defaultProps = {
    data: {},
    buckets: {}
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
    const { data, buckets } = this.props;
    const {
      id,
      title,
      isCompleted = false,
      lastUpdatedAt,
      description,
      bucketId
    } = data;

    return (
      <div className="data-card">
        {!!showModal && (
          <AddEditTodoModal
            onHide={() => this.setState({ showModal: false })}
            data={data}
          />
        )}
        <div className="display-flex" key={`tb-${id}`}>
          <div style={{ flex: 1 }}>{id + 1}</div>
          <div style={{ flex: 2 }}>{title}</div>
          <div style={{ flex: 1.5 }}>{lastUpdatedAt}</div>
          <div style={{ flex: 1 }}>{this.render_status(isCompleted)}</div>
          <div style={{ flex: 0.8 }}>
            <Button
              className="btn-sm sleek-button btn-outline-primary"
              onClick={() => markStatus(data, !isCompleted)}
            >
              {" "}
              Mark {isCompleted ? `Incomplete` : `Complete`}{" "}
            </Button>
          </div>
          <div style={{ flex: 0.3 }}>
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          {!!(bucketId !== undefined) && (
            <>
              <b>|</b> Bucket -{" "}
              <i style={{ color: "#6f6f6f" }}>{buckets[bucketId].title}</i>
            </>
          )}
        </div>
      </div>
    );
  }
}
