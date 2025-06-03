import { cookieOption } from "../config/config.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await registerUser(name, email, password);
  req.user = user;
  res.cookie("acseestoken", token, cookieOption);
  res.status(200).json({ message: "user registerd successfully" });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("acseestoken", token, cookieOption);
  res.status(200).json({ massage: "user login successfully" });
});

export const logout = wrapAsync(async (req, res) => {

  res.clearCookie("acseestoken");
  res.status(200).json({ message: "user logout successfully" });

}
)



export const get_curruntuser = wrapAsync(async (req, res) => {
     res.status(200).send({user : req.user});
} 
)