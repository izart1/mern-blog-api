import UserModel from '../models/User.js';

export const registration = async (req, res, next) => {
  try {
    const candidate = await UserModel.findOne({ email: req.body.email });

    if (candidate) {
      return res.status(403).json({
        message: 'Пользователь с таким почтовым адресом уже существует',
      });
    }
  } catch (e) {}
};
export const login = async (req, res, next) => {
  try {
  } catch (e) {}
};
export const logout = async (req, res, next) => {
  try {
  } catch (e) {}
};
export const getUsers = async (req, res, next) => {
  try {
    res.json(['123', '456']);
  } catch (e) {}
};
export const activate = async (req, res, next) => {
  try {
    res.json(['123', '456']);
  } catch (e) {}
};
export const refresh = async (req, res, next) => {
  try {
    res.json(['123', '456']);
  } catch (e) {}
};
