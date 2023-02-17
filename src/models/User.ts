import mongoose from 'mongoose'

const User = new mongoose.Schema({
  _id: String,
  userData: {
    addedCourses: [
      {
        color: String,
        term: String,
        sectionCode: String,
        scheduleIndices: [Number],
      },
    ],
    scheduleNames: { type: [String], default: ['Schedule 1', 'Schedule 2', 'Schedule 3', 'Schedule 4'] },
    customEvents: [
      {
        customEventID: String,
        color: String,
        title: String,
        days: [Boolean],
        scheduleIndices: [Number],
        start: String,
        end: String,
      },
    ],
  },
})

export default mongoose.model('User', User)
