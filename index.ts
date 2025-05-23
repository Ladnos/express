import express from 'express';
const app = express()
const env = require('dotenv').config();
import testDbConnection from './src/models/index';
import colors from 'colors';
import api from './src/routes/api';
import session from 'express-session'
import sequelize from './database';
import sequileStore from 'connect-session-sequelize'


const SequelizeStore = sequileStore(session.Store);

app.use(express.json())
app.disable("x-powered-by")
app.use('/api', api)
let sessionDb =new SequelizeStore({
      db: sequelize,
})
app.use(
  session({
    secret: process.env.SECRET_SESSION ?? "tesadtsdtsgsfhsvh",
    store: sessionDb,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);
sessionDb.sync()
app.get('/test/test/test', (req, res)=>{
})
let test = app.listen(process.env.PORT, async () => {
  console.log(colors.bgGreen(`Example app listening on port ${process.env.PORT}`))
})

let dbConnection = testDbConnection.testDbConnection()

if (!dbConnection) {
  test.close()
}