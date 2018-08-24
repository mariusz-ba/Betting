import Bet from './bets.model';
import asyncForEach from '../../utils/asyncForEach';

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

  async resolveBets(event, option, multipliers) {
    const bets = await this.Bet.find({ event, resolved: false });
    await asyncForEach(bets, async bet => {
      const correct = bet.option.equals(option) ? true : false;
      const won = correct ? Math.floor(multipliers[option] * bet.amount) : 0;

      await this.Bet.findOneAndUpdate({ _id: bet._id }, { $set: { resolved: true, won: won }});
    })
    return this.Bet.find({ event, resolved: true });
  }
}

export default new BetsService(Bet);