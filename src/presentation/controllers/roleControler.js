import RoleManager from "../../domain/managers/roleManager.js";

import { developmentLogger } from "../../shared/logger.js"

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger


export const list = async  (req, res) =>
{
    const { limit, page } = req.query;
    const manager = new RoleManager();

    const roles = await manager.paginate({ limit, page });

    res.send({ status: 'success', roles: roles.docs, ...roles, docs: undefined });
};

export const getOne = async (req, res,next ) =>
{
  try{


    const { id } = req.params;

    const manager = new RoleManager();
    const role = await manager.getOne(id);
    logger?.info(`Role created with ID ${role.id}`);
    res.send({ status: 'success', role });
  }
  catch (e)
  {
    next (e)
  }
};

export const save = async (req, res,next) =>
{
  try {
  const manager = new RoleManager();
  
  const role = await manager.create(req.body);

  res.send({ status: 'success', role, message: 'Role created.' })
  }

  catch (e)

  {
    next(e)
  }
};

export const update = async (req, res,next) =>
{
  try{


    const { id } = req.params;

    const manager = new RoleManager();
    const result = await manager.updateOne(id, req.body);
    logger?.info(`Role updated with ID ${id}`);
    res.send({ status: 'success', result, message: 'Role updated.' })
  }
  catch(e)
  {
    next (e)
  }

};

export const deleteOne = async (req, res,next) =>
{
    try{

    
  const { id } = req.params;

  const manager = new RoleManager();
  await manager.deleteOne(id);
  logger?.info(`Role deleted with ID ${id}`);
  res.send({ status: 'success', message: 'Role deleted.' });
  }
  catch(e)
  {
    next(e)
  }
};