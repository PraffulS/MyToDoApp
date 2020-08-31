import React from "react";

export class EmptyState extends React.Component {
  render() {
    return (
      <div>
        <div className="not-found">
          <i
            style={{ fontSize: "100px", color: "#f1a7a7" }}
            className="fa fa-exclamation-triangle"
          />{" "}
          <br />
          No Data Found. Use Create New button and start creating!
        </div>
      </div>
    );
  }
}
