import { router, procedure } from '../trpc'
import News from '$models/News'

const newsRouter = router({
  /**
   * return all news
   */
  findAll: procedure.query(async () => {
    const news = await News.find()
    return news
  }),
})

export default newsRouter
