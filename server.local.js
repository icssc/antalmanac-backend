const setup = require('./server')
const port = 2632

app = setup(false)
app.listen(port)
console.info(`listening on http://localhost:${port}`)
