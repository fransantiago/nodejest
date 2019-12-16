const routes = require("express").Router();

const SessionsController = require("./controllers/sessions");

const AuthMiddleware = require("../src/middlewares/auth");

routes.post("/sessions", SessionsController.store);

routes.use(AuthMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.status(200).json({ ok: true });
});

module.exports = routes;
