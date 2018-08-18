import User from './users.model';

class UsersService {
  constructor(User) {
    this.User = User;
  }

  async getUsers() {
    return this.User.find({}, { password: 0 });
  }

  async getUserById(userId) {
    return this.User.findOne({ _id: userId }, { password: 0 });
  }

  async saveUser(user) {
    await user.save();
    return user;
  }

  // Returns true if username is available
  async isUsernameAvailable(username) {
    const users = await this.User.find({ username });
    return users.length === 0;
  }

  // Returns true if email is available
  async isEmailAvailable(email) {
    const users = await this.User.find({ email });
    return users.length === 0;
  }
}

export default new UsersService(User);