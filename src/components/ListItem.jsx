import React from "react";
import { Link } from "react-router";

import styles from '../styles/ListItem.module.css'

function ListItem({ To, Icon, Text, IsActive = false }) {
  return (
    <Link
      to={To}
      className={`${styles.list_item_container} ${IsActive && styles.active} text-decoration-none d-flex gap-2 align-items-center w-100 h-100 px-4 py-3 mt-2`}
    >
      <Icon />
      <span>{Text}</span>
    </Link>
  );
}

export default ListItem;
