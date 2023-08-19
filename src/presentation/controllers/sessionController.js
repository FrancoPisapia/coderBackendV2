import SessionManager from '../../domain/managers/sessionManager.js';
import { sendMailPassword } from '../../shared/mailPassword.js';
import { developmentLogger } from '../../shared/logger.js';

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger;

export const login = async  (req, res, next) =>
{
  try
  {
    const { email, password } = req.body;
    const manager = new SessionManager();

    await manager.updateLastConnection(email)

    
    const accessToken = await manager.login(email, password);

    logger?.info(`User ${email} logged in successfully`);

    res.cookie('accessToken', accessToken, {
        maxAge: 60*60*1000,
        httpOnly: true
    }).send({ message: 'Login success!', accessToken })
  }
  catch (e)
  {
    
		next(e);
	}
};

export const current = async  (req, res) =>
{
  res.status(200).send({ status: 'Success', payload: req.user });
};

export const signup = async (req, res, next) =>
{
  try
  {
    const manager = new SessionManager();
    const user = await manager.signup(req.body);

    logger?.info(`User ${user.email} signed up successfully`);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
  }
  catch (e)
  {
		next(e);
	}

};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const manager = new SessionManager();
    const forgotPasswordToken = await manager.forgotPassword(email);
    sendMailPassword(email,forgotPasswordToken)


    logger?.info(`Forgot password token sent to ${email}`);
    res.status(200).json({message:`Token enviado al mail`});
  } catch (e) {
    next(e);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { email, password,tokenFromBody } = req.body;

    
      const manager = new SessionManager();
      const result = await manager.changePassword(email, password,tokenFromBody);

      logger?.info(`Password changed successfully for user ${email}`);

      res.status(200).json({ message: 'Password changed successfully',result});
    


  } catch (e) {
    next(e);
  }
};




