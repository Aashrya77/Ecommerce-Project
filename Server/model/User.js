require('dotenv').config()

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please Provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8
  }
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

UserSchema.methods.CheckPassword = async function (orgPass){
    const isCorrect = await bcrypt.compare(orgPass, this.password)
    return isCorrect
}

module.exports = mongoose.model('Users', UserSchema)