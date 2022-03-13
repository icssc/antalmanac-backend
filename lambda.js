// import setup from './server'
const serverlessExpress = require('@vendia/serverless-express')
const setup = require('./server')

const cors_enabled = setup(true)
const cors_disabled = setup(false)

exports.handler = serverlessExpress({ app: cors_enabled })

exports.handler_beta = serverlessExpress({ app: cors_disabled })
