const Users = require("../model/User");

const register = async (req, res) => {
  const user = await Users.create({ ...req.body }); 

  const token = user.createJWT();
  res.status(201).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const {email, password} = req.body
  if(!email || !password) {
    res.status(400).send("Please provide email & password")
  }
  const user = await Users.findOne({email})
  if(!user){
    res.send('User unauthenticated') 
  }
  const isCorrect = await user.CheckPassword(password)
  if(!isCorrect){
    res.send('Incorrect Password')
  }
  const token = user.createJWT()
  res.status(200).json({user: user.name, token})
};

module.exports = {
  login,
  register,
};
