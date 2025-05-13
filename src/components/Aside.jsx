import React from "react";
import { Link } from "react-router";
import { IoIosAlbums } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";

import ListItem from "./ListItem";

function Aside() {
  return (
    <div>
      <div style={{ width: "200px" }} className="p-4">
        <img src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="logo" />
      </div>

      <div className="pb-4">
        <ul className="list-group px-1">
          <li>
            <ListItem
              To={"/albums"}
              Icon={IoIosAlbums}
              Text={"Albums"}
              IsActive={true}
            />
          </li>

          <li>
            <ListItem To={"/users"} Icon={FaUsers} Text={"Users"} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Aside;
