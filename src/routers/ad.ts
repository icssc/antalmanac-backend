import { z } from 'zod'
import { router, procedure } from '../trpc'
import catalogue from '../assets/ads/catalogue'

const adRouter = router({
  /**
   * return a random ad image
   */
  getRandom: procedure.input(z.string().optional()).query(async ({ input }) => {
    const currentDate = new Date().toISOString().slice(0, 10)

    const matchingAds = catalogue
      .filter((c) => c.endDate == null || currentDate <= c.endDate)
      .filter((c) => c.dept.includes('any') || c.dept.includes(input || ''))
      .map((c) => ({ name: c.bannerName, link: c.url }))

    const randomIndex = Math.floor(Math.random() * matchingAds.length)

    return matchingAds[randomIndex]
  }),
})

export default adRouter
