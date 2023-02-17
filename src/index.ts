import 'dotenv/config'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import type { CorsOptions } from 'cors'
import bodyParser from 'body-parser'
import connect from '$lib/db'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import appRouter from './routers'
import createContext from './context'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const corsOptions: CorsOptions = {
  origin: [
    'https://antalmanac.com',
    'https://www.antalmanac.com',
    'https://icssc-projects.github.io/AntAlmanac',
  ],
}

export async function start(corsEnabled?: boolean) {
  await connect()

  const app = express()
  app.use(cors(corsEnabled ? corsOptions : undefined))
  app.use(bodyParser.urlencoded({ extended: true }))

  /**
   * get ad image
   */
  app.get('/getAdImage/:bannerName', (req, res) => {
    fs.access(path.join(__dirname, './assets/ads', req.params.bannerName), fs.constants.R_OK, (err) => {
      if (err) {
        res.status(404).send(err)
      } else {
        const file_path = path.join(__dirname, './assets/ads', req.params.bannerName)
        res.type(path.extname(file_path))
        res.setHeader('isBase64Encoded', 'true')
        const file = fs.readFileSync(file_path)
        res.status(200).send(file)
      }
    })
  })

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )

  app.listen(3000, async () => {
    // eslint-disable-next-line no-console
    console.log('Example app listening at http://localhost:3000')
  })

  return app
}

export const antalmanac = start()
export default antalmanac
