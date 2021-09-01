import React from 'react'

const PersonForm = (props) => {
  const { addName, newName, handleNewName, newNumber, handleNewNumber } = props
  return (
    <div>
      <form onSubmit={addName}>
        <div>Name: <input value={newName} onChange={handleNewName} /></div>
        <div>Number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div><button type='submit'>add</button></div>
      </form>
    </div>
  )
}

export default PersonForm