const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://sandadmin:ilovesand@cluster0-yt7ed.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })
client.connect(err => {
  const collection = client.db("3dsandbox").collection("templates")
  // perform actions on the collection object
  client.close();
});