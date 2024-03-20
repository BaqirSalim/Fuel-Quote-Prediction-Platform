import express from "express"
import clientRoutes from './routes/client-profile.routes.js'


const app = express()
const port = 3000


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/client', clientRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})