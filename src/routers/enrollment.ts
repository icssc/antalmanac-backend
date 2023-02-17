import { z } from 'zod'
import EnrollmentData from '$models/EnrollmentData'
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
  find: procedure.input(enrollmentSchema).query(async ({ input }) => {
    const quarter = input.pastTerm.split(' ')[1].toLowerCase()
    const year = input.pastTerm.split(' ')[0]
    const sectionCode = input.sectionCode

    const enrollmentData = await EnrollmentData.find({ quarter, year, sectionCode })
    return enrollmentData
  }),
})

export default enrollmentRouter
