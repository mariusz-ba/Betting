import Bet from './bets.model';

class BetsService {
  constructor(Bet) {
    this.Bet = Bet;
  }

  async getBets(query = {}, filter = {}) {
    return this.Bet.find(query, null, filter);
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