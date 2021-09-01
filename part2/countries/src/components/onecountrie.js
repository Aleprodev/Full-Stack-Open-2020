import React from 'react';
import Weather from './weather';

const OneCountrie = ({ countrieName }) => {

  const arrayData = countrieName.map(data => (
    <React.Fragment key={data.name}>
      <h1>{data.name}</h1>
      <p><b>Capital: </b> {data.capital}</p>
      <p><b>Population: </b> {data.population}</p>
      <h2>Languages</h2>
      <ul>
        {data.languages.map((data) => (
          <li key={data.name}>{data.name}</li>
        ))}
      </ul>
      <img width="150" src={data.flag} alt={data.name} />
      <Weather city={data.capital} />
    </React.Fragment>
  ))

  return arrayData
};

export default OneCountrie;