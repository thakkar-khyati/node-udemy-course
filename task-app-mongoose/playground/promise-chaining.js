require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate("64194b8a57c9144c9ae713a4",{age:21}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:21})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount("641963283d2992519e15dea1",20).then((r)=>{
    console.log(r)
}).catch((e)=>{
    console.log(e)
})