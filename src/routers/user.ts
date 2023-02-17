import { z } from 'zod'
import { router, procedure } from '../trpc'
import User from '$models/User'

const userDataSchema = z.object({
  userId: z.string(),
  userData: z.any(),
})

const userRouter = router({
  /**
   * load user data
   */
  load: procedure.input(z.string()).query(async ({ input }) => {
    const data = await User.findById(input)
    return data
  }),

  /**
   * save user data
   */
  save: procedure.input(userDataSchema).mutation(async ({ input }) => {
    const { userId, userData } = input
    await User.findByIdAndUpdate(userId, { $set: { _id: userId, userData: userData } }, { upsert: true })
  }),
})

export default userRouter
