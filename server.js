const http = require("http")
const app = require("./app")

const PORT = process.env["PORT"] ?? 3001
const server = http.createServer(app)

// app.use((req, res, next)=> {
//     console.log('Hitting Server')
//     next();
// })


server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})
