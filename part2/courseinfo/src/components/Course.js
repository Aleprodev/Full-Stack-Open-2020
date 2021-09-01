import React from "react";

const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((preValue, curValue) =>
    preValue + curValue.exercises, 0)
  
  return (
    <div>
      <p><b>Total of {sum} exercises</b></p>
    </div>
  )
}

const Course = ({ courses }) => {
	return (
    <div>
      <Header name={courses.name} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />
    </div>
  )
}

export default Course;
