import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <header style={{ height: "81px" }} className="border">
      <nav className="d-flex justify-content-center align-items-center gap-4 h-100">
        <Link
          className="text-decoration-none h-100 px-4"
          style={{ lineHeight: "81px" }}
          to={"/"}
        >
          Home
        </Link>

        <Link
          className="text-decoration-none h-100 px-4"
          style={{ lineHeight: "81px" }}
          to={"/albums"}
        >
          Albums
        </Link>

        <Link
          className="text-decoration-none h-100 px-4"
          style={{ lineHeight: "81px" }}
          to={"/users"}
        >
          Users
        </Link>
      </nav>
    </header>
  );
}

export default Header;
