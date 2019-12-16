const bcrypt = require("bcryptjs");

const { users: Users } = require("../../src/models");

const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await Users.create({
      name: "Sant",
      email: "sant@admin.com",
      password_hash: "12345678"
    });

    const isPasswordCorrect = await bcrypt.compare("12345678", user.password_hash);

    expect(isPasswordCorrect).toBe(true);
  });
});
