const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port =3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.Db_User}:${process.env.Db_Pass}@cluster0.rfaan6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

const database = client.db('food-distribution-system');
const supplyCollection = database.collection('supplyCollection')

app.get('/supples',async(req,res) => {
    const result = await supplyCollection.find().toArray();
    res.send({
        status:"success",
        data:result
    })
})

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);



app.get('/',(req,res) => {
    res.send('server is runing')
})

app.listen(port,() => {
    console.log(`server is runnig port on ${port}`)
})