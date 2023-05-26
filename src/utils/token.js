
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const PrivateKey = 'CoderTokenFP';

export const createHash = (data) => {
    const salt = bcrypt.genSaltSync(10); // Generar un salt seguro
    const hash = bcrypt.hashSync(data, salt); // Generar el hash utilizando la contraseña y el salt
    return hash;
  };


export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) =>
{
    return await jwt.sign({ user: { ...user, password: undefined } }, PrivateKey, { expiresIn: '1m' });
}