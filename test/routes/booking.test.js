var supertest = require("supertest-as-promised");
const server = require("../../app.js");
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js");

const request = supertest(server);

describe(" Test Suite: Bookings", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const validTokenMock = jest.spyOn(validToken, "validToken");
    validTokenMock.mockReturnValue(true);
  });

  it("Intent booking", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ booking_date_range_available: true }]);
      daoMock.mockResolvedValueOnce([{ get_creator_id: 8 }]);
      daoMock.mockResolvedValueOnce([{ get_transaction_hash_room: "unaTransactionRoom" }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "intentBooking");
      apiClientMock.mockReturnValue({
        status: 200,
        message: { "bookingTransactionHash": "transactionIntent" },
        error: false
      });

      daoMock.mockResolvedValueOnce([{
        "id_booking": 40,
        "state_operation": "INTENT_BOOKING",
        "check_in": "2028-08-08T00:00:00.000Z",
        "check_out": "2028-08-09T00:00:00.000Z",
        "transaction_hash_intent": "0x9e542505b6fe93777e427b8f39ce298419f50df4417b9319d66ef5228a8feed9",
        "id_user": 3,
        "id_posting": 17
      }]);

      const res = await request.post("/intentBooking").send({
        "idPosting": 17,
        "initialDate": "2028-08-08",
        "lastDate": "2028-08-09"
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Intent booking fail ", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });


      const res = await request.post("/intentBooking").send({
        "idPosting": 17,
        "initialDate": "2028-08-08",
        "lastDate": "2028-08-09"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });


  it("Intent booking fail smart contract", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ booking_date_range_available: true }]);
      daoMock.mockResolvedValueOnce([{ get_creator_id: 8 }]);
      daoMock.mockResolvedValueOnce([{ get_transaction_hash_room: "unaTransactionRoom" }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "intentBooking");
      apiClientMock.mockReturnValue({
        status: 401,
        message: "Insuficient money for transaction",
        error: true
      });

      daoMock.mockResolvedValueOnce([{
        "id_booking": 40,
        "state_operation": "INTENT_BOOKING",
        "check_in": "2028-08-08T00:00:00.000Z",
        "check_out": "2028-08-09T00:00:00.000Z",
        "transaction_hash_intent": "0x9e542505b6fe93777e427b8f39ce298419f50df4417b9319d66ef5228a8feed9",
        "id_user": 3,
        "id_posting": 17
      }]);

      const res = await request.post("/intentBooking").send({
        "idPosting": 17,
        "initialDate": "2028-08-08",
        "lastDate": "2028-08-09"
      });
      expect(res.body.status).toBe(401);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("Insuficient money for transaction");

    } catch (error) {
      console.log(error.message);
    }
  });

  it("My offers", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([
        {
          "id_posting": 17,
          "name": "telo",
          "start_date": {

          },
          "end_date": {

          },
          "booker": 3,
          "transaction_booking": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
        }
      ]);

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

      const res = await request.get("/myOffers").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);

    } catch (error) {
      console.log(error.message);
    }
  });

  it("My offers fails", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });


      const res = await request.get("/myOffers").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);

    } catch (error) {
      console.log(error.message);
    }
  });

});
