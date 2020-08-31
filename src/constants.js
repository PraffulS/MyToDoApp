import React from "react";
import { ToDoListView } from "./ToDos/ToDoListView";
import { BucketsListView } from "./Buckets/BucketsListView";

export const routes = [
  {
    path: "/to-do",
    exact: true,
    main: () => <ToDoListView />
  },
  {
    path: "/completed",
    main: () => <ToDoListView complete={2} />
  },
  {
    path: "/incomplete",
    main: () => <ToDoListView complete={3} />
  },
  {
    path: "/buckets",
    main: () => <BucketsListView />
  }
];

export const to_do_list_headers = [
  { label: "Sr. No.", flex: "1" },
  { label: "Title", flex: "2" },
  { label: "Last Updated", flex: "1.5" },
  { label: "Status", flex: "1" },
  { label: "Actions", flex: "1.1" }
];

export const buckets_list_headers = [
  { label: "Sr. No.", flex: "1" },
  { label: "Title", flex: "2" },
  { label: "Last Updated", flex: "1.5" },
  { label: "Status (Done/All)", flex: "2" },
  { label: "Actions", flex: "1" }
];
