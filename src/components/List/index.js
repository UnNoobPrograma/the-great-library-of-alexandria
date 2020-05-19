import React from "react";

import { container } from "./styles.module.css";

import Item from "../Item";

export default function List({ terms }) {
  return (
    <dl className={container}>
      {terms.map((item) => (
        <Item key={item.title} {...item} />
      ))}
    </dl>
  );
}
