import React from "react";
import { useState } from "react";

import { container } from "./index.module.css";

import Filter from "./components/Filter";
import LetterGroups from "./components/LetterGroups";
import List from "./components/List";
import Sharer from "./components/Sharer";

import { terms } from "./data.json";

let letters = terms.reduce((letters, term) => {
  const letter = term.title[0].toLowerCase();

  if (letters[letter]) {
    return {
      ...letters,
      [letter]: {
        terms: [...letters[letter].terms, term],
      },
    };
  } else {
    return {
      ...letters,
      [letter]: {
        terms: [term],
      },
    };
  }
}, {});

letters = Object.entries(letters)
  .map((data) => ({
    letter: data[0].toUpperCase(),
    terms: data[1].terms,
  }))
  .sort((a, b) => {
    return a.letter < b.letter ? -1 : 1;
  });

function App() {
  const [state, setState] = useState({ terms: letters, filterByLetter: false });
  const [shareUrl, setShareUrl] = useState();

  const { terms, filterByLetter } = state;

  function onFilterByValue(value) {
    const regExp = new RegExp(value, "i");

    const newTerms = letters.map((letterGroup) => {
      const newTerms = letterGroup.terms.filter((term) => {
        const termFields = Object.entries(term);

        const hasValue = termFields.reduce(
          (prev, term) => prev || regExp.test(term[1]),
          false
        );

        return hasValue;
      });

      return {
        ...letterGroup,
        terms: newTerms,
      };
    });

    setState({
      terms: newTerms,
    });
  }

  function onFilterByLetter(letter) {
    const regExp = new RegExp(`^${letter}`, "i");

    if (letter !== filterByLetter) {
      const newTerms = letters.map((letterGroup) => {
        const newTerms = letterGroup.terms.filter(({ title }) => {
          return regExp.test(title);
        });

        return {
          ...letterGroup,
          terms: newTerms,
        };
      });

      setState({
        terms: newTerms,
        filterByLetter: letter,
      });
    } else {
      setState({
        terms: letters,
        filterByLetter: false,
      });
    }
  }

  return (
    <div className={container}>
      <LetterGroups
        onClick={onFilterByLetter}
        letters={letters}
        selectedLetter={filterByLetter}
      />
      <Filter onChange={onFilterByValue} />
      <List
        share={(url) => {
          setShareUrl(url);

          setTimeout(() => {
            setShareUrl();
          }, 10 * 1000);
        }}
        terms={terms.filter(({ terms }) => terms.length > 0)}
      />
      {shareUrl && <Sharer url={shareUrl} />}
    </div>
  );
}

export default App;
