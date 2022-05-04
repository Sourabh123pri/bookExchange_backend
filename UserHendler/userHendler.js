const user = require("../Database/UserSchema/userSchima");
const bcrypt = require("bcryptjs");

// ragester
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.json({ message: "Please Fill All Fields" });
  } else {
    const userExist = await user.findOne({ email });
    if (userExist) {
      res.json({ message: "Already Regester" });
    } else {
      const createUser = await new user({ name, email, password });
      await createUser.save();
      res.status(201).json({ message: "Succes" });
    }
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please Fill All Fields" });
  } else {
    console.log('check error');
    const userDetail = await user.findOne({ email });
    if (userDetail) {
      const isPasswordcorret = await bcrypt.compare(
        password,
        userDetail.password
      );
      if (isPasswordcorret) {
        const token = await userDetail.generatToken();
        res.cookie("bookToken", token, {
          // when is deploying .that time change httpOnly:false
          httpOnly: true,
          expires: new Date(Date.now() + 282098000),
        });
        res.status(200).json({ message: "Long in succes" });
      } else {
        res.status(400).json({ message: "Invalid User And Password" });
      }
    } else {
      res.status(400).json({ message: "User Not Register" });
    }
  }
};

module.exports = { register, login };
