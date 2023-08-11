import nodemailer from 'nodemailer';
import { resolve } from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { createHash,generateTokenForgotPassword, isValidPassword } from '../../shared/index.js';
import emailValidation from '../validations/sessions/emaiValidation.js';
import loginValidation from '../validations/sessions/loginValidation.js';

import container from '../../container.js';

class EmailManager
{
    constructor()
    {
        this.smtp_config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false
        };
        this.userRepository = container.resolve('UserRepository');
    }

    async send(templateFile,email)
    {
        await emailValidation.parseAsync({ email });

        const transporter = nodemailer.createTransport(this.smtp_config);

        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const user = await this.userRepository.getOneByEmail(email);

        if (!user.email) {
            throw new Error('User dont exist.');
          }

        const tokenPassword = await generateTokenForgotPassword(user);
        const html = template({
            token: tokenPassword 
        });

        const mailOptions = {
            from: '"From" <from@node.com>',
            to:  email,
            subject: 'Recuperacion de contraseña',
            html
        };

        await transporter.sendMail(mailOptions);
        
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

export default EmailManager;