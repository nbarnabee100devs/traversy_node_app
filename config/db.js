const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;

/* -- This was when I really wanted to do it all with MongoDB, but I just don't understand the material well enough to manage it all.  -- */
/*
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
*/
