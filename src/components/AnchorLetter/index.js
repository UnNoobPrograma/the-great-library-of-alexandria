import React from "react";

import { container, letter as letterClass } from "./styles.module.css";

export default function AnchorLetter({ letter }) {
  return (
    <div className={container}>
      <div className={letterClass}>{letter}</div>
    </div>
  );
}
