var supertest = require("supertest-as-promised");
const server = require("../../app.js");
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js");
const { Expo } = require("expo-server-sdk");


const request = supertest(server);

describe(" Test Suite: Notifications", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const validTokenMock = jest.spyOn(validToken, "validToken");
    validTokenMock.mockReturnValue(true);
  });

  it("Send Notification", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const apiClientMock = jest.spyOn(apiClient.prototype, "getUser");
      apiClientMock.mockReturnValue({
        status: 200,
        message: {
          "message": {
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
          }
        },
        error: false
      });

      const expoToken = jest.spyOn(Expo.prototype, "isExpoPushToken");
      expoToken.mockReturnValue(true);

      const apiClientMock = jest.spyOn(apiClient.prototype, "sendNotification");
      apiClientMock.mockReturnValue({
        status: 200,
        message: {
            algo: "algo",
        },
        error: false
      });

      const res = await request.post("/ratingPosting/17").send({
        score: 9,
        content: "re pistero",
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Add rating to posting fail", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.post("/ratingPosting/17").send({
        score: 9,
        content: "re pistero",
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Add rating to user", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([
        [
          [
            {
              "id_rating": 2,
              "content": "re buen tipo este",
              "score": 8,
              "id_user_owner": 2,
              "id_user_booker": 7
            }
          ]
        ],
      ]);

      const res = await request.post("/ratingBooker/4").send({
        "score": 8,
        "content": "re buen tipo este"
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Add rating to user fail", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.post("/ratingBooker/4").send({
        "score": 8,
        "content": "re buen tipo este"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

});
