const app = require('./app')

const PORT = app.get('port')

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
})
