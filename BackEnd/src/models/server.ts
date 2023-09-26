import express from 'express';
import routesProducts from '../routes/products';
import routesAdministrators from '../routes/administrators';
import routesSales from '../routes/sales';
import routesCustomers from '../routes/customers';
import cors from 'cors';

export class Server {
  private app:express.Application;
  private port: string | undefined;
  constructor(){
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.listen();
    this.middlewares();
    this.routes();
    this. dbConnect();
  }

  listen(){
    this.app.listen(this.port,()=>{
      console.log('aplicacion corriendo en :',this.port);
    })
  }

  routes(){
    this.app.use('/api/Products',routesProducts);
    this.app.use('/api/Administrators',routesAdministrators);
    this.app.use('/api/Sales',routesSales);
    this.app.use('/api/Customers',routesCustomers);
  }

  middlewares(){  //esto es para parsearlo y poder encriptar algunos atributos antes de llevarlo a la BD
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect(){
    try{
      console.log('CONEXIóN ESTABLECIDA!');
      
    }
    catch(error){
      console.log('ERROR EN LA CONEXIÓN',error)
    }
  }
}

export default Server;