import React from "react";

import Recruitment from "../pages/recruitment";
import AddLead from "../pages/add-lead";

export const routes = [
  {
    path: "/customer-success",
    element: <div>Under Construction</div>,
  },
  {
    path: "/team-management",
    element: <div>Under Construction</div>,
  },
  {
    path: "/job-listings",
    element: <div>Under Construction</div>,
  },
  {
    path: "/active-pool",
    element: <div>Under Construction</div>,
  },
  {
    path: "/recruitment",
    element: <Recruitment />,
  },
  {
    path: "/recruitment/add-lead",
    element: <AddLead />,
  },
  {
    path: "/hr",
    element: <div>Under Construction</div>,
  },
];
