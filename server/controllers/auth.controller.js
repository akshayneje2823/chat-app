import { User } from "../model/user.model.js";
import generateTokenAndSetCookies from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ success: false, error: "Password do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      res
        .status(400)
        .json({ success: false, error: "Username alerady exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar.iran.liara.run

    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? maleProfile : femaleProfile,
    });

    if (newUser) {
      // Generate JWT Token
      generateTokenAndSetCookies(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });

    } else {
      res.status(400).json({ success: false, error: "Invalid user data" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Internal server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordMatch) {
      return res
        .status(403)
        .json({ success: false, error: "Invalid username or password" });
    }

    generateTokenAndSetCookies(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
    
  } catch (error) {
    console.log("Error ==>", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({success:true,message:"Loged out succesfully"})
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
