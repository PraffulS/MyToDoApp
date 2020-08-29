import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { routes } from "./constants";
import { SideBar } from "./SideBar";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="display-flex">
        <div style={{ flex: 0.5, height: "100vh" }}>
          <SideBar />
        </div>
        <div style={{ flex: 2 }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
            <Redirect from={"/"} to={"/to-do"} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
