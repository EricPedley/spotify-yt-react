//6qTykVhCrN3c3yBz

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;
module.exports = {
    get: (req, res) => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            const collection = client.db("quotacounterdatabase").collection("quotacountercollection");
            const day = Math.floor((Date.now() - 7 * 3600 * 1000) / 86400000)
            const { count } = await collection.findOne({ day: day }) || { count: undefined };
            if (count === undefined) {
                await collection.insertOne({ day: day, count: 10000 });
                await client.close();
                res.send("10000");
            } else {
                await client.close();
                res.send(`${count}`);
            }
        });
    },
    patch: (req, res) => {//this is called when a youtube api call is made, and one of the url params is the amount of units spent
        const cost = req.query.cost;
        console.log(cost);
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            if (err)
                console.log(err);
            const collection = client.db("quotacounterdatabase").collection("quotacountercollection");
            const day = Math.floor((Date.now() - 7 * 3600 * 1000) / 86400000)
            const { count } = await collection.findOne({ day: day }) || { count: undefined };
            if (count !== undefined) {
                await collection.replaceOne({}, { day: day, count: count - cost });
                res.send(true);
            } else {
                res.send(false);
            }
            client.close();
        });
    }
}