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

  it("Accept booking", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{
        creator_id_booker: 16,
        initial_day: 4,
        initial_month: 11,
        initial_year: 2022,
        last_day: 8,
        last_month: 11,
        last_year: 2022,
        transaction_room: "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
      }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "acceptBooking");
      apiClientMock.mockReturnValue({
        status: 200,
        message: {
          bookingTransactionHash: "0x15fb9cdfbfb17426de4f906bf75c7e8cf6b7185635ce488dccd9de02b8d01cb5",
        },
        error: false,
      });

      daoMock.mockResolvedValueOnce([{}]);
      const res = await request.post("/acceptBooking").send({
        "transactionHash": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Accept booking fail smart contract", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{
        creator_id_booker: 16,
        initial_day: 4,
        initial_month: 11,
        initial_year: 2022,
        last_day: 8,
        last_month: 11,
        last_year: 2022,
        transaction_room: "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
      }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "acceptBooking");
      apiClientMock.mockReturnValue({
        status: 401,
        message: "Insuficient money for transaction",
        error: true
      });

      const res = await request.post("/acceptBooking").send({
        "transactionHash": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
      });
      expect(res.body.status).toBe(401);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Accept booking fail ", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.post("/acceptBooking").send({
        "transactionHash": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Reject booking", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{
        creator_id_booker: 16,
        initial_day: 4,
        initial_month: 11,
        initial_year: 2022,
        last_day: 8,
        last_month: 11,
        last_year: 2022,
        transaction_room: "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
      }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "rejectBooking");
      apiClientMock.mockReturnValue({
        status: 200,
        message: {
          bookingTransactionHash: "0x15fb9cdfbfb17426de4f906bf75c7e8cf6b7185635ce488dccd9de02b8d01cb5",
        },
        error: false,
      });

      daoMock.mockResolvedValueOnce([{}]);
      const res = await request.post("/rejectBooking").send({
        "transactionHash": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
      });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Reject booking fail smart contract", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{
        creator_id_booker: 16,
        initial_day: 4,
        initial_month: 11,
        initial_year: 2022,
        last_day: 8,
        last_month: 11,
        last_year: 2022,
        transaction_room: "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
      }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "rejectBooking");
      apiClientMock.mockReturnValue({
        status: 401,
        message: "Insuficient money for transaction",
        error: true
      });

      const res = await request.post("/rejectBooking").send({
        "transactionHash": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
      });
      expect(res.body.status).toBe(401);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Reject booking fail ", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.post("/rejectBooking").send({
        "transactionHash": "0xc41adbc118cb0cdf7f086a9f7baacd84442455e00e215d98140a2c92e87b344f"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("My intent bookings", async () => {
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

      const res = await request.get("/myBookingIntents").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);

    } catch (error) {
      console.log(error.message);
    }
  });

  it("My intent bookings fails", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.get("/myBookingIntents").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);

    } catch (error) {
      console.log(error.message);
    }
  });


  it("My bookings", async () => {
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

      const res = await request.get("/myBookings").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);

    } catch (error) {
      console.log(error.message);
    }
  });

  it("My bookings fails", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request.get("/myBookings").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);

    } catch (error) {
      console.log(error.message);
    }
  });


  it("All transactions", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const apiClientMockTransactons = jest.spyOn(apiClient.prototype, "transactions");
      apiClientMockTransactons.mockReturnValue({
        "status":200,
        "message":{
           "transactions":[
              {
                 "transaction_hash_room":"0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
                 "transaction_hash":"0x8422434e062a36d4df5f84d6427b134ae8ea881b8aee3191d114aa94b253ab70",
                 "wallet_owner":"0x8ea99D0dAc6015289AaA485a12A75B81062D6912",
                 "creator_id_owner":20,
                 "wallet_booker":"0x5d527ee765d4806FF2af49bd783B8c11bD5B1841",
                 "creator_id_booker":16,
                 "operation":"ACCEPTED_BOOKING",
                 "payment":"50000000000000",
                 "creation_date":"2021-01-30T22:14:53.021Z"
              }
           ]
        },
        "error":false
      });

      const daoMock = jest.spyOn(dao, "execSql");
      //owner id
      daoMock.mockResolvedValueOnce([8]);
      //booker_id
      daoMock.mockResolvedValueOnce([2]);
      //name posting
      daoMock.mockResolvedValueOnce([{ get_name_posting: "un re hotel hermano" }]);



      const apiClientUsers = jest.spyOn(apiClient.prototype, "getUser");
      apiClientUsers.mockResolvedValueOnce({
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
        },
        error: false
      });

      apiClientUsers.mockResolvedValueOnce({
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


      const res = await request.get("/transactions").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);

    } catch (error) {
      console.log(error.message);
    }
  });

  it("All transactions fail smartcontract", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const apiClientMockTransactons = jest.spyOn(apiClient.prototype, "transactions");
      apiClientMockTransactons.mockReturnValue({
        status: 401,
        message: "Algun error en el smart contract",
        error: true
      });
      const res = await request.get("/transactions").send();
      expect(res.body.status).toBe(401);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("Algun error en el smart contract");

    } catch (error) {
      console.log(error.message);
    }
  });


  it("All transactions fail", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const apiClientMockTransactons = jest.spyOn(apiClient.prototype, "transactions");
      apiClientMockTransactons.mockReturnValue({
        "status":200,
        "message":{
           "transactions":[
              {
                 "transaction_hash_room":"0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
                 "transaction_hash":"0x8422434e062a36d4df5f84d6427b134ae8ea881b8aee3191d114aa94b253ab70",
                 "wallet_owner":"0x8ea99D0dAc6015289AaA485a12A75B81062D6912",
                 "creator_id_owner":20,
                 "wallet_booker":"0x5d527ee765d4806FF2af49bd783B8c11bD5B1841",
                 "creator_id_booker":16,
                 "operation":"ACCEPTED_BOOKING",
                 "payment":"50000000000000",
                 "creation_date":"2021-01-30T22:14:53.021Z"
              }
           ]
        },
        "error":false
      });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.get("/transactions").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);

    } catch (error) {
      console.log(error.message);
    }
  });
});
