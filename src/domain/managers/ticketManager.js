import idValidation from "../validations/share/idValidation.js";
import { generateTicketCode } from "../../shared/codeGenerator.js";

import nodemailer from 'nodemailer'

import container from "../../container.js";

class TicketManager 
{
    constructor()
    {
        {
            this.ticketRepository = container.resolve('TicketRepository');
            this.cartRepository = container.resolve('CartRepository');
            this.productRepository = container.resolve('ProductRepository');
        }
    }

    async getOne (id)
    {
        await idValidation.parseAsync({id})
        return this.ticketRepository.getOne(id)
    }

    async purchaseCart(cid, purchaser)
    {
        const cart = await this.cartRepository.getOne(cid);
        const products = cart.products;

        const totalAmount = products.reduce((total, item) => total + (item._id.price * item.quantity), 0);

        //const code = generateTicketCode();
        const amount =  totalAmount



         // Verificar el stock y restar la cantidad correspondiente de cada producto
         for (const product of products) 
         {
            const existingProduct = await this.productRepository.getOne(product._id);
            
           
            if (product.quantity > existingProduct.stock) {
              throw new Error(`Insufficient stock for product ${existingProduct._id}`);
            }

            existingProduct.stock -= product.quantity;

            await this.productRepository.updateOne(existingProduct.id, existingProduct);
          }

          const code = generateTicketCode()

        const ticket = await this.ticketRepository.create({
            code,
            purchase_datetime: new Date(),
            amount,
            purchaser,
          });





          const transporter = nodemailer.createTransport({
            service: 'gmail',
            port:587,
            secure:false,
            auth:
            {
                user:process.env.SMTP_MAIL,
                pass:process.env.SMTP_KEY
            },
            tls: {
                rejectUnauthorized: false
              }
        })

        const mail = {
            from: 'franco.pisapia405@gmail.com',
            to: purchaser,
            subjetc: 'Compra realizada con exito',
            html:`
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1>Ticket de compra</h1>
            </div>
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;">
              <h2 style="margin-top: 0;">Código de ticket: ${ticket.code}</h2>
              <p style="margin-bottom: 5px;">Fecha y hora de compra: ${ticket.purchase_datetime}</p>
              <p style="margin-bottom: 5px;">Total de la compra: $${ticket.amount}</p>
              <p style="margin-bottom: 5px;">Comprador: ${ticket.purchaser}</p>
            </div>
            <p>Gracias por tu compra. Esperamos que disfrutes de tus productos.</p>
            <p>¡Vuelve pronto!</p>
          </div>
            `
        }

        await transporter.sendMail(mail)
            
        //return ticket;
    }

    async updateOne (id,data)
    {
        return this.ticketRepository.updateOne(id,data)
    }

    async deleteOne(id)
    {
        await idValidation.parseAsync({id})
        return this.ticketRepository.deleteOne(id)
    }

}

export default TicketManager