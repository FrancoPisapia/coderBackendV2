import UserManager from "../../domain/managers/userManager.js";
import { developmentLogger } from "../../shared/logger.js"

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger

export const list = async  (req, res, next) =>
{
  try
  {
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
  }
  catch (e)
  {
      next(e);
  }
};

export const getOne = async (req, res, next) =>
{
  try
  {
    
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);
    logger?.info(`User retrieved with ID ${id}`);
    res.send({ status: 'success', user });
  }
  catch (e)
  {
    next(e);
  }
};

export const save = async (req, res, next) =>
{
  try 
  {

    const manager = new UserManager();
    const user = await manager.create(req.body);
    logger?.info(`New user created with email: ${user.email}`);
    res.send({ status: 'success', user, message: 'User created.' });
  }
  catch (e)
  {
    next(e);
  }
}



export const update = async (req, res, next) =>
{
  try
  {

    const { id } = req.params;

    const manager = new UserManager();
    const result = await manager.updateOne(id, req.body);
    logger?.info(`User updated with ID ${id}`);
    res.send({ status: 'success', result, message: 'User updated.' });
  }
  catch (e)
  {
    next(e);
  }
};

export const deleteOne = async (req, res, next) =>
{
  try
  {
    const { id } = req.params;

    const manager = new UserManager();
    await manager.deleteOne(id);
    logger?.info(`User deleted with ID ${id}`);
    res.send({ status: 'success', message: 'User deleted.' });
  }
  catch (e)
  {
    next(e);
  }
};

export const getLastConnections = async (req, res, next) => {
  try {
    const userManager = new UserManager();
    const users = await userManager.getAllUsers(); // Suponiendo que tienes un método para obtener todos los usuarios

    
    const lastConnections = users.map(user => new Date(user.lastConnection.getTime() - (2880 * 60 * 1000)));
    //const lastConnections = users.map(user => user.lastConnection);
    const currentDate = new Date();

    const usersInactiveMoreThan48Hours = lastConnections
  .filter(connection => currentDate - connection > (48 * 60 * 60 * 1000))
  .map((_, index) => users[index].email);
    
    res.status(200).json({ lastConnections,usersInactiveMoreThan48Hours });
  } catch (e) {
    next(e);
  }
};


// export const deleteInactiveUsers = async () => {
//   try {
//     const manager = new UserManager();
//     const inactiveUsers = await manager.findInactiveUsers(2); // Obtén los usuarios inactivos de los últimos 2 días
    
//     for (const user of inactiveUsers) {
//       await manager.deleteLogic(user._id); // Aplica tu lógica de eliminación lógica
//       console.log(`User ${user.email} has been logically deleted.`);
//     }
//   } catch (error) {
//     console.error('Error deleting inactive users:', error);
//   }
// };