import { Router } from 'express';
import { catchExceptions } from '../../middleware/exceptions';
import { User } from '../users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

export default class AuthController {

  /**
   * Creat new auth controller
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
    // Authenticate user, create new token
    this.router.post(
      '/',
      catchExceptions(async (req, res) => {
        // Validate params
        const identifier = req.body && req.body.identifier && this.validateIdentifier(req.body.identifier) ? req.body.identifier : undefined;
        const password = req.body && req.body.password && this.validatePassword(req.body.password) ? req.body.password : undefined;
        if(!identifier || !password) {
          res.status(400).json({
            error: 'Bad request',
            error_type: 'bad_request',
            fields: {
              identifier: !username ? 'Identifier must be specified' : null,
              password: !password ? 'Password must be specified' : null
            }
          })
          return;
        }

        // Create error that will be sent to user in case
        // of invalid credentials
        const error = {
          error: 'Invalid credentials',
          error_type: 'invalid_credentials',
          fields: {
            identifier: null,
            password: null
          }
        }

        const user = await User.findOne({
          $or: [
            { 'username': identifier },
            { 'email': identifier }
          ]
        })

        if(user) {
          const match = await bcrypt.compare(password, user.password);
          if(match) {
            const token = jwt.sign({
              data: {
                _id: user._id
              },
            }, jwtSecret, { expiresIn: 2592000 }); // Expires in 30 days
            res.status(200).json({ token });
          } else {
            error.fields.password = 'Invalid password'
            res.status(401).json(error);
          }
        } else {
          error.fields.identifier = 'Invalid identifier'
          res.status(401).json(error);
        }

      })
    )
  }

  validateIdentifier(identifier) {
    return typeof identifier === 'string';
  }

  validatePassword(password) {
    return typeof password === 'string';
  }

}