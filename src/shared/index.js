import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createHash = async (password) =>
{
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) =>
{
    return  bcrypt.compare(password,passwordHash);
}

export const generateToken = async (user) =>
{
    return new Promise((resolve, reject) =>
    {
      const token = jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' });
      resolve(token);
    });
}

export const generateTokenForgotPassword = async (user) =>
{
    return new Promise((resolve, reject) =>
    {
      const token = jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
      resolve(token);
    });
}

export const logutToken = async (user) =>
{
  return new Promise((resolve, reject) =>
  {
    const token = jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '0s' });
    resolve(token);
  });
}

export const verifyToken = async (token) =>
{
  return await jwt.verify(token, process.env.PRIVATE_KEY)
}
