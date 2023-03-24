const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const multer = require('multer')
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//   res.status(503).send('Site is curently down. Check back soon')
// })

// const upload = multer({
//   dest:'images',
//   limits:{
//     fileSize:1000000
//   },
//   fileFilter(req,file,callback){
//     // if(!file.originalname.endsWith('.pdf')){
//     //   return callback(new Error('please upload a file'))
//     // }

//     if(!file.originalname.match(/\.(doc|docx)$/)){
//       return callback(new Error('please upload a document(word) file'))
//     }
//     callback(undefined,true)
//   }
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
//   res.send()
// },(error,req,res,next)=>{
//   res.status(400).send({error:error.message})
// })

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log("port running on port: " + port);
});



// const main= async()=>{
//   // const task = await Task.findById('641ace8247a9ffa534e8e1e8')
//   // await task.populate('owner')
//   // console.log(task.owner)

//   const user = await User.findById('641acd860e58a9c8b24fecce')
//   await user.populate('tasks')
//   console.log(user.tasks)
// }

// main()
