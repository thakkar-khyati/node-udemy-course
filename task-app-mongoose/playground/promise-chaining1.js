require("../src/db/mongoose")
const Task = require("../src/models/task")

// Task.findByIdAndDelete("64194d5b21b1aab04e7d89b2").then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((E)=>{
//     console.log(E)
// })

const DeleteAndCount = async (id,completed)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

DeleteAndCount("64197a66b1ec575ee3926692",false).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})