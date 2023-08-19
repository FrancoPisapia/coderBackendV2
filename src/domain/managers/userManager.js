import idValidation from '../validations/share/idValidation.js';
import userCreateValidation from '../validations/users/userCreateValidation.js'
import userUpdateValidation from '../validations/users/userUpdateValidation.js'
import container from '../../container.js';

class UserManager
{
  constructor()
  {
    this.userRepository = container.resolve('UserRepository');
  }

  async paginate(criteria)
  {
    return this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email)
  {
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.userRepository.getOne(id);
  }

  async create(data)
  {
    await userCreateValidation.parseAsync(data)
    
    const user = await this.userRepository.create(data);

    return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userRepository.updateOne(id, data);
  }


  async deleteOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.userRepository.deleteOne(id);
  }


  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers(); 
      return users;
    } catch (e) 
    {
      throw new Error(`Error getting all users: ${e.message}`);
    }
  }

}

export default UserManager;