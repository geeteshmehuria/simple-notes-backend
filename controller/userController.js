const { UserModule } = require("../model/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackListToken } = require("../model/blackListModel");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModule.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Email is already in use" });
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        res.send({ error: err });
      } else {
        const user = new UserModule({ username, email, password: hash });
        await user.save();
        res.status(201).send({ message: "User created successfully!" });
      }
    });
  } catch (error) {
    console.log(`Error at registration ${error}`);
    res.status(500).send({ error: `Error at registration ${error}` });
  }
};

//user login with the help or this function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModule.findOne({ email });
    // console.log(">>>>",user)
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: user._id, authors: user.username },
          "masai"
        );
        res.send({ msg: "Login successful", token: token });
      } else {
        res.send({ msg: err });
      }
    });
  } catch (error) {
    console.log(`Error at Login ${error}`);
    res.send({ msg: `Error at Login ${error}` });
  }
};

const logoutUser = async (req, res) => {
  const blackListToken = req.headers.authorization?.split(" ")[1];

  try {
    const Token = await BlackListToken.findOne({ blackListToken });
    if (Token) {
      return res
        .status(403)
        .json({ msg: "You are already logged out. Login again" });
    } else {
      const blacklist = new BlackListToken({ blackListToken });
      await blacklist.save();
      return res.status(200).send({ msg: "User logout successfully" });
    }
  } catch (error) {
    return res.status(500).send({ msg: "internal server error", error: error });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
