import React from "react";

import { container, groupContainer } from "./styles.module.css";

import Item from "../Item";
import AnchorLetter from "../AnchorLetter";

export default function List({ terms }) {
  return (
    <dl className={container}>
      {terms.map((letterGroup) => {
        return (
          <div className={groupContainer} key={letterGroup.letter}>
            <AnchorLetter letter={letterGroup.letter} />
            {letterGroup.terms.map((item, index) => (
              <Item key={`${item.title}-${index}`} {...item} />
            ))}
          </div>
        );
      })}
    </dl>
  );
}
