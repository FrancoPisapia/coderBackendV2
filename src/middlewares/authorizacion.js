const authorization = (permission) =>
{
    return async(req, res, next) =>
    {
        const user = req.user;
        console.log(user)

        if(!user.isAdmin)
        {
            return res.status(401).send({ message: 'Not authorization!'});
        }

        // if(!user.isAdmin && !user.role.permissions.includes(permission))
        // {
        //     return res.status(401).send({ message: 'Not authorization!'});
        // }

        next();
    }
}

export default authorization;