//6qTykVhCrN3c3yBz

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:6qTykVhCrN3c3yBz@spotify-yt-converter.g0nux.azure.mongodb.net"//process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    get: (req, res) => {
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
                res.send(10000);
            } else {
                await client.close();
                res.send(count);
            }
        });
    },
    patch: (req, res) => {//this is called when a youtube api call is made, and one of the url params is the amount of units spent
        const cost = req.query.cost;
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