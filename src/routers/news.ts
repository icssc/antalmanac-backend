import { router, procedure } from '../trpc'
import News from '$models/News'

const newsRouter = router({
  findAll: procedure.query(async () => {
    const news = await News.find()
    return news
  }),
})

export default newsRouter
