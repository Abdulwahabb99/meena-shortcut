import Icon from "@mui/material/Icon";
import React from "react";
import Home from "layouts/Home/Home";

export const routes = [
  {
    type: "collapse",
    name: "Shortcut",
    nameKey: "common.home",
    key: "home",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/",
    component: <Home />,
    noCollapse: true,
    protected: true,
  },
];
