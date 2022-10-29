import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())
const client = new MongoClient(process.env.MONGO_URI)
client.connect()
console.log('mongo connected')
const PORT = process.env.PORT
const database = client.db('STS')
const userLogdb = database.collection('Logs')
app.listen(PORT, () => console.log('API listening on port 3000'))



app.get("/get", async (req, res) => {
    // console.log(req.body);
    // await userLogdb.insertOne(req.body);
    const allLogs = await userLogdb.find().toArray();
    res.send(allLogs);
})

//           Log Post

app.post("/logs", async (req, res) => {
    console.log(req.body);
    await userLogdb.insertOne(req.body);
    res.json(" Added ");
  });