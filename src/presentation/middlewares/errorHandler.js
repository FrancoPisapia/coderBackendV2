
const errorHandler = (err, req, res, next) =>
{
  if (err?.message.includes(' Not Found'))
  {
      req.logger.error(err.stack);
      return res.status(404).json({ message: err.message });
  }

  else if (err?.name.includes('ZodError'))
  {
    req.logger.error(err.stack);
    return res.status(400).json({ message: err.issues });
  }

  else if (err?.message.includes('invalid password.'))
  {
      req.logger.error(err.stack);
      return res.status(401).send({ message: 'Login failed, invalid password.'})
  }
  else if (err?.message.includes('Email and Password invalid format.'))
  {
      req.logger.error(err.stack);
      return res.status(401).send({ message: 'Email and Password invalid format.'})
  }
  else if (err?.message.includes('Insufficient stock'))
  {
      req.logger.error(err.stack);
      return res.status(401).send({ message: 'Not enough stock'})
  }

  else if (err?.message.includes('dont exist'))
  {
      req.logger.error(err.stack);
      return res.status(404).send({ message: "User don't exist."});
  }

  else if (err?.message.includes('You cannot repeat password'))
  {
      req.logger.error(err.stack);
      return res.status(404).send({ message: "You cannot repeat password"});
  }

  else if (err?.message.includes('Unauthorized: You do not have permission to delete this product'))
  {
      req.logger.error(err.stack);
      return res.status(404).send({ message: "Unauthorized: You do not have permission to delete this product"});
  }
  else if (err?.message.includes('Premium users cannot add their own products to the cart.'))
  {
      req.logger.error(err.stack);
      return res.status(404).send({ message: "Premium users cannot add their own products to the cart."});
  }

	req.logger.error(err.stack);
	res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;