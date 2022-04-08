const setup = require('./server')
const port = 8080

require('dotenv').config();

app = setup(process.env.CORS_ENABLED)
app.listen(port)
console.info(`listening on http://localhost:${port}`)
