import { z } from 'zod'
import prisma from '$lib/db'
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
    const notification = await prisma.notifications.create({
      data: {
        v: 123,
        phoneNumbers: [input.phoneNumber],
        sectionCode: input.sectionCode,
        courseTitle: input.courseTitle,
      },
    })
    // { sectionCode: input.sectionCode, phoneNumber: input.phoneNumber },
    // { $addToSet: { phoneNumbers: input.phoneNumber } },
    // { upsert: true }
    return notification
  }),

  /**
   * find notifications
   */
  find: procedure.input(z.string()).query(async ({ input }) => {
    const data = await prisma.notifications.findMany({
      where: {
        phoneNumbers: {
          hasSome: [input],
        },
      },
    })
    const smsNotificationsList = data?.map((notification) => {
      return { sectionCode: notification.sectionCode, courseTitle: notification.courseTitle }
    })
    return smsNotificationsList
  }),
})

export default notificationRouter
