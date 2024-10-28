import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { app } from "../src/server.js"; 

chai.use(chaiHttp);

describe("User Routes Functional Tests", () => {
  let userId = null;

  after(async () => {
    
    if (userId) {
      await chai.request(app).delete(`/api/users/${userId}`);
    }
  });

  it("Debería crear un nuevo usuario y retornar el usuario creado", async () => {
    const newUser = {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      age: 28,
      password: "securePassword123",
      role: "user",
    };

    const res = await chai.request(app).post("/api/users").send(newUser);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body.email).to.equal(newUser.email);
    userId = res.body._id;
  });

  it("Debería obtener un usuario por ID", async () => {
    const res = await chai.request(app).get(`/api/users/${userId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.email).to.equal("janedoe@example.com");
  });
});
