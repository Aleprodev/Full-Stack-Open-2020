import React, { useState } from "react"

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const avg = (good - bad) / all
  const positive = (good / (all)) * 100

  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <Statistic text={"Good"} value={good} />
        <Statistic text={"Neutral"} value={neutral} />
        <Statistic text={"Bad"} value={bad} />
        <Statistic text={"All"} value={all} />
        <Statistic text={"Average"} value={avg} />
        <Statistic text={"Positive"} value={positive + " %"} />
      </table>
    </div>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => setGood(good + 1)
  const handleNeutralClicks = () => setNeutral(neutral + 1)
  const handleBadClicks = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClicks} text={"good"}/>
      <Button handleClick={handleNeutralClicks} text={"neutral"}/>
      <Button handleClick={handleBadClicks} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;