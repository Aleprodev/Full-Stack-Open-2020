import React, { useState } from "react"

const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}>{text}</button>

const ShowAnecdotes = ({ title, anecdotes }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{anecdotes}</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [vote, setVote] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,})
    const [selected, setSelected] = useState(0)
    const [mostVotes, setMostVotes] = useState(0)
    const [mostVoted, setMostVoted] = useState(anecdotes[selected])
    const randomNumber = Math.floor(Math.random() * anecdotes.length)

    const handleVote = () => {
        setVote({
            ...vote,
            [selected]: vote[selected] + 1,
        })
        
        if(mostVotes < vote[selected]) {
            setMostVotes(vote[selected])
            setMostVoted(anecdotes[selected])
        }
    }
    
    const nextAnecdote = () => {
        setSelected(randomNumber)
    }


    return (
    <div>
        <ShowAnecdotes title={"Anecdote of the day"} anecdotes={anecdotes[selected]} />
        <p>has {vote[selected]} votes</p>
        <Button handleClick={handleVote} text={"vote"} />
        <Button handleClick={nextAnecdote} text={"next anecdote"} />
        <ShowAnecdotes title={"Anecdote with most votes"} anecdotes={mostVoted} />
    </div>
    )
}



export default App;