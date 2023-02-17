/* eslint-disable no-console */

import 'dotenv/config'
import mongoose from 'mongoose'

async function connect() {
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
  })
  mongoose.connection.on('error', console.error.bind(console, 'Connection error:'))
  await mongoose.connect(process.env.AA_MONGODB_URI || '')
}

export default connect
