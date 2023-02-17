import { z } from 'zod'
import * as websocApi from 'websoc-api'
import { router, procedure } from '../trpc'
import EnrollmentData from '$models/EnrollmentData'
import Notification from '$models/Notification'

const enrollmentSchema = z.object({
  pastTerm: z.string(),
  year: z.string(),
  sectionCode: z.string(),
})

const notificationSchema = z.object({
  phoneNumber: z.string(),
  sectionCode: z.string(),
  courseTitle: z.string(),
})

const appRouter = router({
  '': procedure.query(() => {
    return 'HELLO, GAMER'
  }),

  findEnrollmentData: procedure.input(enrollmentSchema).query(async ({ input }) => {
    const quarter = input.pastTerm.split(' ')[1].toLowerCase()
    const year = input.pastTerm.split(' ')[0]
    const sectionCode = input.sectionCode

    const enrollmentData = await EnrollmentData.find({ quarter, year, sectionCode })
    return enrollmentData
  }),

  registerNotification: procedure.input(notificationSchema).mutation(async ({ input }) => {
    const notification = await Notification.findOneAndUpdate(
      { sectionCode: input.sectionCode, phoneNumber: input.phoneNumber },
      { $addToSet: { phoneNumbers: input.phoneNumber } },
      { upsert: true }
    )
    return notification
  }),

  findNotifications: procedure.input(z.string()).query(async ({ input }) => {
    const data = await Notification.find({ phoneNumbers: input })
    const smsNotificationsList = data.map((section) => {
      return { sectionCode: section.sectionCode, courseTitle: section.courseTitle }
    })
    return smsNotificationsList
  }),

  websoc: procedure.input(z.any()).query(async ({ input }) => {
    const data = await websocApi.callWebSocAPI(input)
    return data
  }),
})

export type appRouter = typeof appRouter
export default appRouter
