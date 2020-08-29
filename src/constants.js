import React from "react";

export const routes = [
  {
    path: "/to-do",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/completed",
    sidebar: () => <div>hello!</div>,
    main: () => <h2>hello</h2>
  },
  {
    path: "/incomplete",
    sidebar: () => <div>there!</div>,
    main: () => <h2>there</h2>
  },
  {
    path: "/buckets",
    sidebar: () => <div>play!</div>,
    main: () => <h2>play</h2>
  }
];
