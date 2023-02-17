import mongoose from 'mongoose'

const EnrollmentData = new mongoose.Schema({
  quarter: String,
  sectionCode: String,
  year: String,
  data: [
    {
      date: String,
      maxCapacity: String,
      numCurrentlyEnrolled: String,
      numOnWaitlist: String,
      numRequested: String,
      restrictions: String,
    },
  ],
})

export default mongoose.model('EnrollmentData', EnrollmentData, 'enrollment_data')
