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

