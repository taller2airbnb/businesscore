var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js");

const request = supertest(server);

describe(" Test Suite: user", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        const validTokenMock = jest.spyOn(validToken, "validToken");
        validTokenMock.mockReturnValue(true);
    });

    it("Get user by id", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([
        {
            status: 200,
            message: {
                alias: "hardtokill",
                blocked: false,
                email: "hard@to.kill",
                first_name: "John",
                id: 3,
                last_name: "McClane",
                national_id: "77777777",
                national_id_type: "DNI",
                profile: 2,
                push_token: null,
                wallet: "0x5d527ee765d4806FF2af49bd783B8c11bD5B1841"
            },
            error: false
        },
      ]);

      daoMock.mockResolvedValueOnce([{ "get_creator_id": 2 }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "getWallet");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "unaWallet",
          error: false
      });

      const res = await request.get("/user/3").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Get users", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
            status: 200,
            message: {
                alias: "hardtokill",
                blocked: false,
                email: "hard@to.kill",
                first_name: "John",
                id: 3,
                last_name: "McClane",
                national_id: "77777777",
                national_id_type: "DNI",
                profile: 2,
                push_token: null,
                wallet: "0x5d527ee765d4806FF2af49bd783B8c11bD5B1841"
            },
            error: false
        },
      ]);

      const res = await request.get("/user").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Register user", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      const apiClientMock = jest.spyOn(apiClient.prototype, "register");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "unRegistroPAPAAAA",
          error: false
      });

      daoMock.mockResolvedValueOnce([{ "get_creator_id": 2 }]);

      const res = await request.post("/register").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Login user", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      let apiClientMock = jest.spyOn(apiClient.prototype, "login");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "unLogin",
          error: false
      });

      daoMock.mockResolvedValueOnce([{ "get_creator_id": 2 }]);

      apiClientMock = jest.spyOn(apiClient.prototype, "getWallet");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "unaWallet",
          error: false
      });

      const res = await request.post("/login").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Change user pass", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      const apiClientMock = jest.spyOn(apiClient.prototype, "changePassword");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "Cuchu Cambiaso",
          error: false
      });

      const res = await request.put("/user/hard@to.kill/password/").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Recover token", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      const apiClientMock = jest.spyOn(apiClient.prototype, "recoverToken");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "Rescatate un token",
          error: false
      });

      const res = await request.post("/recover_token/hard@to.kill").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Block status", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      const apiClientMock = jest.spyOn(apiClient.prototype, "blockedStatus");
      apiClientMock.mockResolvedValueOnce({
          status: 200,
          message: "Te bloquea con de todo",
          error: false
      });

      const res = await request.put("/user/2/blocked_status/").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });
            
});
