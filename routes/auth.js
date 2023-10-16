const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
//using AES crypto-js for encrypting the password
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const getuser = await User.findOne({ email });
    if (getuser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
      });
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ message: "User Registration Succesfull", savedUser });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "User Does Not Exist" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken,message:'Login Successfull' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
