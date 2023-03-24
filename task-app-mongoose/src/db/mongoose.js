const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  
  autoIndex: true,
});

// const { MongoClient } = require('mongodb');

// const createIndex = async () => {
//   try {
//     const url = 'mongodb://127.0.0.1:27017';
//     const client = new MongoClient(url);
//     const dbName = 'task-manager-api';
//     await client.connect();
//     const db = client.db(dbName);
//     await db.collection('users').createIndex(
//       {email: 1 },
//       { unique: true },
//     );

//     process.exit(1);
//   } catch (err) {
//     console.log(err.stack);
//   }
// };
// createIndex();
