import React, { useContext } from "react";
import { Link } from "react-router";
import PathContext from "../context/PathContext";

function Header() {
  const { pathName, setPathName } = useContext(PathContext);

  return (
    <header style={{ height: "81px" }} className="border-bottom d-none d-sm-block">
      <nav className="d-flex justify-content-center align-items-center gap-4 h-100">
        <Link
          className={`text-decoration-none h-100 px-4 ${pathName !== "home" && 'link-opacity-50'}`}
          style={{ lineHeight: "81px" }}
          to={"/"}
          onClick={() => setPathName('albums')}
        >
          Home
        </Link>

        <Link
          className={`text-decoration-none h-100 px-4 ${pathName !== "albums" && 'link-opacity-50'}`}
          style={{ lineHeight: "81px" }}
          to={"/albums"}
          onClick={() => setPathName('albums')}
        >
          Albums
        </Link>

        <Link
          className={`text-decoration-none h-100 px-4 ${pathName !== "users" && 'link-opacity-50'}`}
          style={{ lineHeight: "81px" }}
          to={"/users"}
          onClick={() => setPathName('users')}
        >
          Users
        </Link>
      </nav>
    </header>
  );
}

export default Header;
