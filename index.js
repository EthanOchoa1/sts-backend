import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
console.log('mongo connected')
const PORT = process.env.PORT
const database = client.db('STS')
client.connect()
const userLogdb = database.collection('Logs')
app.listen(PORT, () => console.log('API listening on port 3000'))


app.get('/', async (req, res) => {
    const allLogs = await userLogdb.find().toArray()
    res.send(allLogs)
    console.log(userLogdb)
  })

//           Log Post

app.post("/logs", async (req, res) => {
    console.log(req.body);
    await userLogdb.insertOne(req.body);
    res.json(" Added ");
  });