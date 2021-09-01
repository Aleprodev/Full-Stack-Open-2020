import React from 'react'

const Persons = ({ persons, filterTerm, handleClick }) => {
  return (
    <div>
      {persons.map((person) =>
        person.name.toLowerCase().includes(filterTerm.toLowerCase()) &&
        (<React.Fragment key={person.id}>
          <p>
            {`${person.name} ${person.number} `}
            <button name={person.name} id={person.id} onClick={handleClick}>
              Delete
            </button>
          </p>
        </React.Fragment>)
      )}
    </div>
  )
}

export default Persons