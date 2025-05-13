import React, { useContext, useRef, useState } from "react";
import { IoIosAlbums } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";
import { IoChevronBackSharp } from "react-icons/io5";
import { FcNext, FcPrevious } from "react-icons/fc";

import ListItem from "./ListItem";
import PathContext from "../context/PathContext";

import styles from "../styles/Aside.module.css";

function Aside() {
  const { pathName, setPathName } = useContext(PathContext);
  const [isMini, setIsMini] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const aside = useRef();
  const miniBtn = useRef();

  return (
    <div className="aside">
      <div
        className="btn d-block d-md-none shadow position-fixed start-0 z-0 bg-white px-1 py-1 rounded-end-2 rounded-start-0"
        style={{ top: "81px" }}
        onClick={() => setIsActive(true)}
      >
        <CiMenuFries size={40} />
      </div>
      <div
        ref={aside}
        className={`${styles.aside} ${
          isActive && "start-0"
        } d-block d-md-block z-3 bg-white h-100 overflow-hidden`}
        style={{ width: "200px" }}
      >
        <div className="p-4">
          <img
            src="https://geekup.vn/Icons/geekup-logo-general.svg"
            alt="logo"
          />
        </div>

        <div className="pb-4">
          <ul className="list-group px-1">
            <li
              onClick={() => {
                setPathName(window.location.pathname.split("/")[1]);
                setIsActive(false);
              }}
            >
              <ListItem
                To={"/albums"}
                Icon={IoIosAlbums}
                Text={"Albums"}
                IsMini={isMini}
                IsActive={pathName === "albums"}
              />
            </li>

            <li
              onClick={() => {
                setPathName(window.location.pathname.split("/")[1]);
                setIsActive(false);
              }}
            >
              <ListItem
                To={"/users"}
                Icon={FaUsers}
                Text={"Users"}
                IsMini={isMini}
                IsActive={pathName === "users"}
              />
            </li>
          </ul>
        </div>
        <button
          ref={miniBtn}
          className="btn d-block rounded-0 position-fixed bottom-0 d-flex justify-content-center"
          style={{ width: "200px", transition: "all .4s ease-in-out" }}
          onClick={(e) => {
            if (isMini) {
              aside.current.style.width = "200px";
              miniBtn.current.style.width = "200px";
            } else {
              aside.current.style.width = "100px";
              miniBtn.current.style.width = "100px";
            }
            setTimeout(() => {
              setIsMini(!isMini);
            }, 300);
          }}
        >
          {isMini ? <FcNext size={30} /> : <FcPrevious size={30} />}
        </button>
      </div>
      <div
        className={`${
          isActive ? "d-block" : "d-none"
        } d-md-none top-0 start-0 end-0 bottom-0 bg-black position-absolute z-2 opacity-25`}
        onClick={() => setIsActive(false)}
      />
    </div>
  );
}

export default Aside;
