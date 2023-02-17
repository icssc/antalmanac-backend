import { initTRPC } from '@trpc/server'
import type { context } from './context'

const { procedure, router, _config, mergeRouters, middleware } = initTRPC.context<context>().create()

export { procedure, router, _config, mergeRouters, middleware }
