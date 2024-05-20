const UserModel = require("../model/user");

const User = {};

User.register = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ msg: "please send all the data" });
    }

    await UserModel.create({
      email,
      password,
    });

    res.json({ msg: "user created" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

User.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ msg: "not found" });
    }

    if (user.password != password) {
      return res.status(401).json({ msg: "incorrect password" });
    }

    user = {
      ...user._doc,
      id: user._id,
    };

    delete user.password;
    delete user._id;

    res.json({ msg: "user", user });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

module.exports = User;
