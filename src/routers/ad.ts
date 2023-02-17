import { z } from 'zod'
import { router, procedure } from '../trpc'

const adRouter = router({
  /**
   * given a name, return the correspond ad image
   */
  getByName: procedure.input(z.string()).query(async ({ input }) => {
    return `Your ad is ${input}`
  }),

  /**
   * return a random ad image
   */
  getRandom: procedure.query(async () => {
    return `Your random ad is ${Math.random()}`
  }),
})

export default adRouter
