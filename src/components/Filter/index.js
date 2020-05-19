import React from "react";

import { container, label, input } from "./style.module.css";

export default function Filter({ onChange }) {
  return (
    <label className={container}>
      <span className={label}>Filter:</span>
      <input
        className={input}
        onChange={(event) => onChange(event.target.value)}
        type="text"
      />
    </label>
  );
}
