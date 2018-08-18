import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import mongoose from 'mongoose';
import Router from './routes';

class App {

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.handleErrors();  
  }

  config() {
    // Configure some security options
    this.app.disable('x-powered-by');
    this.app.use(helmet());

    // Configure middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, '../../dist')));

    // Configure database connection
    mongoose.connect('mongodb://127.0.0.1:27017/betting', { useNewUrlParser: true });
  }

  routes() {
    this.router = new Router();
    this.router.routes(this.app);
  }

  handleErrors() {
    this.app.use((err, req, res, next) => {
      const result = { error: err.message };

      if(this.app.get('env') === 'production')
        result.error = 'Unable to handle the request';

      res.status(500).json(result);
    })
  }

}

export default new App().app;