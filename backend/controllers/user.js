import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generate } from '../helpers/token.js';
import { ROLES } from '../constants/index.js';

export const register = async (email, password) => {
  if (!password) {
    throw new Error('Password is empty');
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user.id });

  user.lastLoginAt = new Date();
  await user.save();

  return { token, user };
};

export const getUsers = () => User.find();

export const getRoles = () => [
  { id: ROLES.ADMIN, name: 'Admin' },
  { id: ROLES.MANAGER, name: 'Manager' },
  { id: ROLES.USER, name: 'User' },
];

export const deleteUser = (id) => User.deleteOne({ _id: id });

export const updateUser = (id, userData) =>
  User.findByIdAndUpdate(id, userData, { returnDocument: 'after', runValidators: true });
