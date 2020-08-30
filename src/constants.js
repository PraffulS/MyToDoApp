import React from "react";
import { ToDoListView } from "./ToDos/ToDoListView";

export const routes = [
  {
    path: "/to-do",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <ToDoListView />
  },
  {
    path: "/completed",
    sidebar: () => <div>hello!</div>,
    main: () => <ToDoListView complete={2} />
  },
  {
    path: "/incomplete",
    sidebar: () => <div>there!</div>,
    main: () => <ToDoListView complete={3} />
  },
  {
    path: "/buckets",
    sidebar: () => <div>play!</div>,
    main: () => <h2>play</h2>
  }
];

export const to_do_list_headers = [
  { label: "Sr. No.", flex: "1" },
  { label: "Title", flex: "2" },
  { label: "Last Updated", flex: "1.5" },
  { label: "Status", flex: "1" },
  { label: "Actions", flex: "1.1" }
];
