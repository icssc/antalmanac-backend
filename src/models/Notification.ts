import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  sectionCode: String,
  courseTitle: String,
  phoneNumbers: [String],
})

export default mongoose.model('Notification', NotificationSchema)
