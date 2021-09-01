import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import Countries from './components/countries';

const App = () => {
  const [all, setAll] = useState([])
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAll(response.data)
      })
  }, []);

  const handleFilterTerm = (event) => {
    setFilterTerm(event.target.value)
  };

  const handleClick = (event) => {
    setFilterTerm(event.target.id)
  };

  const filterCountries = () => {
    return all.filter((countrie) =>
      countrie.name.toLowerCase().includes(filterTerm.toLowerCase())
    )
  };

  return (
    <div>
      <Filter value={filterTerm} onChange={handleFilterTerm} />
      {
        filterTerm &&
        <Countries
          handleClick={handleClick}
          countriesNames={filterCountries()}
        />
      }
    </div>
  )
};

export default App;