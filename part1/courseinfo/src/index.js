import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.parts} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part parts={props.parts} exercises={props.exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      Number of exercises {props.total}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using porps to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Content parts={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Content parts={course.parts[2].name} exercises={course.parts[2].exercises} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))