const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique:true,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email Invalid.");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      // if(value.length<=6){
      //     throw new Error('Password should have more than 6 charactors.')
      // }
      if (value.toLowerCase().includes("password")) {
        throw new Error('password can not be "password"');
      }
    },
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
  avatar:{
    type:Buffer
  }
},{
  timestamps:true
});

userSchema.virtual('tasks',{
  ref:'tasks',
  localField:'_id',
  foreignField:'owner'
})

userSchema.static("findByCredentials",async function (email,password){

  const user = await User.findOne({email})
  if(!user){
      throw new Error('unable to login')
  } 

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
      throw new Error('unable to login')
  }
  return user
})

userSchema.methods.generateToken = async function (){
  const user = this
  const token = jwt.sign({ _id: user._id.toString() },'thisismynewcourse')
  return token
}

userSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.pre('save',async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})



const User = mongoose.model("user", userSchema);

module.exports = User;
