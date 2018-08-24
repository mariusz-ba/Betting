import Bet from './bets.model';

class BetsService {
  constructor(Bet) {
    this.Bet = Bet;
  }

  async getBets(query = {}, filter = {}) {
    const params = {};
    if(query.events) params['event'] = { $in: query.events };
    if(query.user) params['user'] = query.user;
    if(query.event) params['event'] = query.event;

    return this.Bet.find(params, null, filter);
  }

  async getBetById(betId) {
    return this.Bet.findById(betId);
  }

  async saveBet(bet) {
    await bet.save();
    return bet;
  }
}

export default new BetsService(Bet);