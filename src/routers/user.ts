import prisma from '$lib/db'
import { z } from 'zod'
import { router, procedure } from '../trpc'

const userDataSchema = z.object({
  id: z.string(),
  userData: z.any(),
})

const userRouter = router({
  /**
   * load user data
   */
  load: procedure.input(z.string()).query(async ({ input }) => {
    const data = await prisma.users.findFirst({
      where: {
        id: input,
      },
    })
    return data
  }),

  /**
   * save user data
   */
  save: procedure.input(userDataSchema).mutation(async ({ input }) => {
    const { id, userData } = input
    await prisma.users.update({
      where: { id },
      data: { userData },
    })
  }),
})

export default userRouter
