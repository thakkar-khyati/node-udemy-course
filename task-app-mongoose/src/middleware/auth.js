const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      console.log("error");
      throw new Error();
    }
    // const user = await User.findOne({_id:decoded._id,'tokens.token':token}).then((docs)=>{
    //     console.log(User)
    //     req.user = docs
    //     docs.remove()
    // })
    // .catch((err)=>{
    //     console.log(err);
    // });

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
