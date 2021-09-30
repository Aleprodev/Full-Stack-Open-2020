import React, { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons';
import numberServices from './services/numbers';
import noteService from './services/numbers';
import Notification from './components/notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState('message')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  const addName = (event) => {
    event.preventDefault()

    if (newName === '' && newNumber === '') {
      window.alert("Name and number are empty")
    }

    else {
      const personExist = persons.filter((person) =>
        person.name.toLowerCase() === newName.toLowerCase()).length

      if (!personExist) {
        nameAccepted()
      }

      else {
        replaceNumber()
      }
    }
  };

  const nameAccepted = () => {
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    numberServices
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessage(`Added ${response.data.name} succesfully`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })

    return message
  };

  const replaceNumber = () => {
    const confirmReplace = window.confirm(
      `${newName} is already added to the phonebook, replace the old number with a new one?`
    )

    const person = persons.find(p => p.name === newName)
    const changedNumber = { ...person, number: newNumber }

    if (confirmReplace) {
      numberServices
        .update(person.id, changedNumber)
        .then(response => {
          console.log(response)
          setPersons(persons.map(p =>
            (p.id === response.id ? response : p)
          ))
          setMessage('Number changed succesfully')
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          setError('error')
          setMessage(`Information of ${newName} has already been removed from server`)
          setMessage('message')
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value)
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterTerm = (event) => {
    setFilterTerm(event.target.value)
  };

  const handleClick = (event) => {
    const name = event.target.name
    const id = event.target.id
    const confirm = window.confirm(`Delete ${name}?`)

    if (confirm === true) {
      numberServices
        .delNum(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          window.alert('Deleted succesfully')
        })
        .catch(() => {
          window.alert(`${name} has already removed from server`)
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={error} />
      <Filter value={filterTerm} onChange={handleFilterTerm} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterTerm={filterTerm}
        handleClick={handleClick}
      />
    </div>
  )
};

export default App;