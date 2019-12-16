const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const DefaultQueries = require("../DefaultQueries");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await DefaultQueries.findOrCreateUser();

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "12345678"
      });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await DefaultQueries.findOrCreateUser();

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "87654321"
      });

    expect(response.status).toBe(403);
  });

  it("should get jwt token as successfully authentication response", async () => {
    const user = await DefaultQueries.findOrCreateUser();

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "12345678"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await DefaultQueries.findOrCreateUser();

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without provide jwt token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(403);
  });

  it("should not be able to access private routes with invalid provide jwt token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer 123123");

    expect(response.status).toBe(403);
  });
});
