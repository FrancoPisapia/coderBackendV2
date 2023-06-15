import userModel from "../../models/mongoose/usersModel.js"
import User from '../../../domain/entities/user.js';
import Role from "../../../domain/entities/role.js";

class UserMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const userDocuments = await userModel.paginate({}, { limit, page });
    const { docs, ...pagination } = userDocuments;

    const users = docs.map(document => new User({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age,
      isAdmin: document.isAdmin,
      role: document.role ? new Role(
          document.role.id,
          document.role.name,
          document.role.permissions
      ): null
    }));

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

    return new User({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument.isAdmin,
        role: userDocument.role
    });
  }

  async getOneByEmail(email)
  {
    const userDocument = await userModel.findOne({ email });

    return new User ({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        role: userDocument.role
    });
  }

  async create(data)
  {
    const userDocument = await userModel.create(data);

    return new User ({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
        isAdmin: userDocument?.isAdmin,
        role: null,
    });
  }

  async updateOne(id, data)
  {
    const userDocument = await userModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User ({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        isAdmin: userDocument?.isAdmin
    });
  }

  async deleteOne(id)
  {
    return userModel.deleteOne({ _id: id });
  }
}

export default UserMongooseRepository;