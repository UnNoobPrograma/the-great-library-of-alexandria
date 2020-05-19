import React from "react";

import {
  container,
  title as titleClass,
  description as descriptionClass,
} from "./styles.module.css";

export default function Item({ abbr, title, description }) {
  const hash = abbr || title;

  return (
    <div id={hash.toLowerCase()} className={container}>
      <dt className={titleClass}>
        {abbr ? <abbr title={title}>{abbr}</abbr> : title}
      </dt>
      <dd className={descriptionClass}>{description}</dd>
    </div>
  );
}
