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

      const expoToken = jest.spyOn(Expo, "isExpoPushToken");
      expoToken.mockReturnValue(true);

      const apiClientMockNotification = jest.spyOn(apiClient.prototype, "sendNotification");
      apiClientMockNotification.mockReturnValue({
        status: 200,
        message: {
            algo: "algo",
        },
        error: false
      });

      const res = await request.post("/notification?idUser=17").send({
        "push_token": "unTOken"
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Send Notification fail  get user", async () => {
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

      const expoToken = jest.spyOn(Expo, "isExpoPushToken");
      expoToken.mockReturnValue(false);

      const res = await request.post("/notification?idUser=17").send({
        "push_token": "unTOken"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });


  it("Change push token", async () => {
    try {
      const apiClientMock = jest.spyOn(apiClient.prototype, "putPushToken");
      apiClientMock.mockReturnValue({
        status: 200,
        message: {
          id: 3,
          modify_user: "OK",
        },
        error: false,
      });

      const res = await request.put("/pushToken?idUser=17").send({
        "push_token": "unTOken"
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Change push token fail", async () => {
    try {
      const apiClientMock = jest.spyOn(apiClient.prototype, "putPushToken");
      apiClientMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.put("/pushToken?idUser=17").send({
        "push_token": "unTOken"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });


});
