import { z } from 'zod'
import prisma from '$lib/db'
import { router, procedure } from '../trpc'

const enrollmentSchema = z.object({
  pastTerm: z.string(),
  year: z.string(),
  sectionCode: z.string(),
})

const enrollmentRouter = router({
  /**
   * find a user's enrollment data
   */
  find: procedure.input(enrollmentSchema).query(async () => {
    // const quarter = input.pastTerm.split(' ')[1].toLowerCase()
    // const year = input.pastTerm.split(' ')[0]
    // const sectionCode = input.sectionCode

    /**
     * TODO: no quarter, year, or sectionCode in MongoDB
     */
    const enrollmentData = await prisma.enrollment_data.findMany()
    return enrollmentData
  }),
})

export default enrollmentRouter
