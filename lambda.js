const serverlessExpress = require('@vendia/serverless-express')
const setup = require('./server')

exports.handler = serverlessExpress({ app: setup(process.env.IS_PROD === 'true' ? "prod" : "dev") })
