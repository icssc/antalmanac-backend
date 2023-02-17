import 'dotenv/config'
import express from 'express'
import connect from '$lib/db'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import appRouter from './routers'

async function start() {
  await connect()

  const app = express()

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
    })
  )

  app.listen(3000, async () => {
    // eslint-disable-next-line no-console
    console.log('Example app listening at http://localhost:3000')
  })
}

export const antalmanac = start()
export default antalmanac
