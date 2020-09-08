//6qTykVhCrN3c3yBz

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
    if (err)
        console.log(err);
     const collection = client.db("quotacounterdatabase").collection("quotacountercollection");
    console.log(collection);
    await collection.insertOne({ count: "hello world" })
    client.close();
});

module.exports = {
    get: (req, res) => {

    }
    post: (req, res) => {

    }
}