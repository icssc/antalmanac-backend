import serverlessExpress from '@vendia/serverless-express'
import { start } from '.'
import type { Context, Handler } from 'aws-lambda'

let cachedHandler: Handler

export async function handler(event: any, context: Context, callback: any) {
  if (!cachedHandler) {
    const app = await start()
    cachedHandler = serverlessExpress({ app })
  }
  return cachedHandler(event, context, callback)
}
