import EmailManager from "../../domain/managers/emailManager.js";
import { developmentLogger } from "../../shared/logger.js"

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger;

export const sendEmail = async  (req, res, next) =>
{
  try
  {
    const { email } = req.body;
    const manager = new EmailManager();
    await manager.send('forgotPassword.hbs',email);
    logger?.info(`Email sent to: ${email}`);
    res.send({ status: 'success' });
  }
  catch (e)
  {
		next(e);
	}
};

export const changePassword2 = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    
      const manager = new EmailManager();
      const result = await manager.changePassword(email, password);
      logger?.info(`Password changed successfully for user with email: ${email}`);
      res.status(200).json({ message: 'Password changed successfully',result});
    


  } catch (e) {
    next(e);
  }
};
