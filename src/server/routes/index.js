// Controllers
import { UsersController } from './users';

export default class Router {

  constructor() {
    this.controllers = [
      new UsersController('/api/users')
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