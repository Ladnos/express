import express from 'express';
const app = express()
const env = require('dotenv').config();
import testDbConnection from './src/models/index';
import colors from 'colors';
import api from './src/routes/api';


app.use(express.json())
app.disable("x-powered-by")
app.use('/api', api)
app.get('/test/test/test', (req, res)=>{
})
let test = app.listen(process.env.PORT, async () => {
  console.log(colors.bgGreen(`Example app listening on port ${process.env.PORT}`))
})

let dbConnection = testDbConnection.testDbConnection()

if (!dbConnection) {
  test.close()
}