const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID()
// console.log(id)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

const client = new MongoClient(connectionURL);
const db = client.db(databaseName);

// db.collection('users').findOne({
//     name:'khyati'
// }).then((result)=>{
//     console.log(result)
//     console.log("found")
// }).catch((error)=>{
//     console.log(error)
// })

// db.collection('users').updateOne({
//     _id : new ObjectID("6418452af014eb30c28c84c7")
// },{
//     $inc:{
//         age:1
//     }
// }).then((result)=>{
//     console.log(result)
//     console.log("successfully updated")
// }).catch((error)=>{
//     console.log(error)
// })

// db.collection('tasks').updateMany(
//     {
//         completed: false
//     },{
//         $set:{
//             completed: true
//         }
//     }
// ).then((result)=>{
//     console.log(result)
//     console.log("updated")
// }).catch((error)=>{
//     console.log(error)
// })

db.collection('users').deleteMany({
    age:21
}).then((result)=>{
    console.log(result)
    console.log("deleted")
}).catch((error)=>{
    console.log(error)
})