import React from "react";

import { container, groupContainer } from "./styles.module.css";

import Term from "../Term";
import AnchorLetter from "../AnchorLetter";

export default function List({ terms, share }) {
  return (
    <dl className={container}>
      {terms.map((letterGroup) => {
        return (
          <div className={groupContainer} key={letterGroup.letter}>
            <AnchorLetter letter={letterGroup.letter} />
            {letterGroup.terms.map((item, index) => (
              <Term share={share} key={`${item.title}-${index}`} {...item} />
            ))}
          </div>
        );
      })}
    </dl>
  );
}
