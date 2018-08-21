import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

import UsersService from '../routes/users/users.service';

export default async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if(authorizationHeader)
    token = authorizationHeader.split(' ')[1];

  if(token) {
    try {
      const decoded = await jwt.verify(token, jwtSecret);
      const user = await UsersService.getUserById(decoded.data._id);
      if(user) {
        req.user = user;
        next();
      } else {
        throw 'No such user';
      }
    } catch (error) {
      res.status(401).json({
        error: 'Failed to authenticate',
        error_type: 'not_authenticated'
      })
    }
  } else {
    res.status(403).json({
      error: 'No token provided',
      error_type: 'no_token'
    })
  }
}