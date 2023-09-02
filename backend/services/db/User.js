import { User } from "../../model/db/User.js";

class UserWithDb {
  async register(id, data) {
    await User.create({
      _id: id,
      ...data,
    });
  }
  async checkWithEmail(email) {
    const user = await User.findOne({ email });
    return user._doc;
  }
}

export const userWithDB = new UserWithDb();
