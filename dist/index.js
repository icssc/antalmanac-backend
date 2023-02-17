import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
async function connect() {
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
  })
  mongoose.connection.on('error', console.error.bind(console, 'Connection error:'))
  await mongoose.connect(process.env.AA_MONGODB_URI || '', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
}
async function start() {
  await connect()
  const app = express()
  app.get('/', (_req, res) => {
    res.send('Hello World!')
  })
  app.listen(3e3, async () => {
    console.log('Example app listening at http://localhost:3000')
  })
}
const antalmanac = start()
export { antalmanac, antalmanac as default }
