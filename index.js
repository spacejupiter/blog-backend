const useBlogRoutes = require('./routes/index')
const express = require('express')
const server = express()
const cors = require('cors')

// Use cors
server.use(cors())
const port = 5700

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
useBlogRoutes(server)

server.on('listening', () => {
  // Mount routes

  console.log('Routes are listening')
})
