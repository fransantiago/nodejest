const { users: Users } = require("../models");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) return res.staus(403).json({ error: "User not found." });

    if (!(await user.checkPassword(password))) return res.status(403).json({ error: "Incorrect password." });

    return res.status(200).json({
      user,
      token: user.generateToken()
    });
  }
};
