const express = require('express')
const app = express()
const env = require('dotenv').config();
const db = require('./models/index.js');
const colors = require('colors');
const api = require('./routes/api')


app.use(express.json())
app.disable("x-powered-by")
app.use('/api', api)
app.get('/test/test/test', (req, res)=>{
})
let test = app.listen(process.env.PORT, async () => {
  console.log(colors.bgGreen(`Example app listening on port ${process.env.PORT}`))
})

let dbConnection = db.testDbConnection()

if (!dbConnection) {
  test.close()
}