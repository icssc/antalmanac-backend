import { router, procedure } from '../trpc'
import prisma from '$lib/db'

const newsRouter = router({
  /**
   * return all news
   */
  findAll: procedure.query(async () => {
    const news = await prisma.news.findMany()
    return news
  }),
})

export default newsRouter
