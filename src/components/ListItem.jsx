import React from "react";
import { Link } from "react-router";

import styles from "../styles/ListItem.module.css";

function ListItem({ To, Icon, Text, IsMini = false, IsActive = false }) {
  return (
    <Link
      to={To}
      className={`${styles.list_item_container} ${
        IsActive && styles.active
      } overflow-x-hidden text-decoration-none d-flex gap-2 flex-wrap ${
        IsMini && "justify-content-center"
      } align-items-center w-100 h-100 px-4 py-3 mt-2`}
      style={{ transition: "all .3s ease-in-out" }}
    >
      <Icon />
      <span>{Text}</span>
    </Link>
  );
}

export default ListItem;
