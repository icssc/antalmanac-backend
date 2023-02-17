import { z } from 'zod'
import { router, procedure } from '../trpc'

const adRouter = router({
  getByBannerName: procedure.input(z.string()).query(async ({ input }) => {
    return `Your ad is ${input}`
  }),

  getRandom: procedure.query(async () => {
    return `Your random ad is ${Math.random()}`
  }),
})

export default adRouter
