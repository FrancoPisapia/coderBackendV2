import SessionManager from "../../domain/managers/sessionManager.js";
import { sendMailPassword } from "../../shared/mailPassword.js";

export const login = async  (req, res, next) =>
{
  try
  {
    const { email, password } = req.body;
    const manager = new SessionManager();
    const accessToken = await manager.login(email, password);

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

//     res.send({ accessToken, message: 'Login success!' });
// };

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
    const accessToken = await manager.forgotPassword(email);
    sendMailPassword(email,accessToken)

    res.status(200).json({message:`Token enviado al mail`,accessToken});
  } catch (e) {
    next(e);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    const manager = new SessionManager();
    const result = await manager.changePassword(email, password);

    res.status(200).json({ message: 'Password changed successfully',result});
  } catch (e) {
    next(e);
  }
};



