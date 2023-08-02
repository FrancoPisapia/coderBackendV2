import TicketManager from "../../domain/managers/ticketManager.js";
import { developmentLogger } from "../../shared/logger.js"

const logger = process.env.NODE_ENV === 'production' ? null : developmentLogger
class TicketController
{
    static list = async (req,res)=>{

        const manager = new TicketManager();

        const tickets = await manager.find();

        res.send ({status:'succeed',tickets})
    } 
}

export const getOne= async (req,res,next) =>{

    try
    {
    
    const {id} = req.params;

    const manager = new TicketManager();

    const ticket = await manager.getOne(id);
    logger?.info(`Ticket received with ID ${id}`);
    res.send ({status:'succeed',ticket});
    }
    catch (e)
    {
        next (e)
    }
}

export const purchaseCart = async (req,res,next) =>{

    try{

        const { cid } = req.params;

        const manager = new TicketManager();
    
        const ticket = await manager.purchaseCart(cid, req.user.email);

        logger?.info(`Ticket purchased for cart with ID ${cid}`);
    res.send ({status:'succeed',ticket, message:'Mail Enviado'});
    }

    catch (e)
    {
        next(e)
    }
}

export default TicketController