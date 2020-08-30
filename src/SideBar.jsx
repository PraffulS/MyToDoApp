import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { saveTodo, updateTodo, deleteTodo, markStatus } from "./redux/actions";
import { getToDosByStatus, getActiveToDos } from "./utils";

class SideBarImpl extends React.Component {
  static defaultProps = {
    todos: {},
    buckets: []
  };
  componentDidMount() {}
  render() {
    const { todos, buckets } = this.props;

    return (
      <div style={{ height: "100%", backgroundColor: "#efefef" }}>
        <div className="title" onClick={() => (window.location.hash = "")}>
          <i className="fa fa-th-list" aria-hidden="true"></i> &nbsp; My ToDo
          App!
        </div>
        <div
          style={{
            padding: "3%"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink activeClassName="active-link" to="/to-do">
                <i style={{ fontSize: "100%" }} className="fa fa-indent" />
                &nbsp; &nbsp; All{" "}
                <span className="count">
                  {getActiveToDos(Object.values(todos)).length}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/completed">
                <i
                  style={{ fontSize: "100%" }}
                  className="fa fa-check-circle"
                />
                &nbsp; &nbsp; Completed{" "}
                <span className="count">
                  {getToDosByStatus(Object.values(todos), true).length}
                </span>
              </NavLink>
            </li>
            <li href="#/incomplete">
              <NavLink activeClassName="active-link" to="/incomplete">
                <i
                  style={{ fontSize: "100%" }}
                  className="fa fa-pencil-square-o"
                />
                &nbsp; &nbsp; Incomplete{" "}
                <span className="count">
                  {getToDosByStatus(Object.values(todos), false).length}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/buckets">
                <i
                  style={{ fontSize: "100%" }}
                  className="fa fa-shopping-bag"
                />
                &nbsp; &nbsp; My Buckets <span className="count">30</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { todos = {}, buckets = [] } = state || {};
  return { todos, buckets };
}

export const SideBar = connect(mapStateToProps)(SideBarImpl);
