const express = require('express')
const app = express()
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()
const folderRouter = require('./Routes/Folder')
const verifyingOfficer = require('./Middleware/verification')
app.use(helmet())
app.use(express.json())

app.use('/folders', verifyingOfficer, folderRouter)

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})