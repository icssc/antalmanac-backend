import { z } from 'zod'
import * as websocApi from 'websoc-api'
import { router, procedure } from '../trpc'

const websocRouter = router({
  /**
   * forward the request to the websoc api
   */
  request: procedure.input(z.any()).query(async ({ input }) => {
    const data = await websocApi.callWebSocAPI(input)
    return data
  }),
})

export default websocRouter
