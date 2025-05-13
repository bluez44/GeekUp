import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Aside from "./aside";
import Header from "./Header";
import PathContext from "../context/PathContext";

function Layout() {
  const [pathName, setPathName] = useState(
    window.location.pathname.split("/")[1] || 'albums'
  );

  return (
    <PathContext.Provider value={{ pathName, setPathName }}>
      <div className="d-flex position-relative">
        <Aside />
        <main className="bg-body-tertiary w-100">
          <Header />
          <div className="px-2 py-5 p-md-3 p-lg-5" style={{ minHeight: "calc(100vh - 81px)" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </PathContext.Provider>
  );
}

export default Layout;
