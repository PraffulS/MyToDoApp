import React from "react";
import { connect } from "react-redux";
import { to_do_list_headers } from "../constants";
import { Button } from "react-bootstrap";
import { DataCard } from "./DataCard";
import { getToDosByStatus, getActiveToDos } from "../utils";
import { EmptyState } from "./EmptyState";
import { AddEditTodoModal } from "./AddEditTodoModal";

class ToDoListViewImpl extends React.Component {
  static defaultProps = {
    todos: {},
    buckets: {},
    complete: null
  };

  state = {
    showModal: false
  };

  componentDidMount() {}

  render_table_headers = () => {
    return to_do_list_headers.map((ins, index) => {
      const { label, flex } = ins;
      return (
        <div key={`th-${index}`} className="p-3-0" style={{ flex: flex }}>
          {label}
        </div>
      );
    });
  };

  render() {
    const { todos, complete, buckets } = this.props;
    const { showModal } = this.state;
    let filtered_data = getActiveToDos(Object.values(todos));

    if (complete) {
      if (complete === 2) {
        filtered_data = getToDosByStatus(Object.values(filtered_data), true);
      } else {
        filtered_data = getToDosByStatus(Object.values(filtered_data), false);
      }
    }

    return (
      <div>
        {!!showModal && (
          <AddEditTodoModal
            onHide={() => this.setState({ showModal: false })}
          />
        )}
        <div style={{ textAlign: "right" }}>
          <Button
            className="btn btn-sm btn-primary"
            onClick={() => this.setState({ showModal: true })}
          >
            + Create New
          </Button>
        </div>
        {Object.keys(filtered_data).length ? (
          <>
            <div className="display-flex table-header">
              {this.render_table_headers()}
            </div>
            <div className="table-body">
              {Object.keys(filtered_data).map((key, index) => (
                <DataCard
                  data={filtered_data[key]}
                  index={index}
                  buckets={buckets}
                  key={`dc-${key}`}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { todos = {}, buckets = {} } = state || {};
  return { todos, buckets };
}

export const ToDoListView = connect(mapStateToProps)(ToDoListViewImpl);
