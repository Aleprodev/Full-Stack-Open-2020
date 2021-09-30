const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: true
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  },
  {
    id: 4,
    content: "Soy Alejandro Piña y esta es mi primera aplicación web madafakas",
    date: "2021-09-07T23:41:14.298Z",
    important: true
  }
]

//app.use se usa para ejecutar una acción sin necesidad de modificar algo y mostrar mensajes
//Un middleware tiene tres parametros, req, res y next para pasar al siguiente
//Morgan middleware
app.use(morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    request.method === 'POST' ? JSON.stringify(request.body) : '',
  ].join(' ')
}))

//GET
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

//DELETE
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

//POST
const generateId = () => {
  const randomId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0

  return randomId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  const content = notes.find(n => n.content === body.content)

  if (!body.content) {
    return response.status(400).json({
      error: 'Data must not be empty'
    })
  }

  if (content) {
    return response.status(401).json({
      error: 'Note must be unique'
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  }

  notes = notes.concat(note)

  response.json(notes)
})

//PUT
app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.body.id)

  notes = notes.map(n => n.id === id ? request.body : n)

  response.json(notes)
})

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})