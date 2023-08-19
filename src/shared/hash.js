import bcrypt from 'bcrypt'



export const createHash = (data) => {
    const salt = bcrypt.genSaltSync(10); 
    const hash = bcrypt.hashSync(data, salt); 
    return hash;
  };
