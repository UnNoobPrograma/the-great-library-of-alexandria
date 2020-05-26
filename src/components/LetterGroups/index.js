import React from "react";

import { container, item, selected } from "./styles.module.css";

export default function LetterGroups({ letters, onClick, selectedLetter }) {
  return (
    <ul className={container}>
      {letters.map(({ letter }) => (
        <li
          onClick={() => onClick(letter)}
          className={`${item} ${
            selectedLetter === letter ? selected : ""
          }`.trim()}
          key={letter}
        >
          {letter}
        </li>
      ))}
    </ul>
  );
}
