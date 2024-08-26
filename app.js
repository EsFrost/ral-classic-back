const express = require('express')
const colorRoutes = require('./routes/colorRoutes')
const cors = require('cors')


const app = express()
const port = 4000

app.use(cors({
  origin: 'http://localhost',
  methods: ['GET']
}))

app.use('/api', colorRoutes)

app.listen(port, () => {
  console.log(`RAL Color API listening at http://localhost:${port}`)
})