const dbString = process.env.DB_STRING,
  { MongoClient } = require("mongodb"),
  client = new MongoClient(dbString);

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  client,
  connectDB,
};
