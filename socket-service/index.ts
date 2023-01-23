import express from 'express'
import { Request, Response } from 'express'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hey Socket.io</h1>')
})

io.on('connection', (socket: any) => {
  socket.on('disconnect', () => {
  })
  socket.on('MESSAGE', (data: any) => {
    io.emit('MESSAGE', data)
  })
  socket.on('CHANGE', () => {
    io.emit('CHANGE')
  })
})

http.listen(3001, () => {
  console.log('listening on *:3001')
})