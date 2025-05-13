import React from "react";
import { Outlet } from "react-router";
import Aside from "./aside";
import Header from "./Header";

function Layout() {
  return (
    <div className="d-flex">
      <Aside />
      <main className="bg-body-tertiary w-100">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
