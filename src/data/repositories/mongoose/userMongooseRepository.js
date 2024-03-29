import userModel from '../../models/mongoose/usersModel.js'
import User from '../../../domain/entities/user.js';
import Role from '../../../domain/entities/role.js';

class UserMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const userDocuments = await userModel.paginate({}, { limit, page });
    const { docs, ...pagination } = userDocuments;

    const users = docs.map(document => new User(
      document._id,
      document.firstName,
      document.lastName,
      document.email,
      document.age,
      document.isAdmin,
      document.role ? new Role(
        document.role.id,
        document.role.name,
        document.role.permissions
      ): null,
      document.lastConnection
    ));

    return {
      users,
      pagination
    };
  }

  async getOne(id)
  {
    const userDocument = await userModel.findOne({ _id: id });

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User(
        userDocument?._id,
        userDocument?.firstName,
        userDocument?.lastName,
        userDocument?.email,
        userDocument?.age,
        userDocument.isAdmin,
        userDocument.role,
        userDocument?.password,
        userDocument?.lastConnection
    );
  }

  async getOneByEmail(email)
  {
    const userDocument = await userModel.findOne({ email });

    return new User (
        userDocument?._id,
        userDocument?.firstName,
        userDocument?.lastName,
        userDocument?.email,
        userDocument?.age,
        userDocument?.isAdmin,
        userDocument?.role,
        userDocument?.password,
        userDocument?.lastConnection
    );
  }

  async create(data)
  {
    const userDocument = await userModel.create(data);

    return new User (
        userDocument._id,
        userDocument.firstName,
        userDocument.lastName,
        userDocument.email,
        userDocument.age,
        userDocument?.isAdmin,
        userDocument.role,
        userDocument.password,
        userDocument?.lastConnection

    );
  }

  async updateOne(id, data)
  {
    const userDocument = await userModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User (
        userDocument._id,
        userDocument.firstName,
        userDocument.lastName,
        userDocument.email,
        userDocument.age,
        userDocument?.isAdmin
    );
  }

  async updatePasswordByEmail(email, password)
  {
    const userDocument = await userModel.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    );

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }
    return true;

  }

  async deleteOne(id)
  {
    return userModel.deleteOne({ _id: id });
  }

  async updateLastConnection(email) {

    try {
      const userDocument = await userModel.findOneAndUpdate(
        { email: email },
        { lastConnection : new Date() },
        { new: true }
      );
  
      if (!userDocument) {
        throw new Error('User not found.');
      }
  
      return new User(
        userDocument._id,
        userDocument.firstName,
        userDocument.lastName,
        userDocument.email,
        userDocument.age,
        userDocument.isAdmin,
        userDocument.role,
        userDocument.password,
        userDocument.lastConnection
      );
    } catch (e) {
      throw new Error(`Error updating last connection: ${e.message}`);
    }
  }

  async findInactiveUsers(minutesInactive) {
    const now = new Date();
    const thresholdDate = new Date(now.getTime() - minutesInactive * 60 * 1000);
  
    const inactiveUserDocuments = await userModel.find({
      last_connection: { $lt: thresholdDate },
    });
  
    const inactiveUsers = inactiveUserDocuments.map((document) => new User(
      document._id,
      document.firstName,
      document.lastName,
      document.email,
      document.age,
      document.isAdmin,
      document.role ? new Role(
        document.role.id,
        document.role.name,
        document.role.permissions
      ) : null
    ));
  
    return inactiveUsers;
  }
  

  async getAllUsers() {
    try {
      const userDocuments = await userModel.find({});
      const users = userDocuments.map((document) => new User(
        document._id,
        document.firstName,
        document.lastName,
        document.email,
        document.age,
        document.isAdmin,
        document.role ? new Role(
          document.role.id,
          document.role.name,
          document.role.permissions
        ) : null,
        document.password,
        document.lastConnection
      ));
      return users;
    } catch (e) {
      throw new Error(`Error getting all users: ${e.message}`);
    }
  }
  
}

export default UserMongooseRepository;