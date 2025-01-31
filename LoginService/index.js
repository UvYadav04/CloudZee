const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const helmet = require('helmet')
const loginrouter = require('./Routes/login');
const authenticator = require('./Middlewares/Authenticator');
app.use(helmet());
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000; // Use default port 3000 if not provided

app.get('/', (req, res) => {
    res.send({ success: false, message: "please attach a path name with the request" })
})

app.use('/user/getUserWithId/:email/:mac', authenticator, loginrouter)

// Basic error handling middleware  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
