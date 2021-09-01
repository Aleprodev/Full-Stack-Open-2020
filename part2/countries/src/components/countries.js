import React from 'react';
import OneCountrie from './onecountrie';

const Countries = ({ handleClick, countriesNames }) => {
  const arrayLength = countriesNames.length

  if (arrayLength > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  else if (arrayLength === 1) {
    return <OneCountrie countrieName={countriesNames} />
  }

  else if (arrayLength === 0) {
    return <p>No found</p>
  }

  else {
    return countriesNames.map((c) => (
      <React.Fragment key={c.name}>
        <p>
          {c.name} {" "}
          <button id={c.name} onClick={handleClick}>
            Show
          </button >
        </p>
      </React.Fragment>
    ))
  }
};

export default Countries;