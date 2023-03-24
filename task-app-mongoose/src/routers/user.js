const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth")
const multer = require("multer")
const sharp = require('sharp')
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateToken()
    user.tokens = user.tokens.concat({token})
    await user.save();
    res.status(201).send({user,token});
  } catch (e) {
    res.status(400).send(e);
  }

  // user.save().then((result)=>{
  //     res.status(201).send(user)
  // }).catch((error)=>{
  //     res.status(400)
  //     res.send(error)
  // })
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken()

    user.tokens = user.tokens.concat({token})
    await user.save()

    res.send({user,token});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/user/logout",auth,async(req,res)=>{
  try {
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/user/logoutall",auth,async(req,res)=>{
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    
    res.status(500).send(error)
  }
})

router.get("/users/me",auth, async (req, res) => {

  res.send(req.user)
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send(e);
  // }

  // User.find({}).then((users)=>{
  //     res.send(users)
  // }).catch((e)=>{
  //     res.status(500).send(e)
  // })
});

// router.get("/users/:id", async (req, res) => {
//   _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }

  // User.findById(_id).then((user)=>{
  //     if(!user){
  //         return res.status(404).send()
  //     }

  //     res.send(user)
  // }).catch((e)=>{
  //     res.status(500).send(e)
  // })
// });

router.patch("/users/me",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allwoed = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every((update) => allwoed.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: "invalid update fields" });
  }

  try {
    //const user = await User.findById(req.user._id);

    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    // if (!user) {
    //   return res.status(404).send();
    // }

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me",auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      res.status(404).send;
    }
    // await req.user.remove();
    res.send(user);
  } catch (error) {
    console.log(req.user)
    console.log(error)
    res.status(400).send(error);
  }
});

const upload = multer({
  // dest:'Avatar',
  limits:{
    fileSize:1000000,
  },
  fileFilter(req,file,callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return callback(new Error('Please upload an image'))
    }
    callback(undefined,true)
  }
})

router.post('/user/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
  const buffer = await sharp(req.file.buffer).resize({ width:250, height:250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})

router.delete('/user/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
  req.user.avatar = undefined
  await req.user.save()
  res.send()
},(error,req,res,next)=>{
  res.status(400).send()
})

router.get('/user/:id/avatar',async(req,res)=>{
  const user = await User.findById(req.params.id)

  if(!user || !user.avatar){
    throw new Error
  }

  res.set('content-Type','image/png')
  res.send(user.avatar)
})

module.exports = router;
