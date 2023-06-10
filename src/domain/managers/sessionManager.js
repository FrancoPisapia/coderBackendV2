import UserMongooseDao from "../../data/dao/userMongooseDao.js";

import {createHash, generateToken, isValidPassword} from '../../utils/token.js';

import userCreateValidation from '../validations/users/userCreateValidation.js'
import loginValidation from "../validations/sessions/loginValidation.js";

class SessionManager
{
  constructor()
  {
     this.userDao = new UserMongooseDao();
  }

  async login(email, password)
  {
    await loginValidation.parseAsync({ email, password });

    const user = await this.userDao.getOneByEmail(email);

    const isHashedPassword = await isValidPassword(password, user.password);

    if (!isHashedPassword)
    {
        throw new Error('Login failed, invalid password.');
    }

    return await generateToken(user);
  }

  async signup(payload)
  {
    await userCreateValidation.parseAsync(payload);

    const dto = {
      ...payload,
      password: await createHash(payload.password, 10)
    }

    const user  = await this.userDao.create(dto);

    return { ...user, password: undefined};
  }
}

export default SessionManager;