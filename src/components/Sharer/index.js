import React from "react";

import { container, input } from "./styles.module.css";

export default function Notification({ url }) {
  return (
    <div className={container}>
      <label>
        Enlace al termino{" "}
        <input
          onFocus={({ target }) => {
            target.select();
          }}
          className={input}
          type="text"
          value={url}
        />
      </label>
    </div>
  );
}
