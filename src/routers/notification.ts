import { z } from 'zod'
import Notification from '$models/Notification'
import { router, procedure } from '../trpc'

const notificationSchema = z.object({
  phoneNumber: z.string(),
  sectionCode: z.string(),
  courseTitle: z.string(),
})

const notificationRouter = router({
  /**
   * register for notifications
   */
  register: procedure.input(notificationSchema).mutation(async ({ input }) => {
    const notification = await Notification.findOneAndUpdate(
      { sectionCode: input.sectionCode, phoneNumber: input.phoneNumber },
      { $addToSet: { phoneNumbers: input.phoneNumber } },
      { upsert: true }
    )
    return notification
  }),

  /**
   * find notifications
   */
  find: procedure.input(z.string()).query(async ({ input }) => {
    const data = await Notification.find({ phoneNumbers: input })
    const smsNotificationsList = data.map((section) => {
      return { sectionCode: section.sectionCode, courseTitle: section.courseTitle }
    })
    return smsNotificationsList
  }),
})

export default notificationRouter
