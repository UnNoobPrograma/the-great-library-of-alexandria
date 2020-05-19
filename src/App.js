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

let letters = data.reduce((letters, { title }) => {
  const letter = title[0].toLowerCase();

  return {
    ...letters,
    [letter]: true,
  };
}, {});

letters = Object.entries(letters)
  .map((data) => data[0].toUpperCase())
  .sort();

function App() {
  const [state, setState] = useState({ terms: data, filterByLetter: false });

  const { terms, filterByLetter } = state;

  function onFilterByValue(value) {
    const regExp = new RegExp(value, "i");

    const newTerms = data.filter((term) => {
      const termFields = Object.entries(term);

      const hasValue = termFields.reduce(
        (prev, term) => prev || regExp.test(term[1]),
        false
      );

      return hasValue;
    });

    setState({
      terms: newTerms,
    });
  }

  function onFilterByLetter(letter) {
    const regExp = new RegExp(`^${letter}`, "i");

    if (letter !== filterByLetter) {
      const newTerms = data.filter(({ title }) => {
        return regExp.test(title);
      });

      setState({
        terms: newTerms,
        filterByLetter: letter,
      });
    } else {
      setState({
        terms: data,
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
      <List terms={terms} />
    </div>
  );
}

export default App;
