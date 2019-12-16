const faker = require("faker");

const { users: Users } = require("../src/models");

module.exports = {
  findOrCreateUser: async (attrs = {}) => {
    const [user, created] = await Users.findOrCreate({
      where: {
        email: attrs.email || faker.internet.email()
      },
      defaults: {
        name: attrs.name || faker.name.findName(),
        password_hash: attrs.password_hash || "12345678"
      }
    });

    return user;
  }
};
