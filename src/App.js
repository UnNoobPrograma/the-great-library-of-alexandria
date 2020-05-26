import React from "react";
import { useState } from "react";

import { container } from "./index.module.css";

import Filter from "./components/Filter";
import LetterGroups from "./components/LetterGroups";
import List from "./components/List";

const data = [
  {
    abbr: "HTML",
    title: "HyperTextMarkupLanguage",
    description: "lorem1 HTML blah ... blah ... blah",
  },
  {
    abbr: "CSS",
    title: "CascadeStyleSheet",
    description: "lorem2 HTML blah ... blah ... blah",
  },
  {
    abbr: "JS",
    title: "Javascript",
    description: "lorem3 HTML blah ... blah ... blah",
  },
];

let letters = data.reduce((letters, term) => {
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
      <List terms={terms.filter(({ terms }) => terms.length > 0)} />
    </div>
  );
}

export default App;
