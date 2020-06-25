import React from "react";

import {
  container,
  title as titleClass,
  description as descriptionClass,
  details as detailsClass,
  summary as summaryClass,
  share as shareClass,
} from "./styles.module.css";

export default function Item({
  abbr,
  title,
  description,
  resources = [],
  share,
}) {
  const hash = abbr || title;

  function changeLocation() {
    window.location.hash = hash.toLowerCase();

    return window.location;
  }

  return (
    <div onClick={changeLocation} id={hash.toLowerCase()} className={container}>
      <dt className={titleClass}>
        <h2>{abbr ? <abbr title={title}>{abbr}</abbr> : title}</h2>
      </dt>
      <dd className={descriptionClass}>
        {Array.isArray(description)
          ? description.map((description) => <p>{description}</p>)
          : description}
      </dd>
      {resources.length > 0 && (
        <details className={detailsClass}>
          <summary className={summaryClass}>Recursos:</summary>
          <ul>
            {resources.map(({ label, url }, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
      <button
        onClick={() => {
          const { href } = changeLocation();

          share(href);
        }}
        className={shareClass}
        type="button"
      >
        Share
      </button>
    </div>
  );
}
