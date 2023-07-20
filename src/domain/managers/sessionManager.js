//import UserMongooseDao from "../../data/repositories/mongoose/userMongooseDao.js";

import {createHash, generateToken, isValidPassword,generateTokenForgotPassword} from '../../shared/index.js';

import userCreateValidation from '../validations/users/userCreateValidation.js'
import loginValidation from "../validations/sessions/loginValidation.js";
import emailValidation from '../validations/sessions/emaiValidation.js';

import container from "../../container.js";


class SessionManager
{
  constructor()
  {
     this.userRepository = container.resolve('UserRepository');
  }

  async login(email, password)
  {
    await loginValidation.parseAsync({ email, password });

    //const user = await this.userDao.getOneByEmail(email);
    const user = await this.userRepository.getOneByEmail(email);

    if(!user.email)
    {
      throw new Error('User dont exist.');
    }

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

    const user  = await this.userRepository.create(dto);
    return { ...user, password: undefined};
  }



  async forgotPassword(email) {
    await emailValidation.parseAsync({ email });

    const user = await this.userRepository.getOneByEmail(email);

    if (!user.email) {
      throw new Error('User dont exist.');
    }
    const tokenPassword =generateTokenForgotPassword(user);


    return tokenPassword

  }

  async changePassword(email, password)
  {
    await loginValidation.parseAsync({ email, password });

    const user = await this.userRepository.getOneByEmail(email);

    const hashedPassword = await createHash(password, 10);

    const isHashedPassword = await isValidPassword(password, user.password);


    if(isHashedPassword)
    {
      throw new Error('You cannot repeat password');
    }

    return this.userRepository.updatePasswordByEmail(email, hashedPassword);
  }


  


}




export default SessionManager;