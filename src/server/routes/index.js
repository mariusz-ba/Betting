// Controllers
import { AuthController } from './auth';
import { BetsController } from './bets';
import { UsersController } from './users';
import { EventsController } from './events';

export default class Router {

  constructor() {
    this.controllers = [
      new AuthController('/api/auth'),
      new BetsController('/api/bets'),
      new UsersController('/api/users'),
      new EventsController('/api/events')
      // ... other controllers
    ]
  }
  
  /**
   * Apply controllers to express app
   * @param {Application} app Application that controllers will be applied to
   */
  routes(app) {
    // Configure controllers
    this.controllers.forEach(controller => {
      app.use(controller.route, controller.router);
    })
  }

}