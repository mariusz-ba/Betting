import { Router } from 'express';
import { catchExceptions } from '../../middleware/exceptions';
import EventsService from './events.service';
import Event from './events.model';

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
        const events = await EventsService.getEvents();
        res.status(200).json(events);
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
      catchExceptions(async (req, res) => {
        // Validate users input
        const event = new Event(req.body);
        const savedEvent = await EventsService.saveEvent(event);
        res.status(200).json(savedEvent);
      })
    )
  }

}