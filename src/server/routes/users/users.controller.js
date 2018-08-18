import { Router } from 'express';
import { catchExceptions } from '../../middleware/exceptions';
import UsersService from './users.service';
import User from './users.model';

export default class UsersController {

  /**
   * Creat new users controller
   * @param {string} route path that controller will be mounted to
   */
  constructor(route) {
    this.route = route;
    this.router = new Router();
    this.configure();
  }

  /**
   * Configure router routes
   */
  configure() {
    this.router.get(
      '/',
      catchExceptions(async (req, res) => {
        const users = await UsersService.getUsers();
        res.status(200).json(users);
      })
    );

    this.router.get(
      '/:id',
      catchExceptions(async (req, res) => {
        const user = await UsersService.getUserById(req.params.id);
        res.status(200).json(user);
      })
    )

    // Creating new user
    this.router.post(
      '/',
      catchExceptions(async (req, res) => {
        // Validate params
        const username = req.body && req.body.username && this.validateUsername(req.body.username) ? req.body.username : undefined;
        const password = req.body && req.body.password && this.validatePassword(req.body.password) ? req.body.password : undefined;
        const email = req.body && req.body.email && this.validateEmail(req.body.email) ? req.body.email : undefined;
        if(!username || !password || !email) {
          res.status(400).json({
            error: 'Bad request',
            error_type: 'bad_request',
            fields: {
              username: !username ? 'Username must contain at least 4 characters' : null,
              password: !password ? 'Password must contain at least 8 characters' : null,
              email: !email ? 'Wrong email' : null
            }
          })
          return;
        }
        
        // Check if user with given username or email already exists
        const isEmailAvailable = await UsersService.isEmailAvailable(req.body.email);
        const isUsernameAvailable = await UsersService.isUsernameAvailable(req.body.username);

        if(!isEmailAvailable || !isUsernameAvailable) {
          res.status(400).json({
            error: 'User with given username or email already exists',
            error_type: 'user_already_exists',
            fields: {
              username: !isUsernameAvailable ? 'This username is already taken' : null,
              email: !isEmailAvailable ? 'This email is already taken' : null
            }
          })
          return;
        }

        const user = new User(req.body);
        const savedUser = await UsersService.saveUser(user);
        res.status(200).json(savedUser);
      })
    )
  }

  validateUsername(username) {
    return typeof username === 'string' && username.length >= 4;
  }

  validateEmail(email) {
    if(typeof email === 'string' && email.length > 0) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email.toLowerCase());
    }
    return false;
  }

  validatePassword(password) {
    return typeof password === 'string' && password.length >= 8;
  }

}