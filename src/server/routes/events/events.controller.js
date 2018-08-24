import { Router } from 'express';
import { catchExceptions } from '../../middleware/exceptions';
import EventsService from './events.service';
import Event from './events.model';
import { BetsService } from '../bets';
import authenticate from '../../middleware/authenticate';
import get from 'lodash/get';

export default class UsersController {

  /**
   * Creat new events controller
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
        const events = get(req, 'query.events', undefined);
        const organiser = get(req, 'query.organiser', undefined);
        const query = {};

        if(Array.isArray(events)) query['events'] = events;
        if(typeof organiser === 'string') query['organiser'] = organiser;

        const result = await EventsService.getEvents(query);
        // For each event caluclate pool
        const response = result.map(async event => {
          const bets = await BetsService.getBets({ event: event._id });

          const options = event.options.map(option => {
            const pool = bets
              .filter(bet => option._id.equals(bet.option))
              .reduce((acc, bet) => acc + bet.amount, 0);
            return {
              ...option._doc,
              pool
            }
          })

          return {
            ...event._doc,
            options
          }
        })

        res.status(200).json(await Promise.all(response));
      })
    )

    this.router.get(
      '/:id',
      catchExceptions(async (req, res) => {
        const event = await EventsService.getEventById(req.params.id);
        res.status(200).json(event);
      })
    )

    this.router.post(
      '/',
      authenticate,
      catchExceptions(async (req, res) => {
        // Get required props from request body
        const name = get(req.body, 'name', undefined);
        const options = get(req.body, 'options', undefined);

        // Name and options must be specified
        if(!name || !options) {
          res.status(400).json({
            error: 'Bad request',
            error_type: 'bad_request',
            fields: {
              name: !name ? 'Name must be specified' : null,
              options: !options ? 'Options must be specified' : null
            }
          })
          return;
        }

        // Options must be an array that contains at least
        // 2 elements
        if(!Array.isArray(options) || options.length < 2) {
          res.status(400).json({
            error: 'Bad request',
            error_type: 'bad_request',
            fields: {
              options: 'Options must contain at least 2 entries'
            }
          })
          return;
        }

        const data = {
          name,
          options: options.map(option => ({ name: option })),
          organiser: req.user._id
        }

        const event = new Event(data);
        const savedEvent = await EventsService.saveEvent(event);
        res.status(200).json(savedEvent);
      })
    )
  }

  

}