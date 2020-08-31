import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { buckets_list_headers } from "../constants";
import { getActiveToDos } from "../utils";
import { EmptyState } from "../ToDos/EmptyState";
import { AddEditBucketModal } from "./AddEditBucketModal";
import { DataCard } from "./DataCard";

class BucketsListViewImpl extends React.Component {
  static defaultProps = {
    todos: {},
    buckets: {}
  };

  state = {
    showModal: false
  };

  componentDidMount() {}

  render_table_headers = () => {
    return buckets_list_headers.map((ins, index) => {
      const { label, flex } = ins;
      return (
        <div key={`th-${index}`} className="p-3-0" style={{ flex: flex }}>
          {label}
        </div>
      );
    });
  };

  render() {
    const { todos, buckets } = this.props;
    const { showModal } = this.state;
    let filtered_data = getActiveToDos(Object.values(buckets));

    return (
      <div>
        {!!showModal && (
          <AddEditBucketModal
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
        {filtered_data.length ? (
          <>
            <div className="display-flex table-header">
              {this.render_table_headers()}
            </div>
            <div className="table-body">
              {filtered_data.map((data, index) => (
                <DataCard data={data} key={`dc-${index}`} todos={todos} />
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

export const BucketsListView = connect(mapStateToProps)(BucketsListViewImpl);
