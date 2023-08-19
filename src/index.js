import AppFactory from './presentation/factories/appFactories.js';
import DbFactory from './data/factories/dbFactory.js'
import dotenv from 'dotenv';
import cron from 'node-cron';
import { deleteInactiveUsers } from './presentation/controllers/userControllers.js';

dotenv.config();



void (async() =>
{

  const db = DbFactory.create(process.env.DB);
  db.init(process.env.MONGO_DB_URI);


  cron.schedule('* */48  * * *', ()  => {
    deleteInactiveUsers()
  });

  const app = AppFactory.create();

  app.init();
  app.build();
  app.listen();
})();


