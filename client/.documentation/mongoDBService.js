/* eslint-disable no-unused-vars */

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

const dbName = process.env.MONGO_DB_NAME;

const connect = async () => {
  await client.connect();
  client.db(dbName);
  console.log(`Connected to ${dbName}`);
};

// add and return session
// update session
// delete session

const addNote = async () => {};
