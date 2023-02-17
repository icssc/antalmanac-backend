import { initTRPC } from '@trpc/server'

const { procedure, router, _config, mergeRouters, middleware } = initTRPC.create()

export { procedure, router, _config, mergeRouters, middleware }
