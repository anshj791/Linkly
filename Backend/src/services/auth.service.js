
import jwt from 'jsonwebtoken';
import { createUser, findUserbyEmail } from '../dao/user.dao.js';
import { signinToken } from '../utils/helper.js';
import { cookieOption } from '../config/config.js';
import bcrypt from 'bcryptjs';


export const registerUser = async (name, email, password) => {
  const user = await findUserbyEmail(email);
  if (user) throw new Error('User already exists');

  const newUser = await createUser({ name, email, password });
  const token = signinToken({ id: newUser._id });
  return { user: newUser, token };
};



export const loginUser = async (email, password) => {
  const user = await findUserbyEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = signinToken({ id: user._id });
  return { user, token };
};
