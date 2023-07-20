import EmailManager from "../../domain/managers/emailManager.js";

export const sendEmail = async  (req, res, next) =>
{
  try
  {
    const { email } = req.body;
    const manager = new EmailManager();
    await manager.send('forgotPassword.hbs',email);

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
      res.status(200).json({ message: 'Password changed successfully',result});
    


  } catch (e) {
    next(e);
  }
};
