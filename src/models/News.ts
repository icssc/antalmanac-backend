import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: String,
})

export default mongoose.model('News', NewsSchema)
