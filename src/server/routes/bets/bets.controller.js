import { Router } from 'express';
import { catchExceptions } from '../../middleware/exceptions';
import Bet from './bets.model';
import BetsService from './bets.service';
import UsersService from '../users/users.service';
import EventsService from '../events/events.service';

import authenticate from '../../middleware/authenticate';
import get from 'lodash/get';

export default class UsersController {

  /**
   * Create new bets controller
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
        const bets = await BetsService.getBets();
        res.status(200).json(bets);
      })
    )

    this.router.get(
      '/:id',
      catchExceptions(async (req, res) => {
        const bets = await BetsService.getBetById(req.params.id);
        res.status(200).json(bet);
      })
    )

    this.router.post(
      '/',
      authenticate,
      catchExceptions(async (req, res) => {
        // Check incomming data
        const user = get(req, 'user._id', undefined);
        const event = get(req, 'body.event', undefined);
        const option = get(req, 'body.option', undefined);
        const amount = get(req, 'body.amount', undefined);

        if(!user || !event || !option || !amount) {
          res.status(400).json({
            error: 'Bad request',
            error_type: 'bad_request',
            fields: {
              user: !user ? 'User must be specified' : null,
              event: !event ? 'Event must be specified' : null,
              option: !option ? 'Option must be specified' : null,
              amount: !amount ? 'Amount must be specified' : null
            }
          })
          return;
        }

        // Validate incomming data
        const getEvent = await EventsService.getEventById(event);
        const getOptions = await EventsService.getOptions(event);
        const includes = getOptions.map(option => option._id).includes(event);

        if(!getEvent || !includes) {
          res.status(400).json({
            error: 'Bad request',
            error_type: 'bad_request',
            fields: {
              event: !getEvent ? 'No such event' : null,
              options: !includes ? 'No such option' : null
            }
          })
          return;
        }

        // Check if user can afford this bet
        const wallet = await UsersService.getWallet(user);
        if(amount > wallet) {
          res.status(405).json({
            error: 'Insufficient funds',
            error_type: 'insufficient_funds',
            fields: {
              amount: 'You do not have enough money'
            }
          })
          return;
        }

        // Reduce users wallet
        await UsersService.reduceWallet(user, amount);

        const bet = new Bet({ user, event, option, amount });
        const savedBet = await BetsService.saveBet(bet);
        res.status(200).json(savedBet);
      })
    )
  }
}