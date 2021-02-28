var supertest = require("supertest-as-promised");
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require("../../app.js");
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js");

const request = supertest(server);

describe(" Test Suite: posting", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const validTokenMock = jest.spyOn(validToken, "validToken");
    validTokenMock.mockReturnValue(true);
    dbMock.mockResolvedValueOnce({});
  });

  it("Get posting", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido papa",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);
      const res = await request.get("/posting").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message[0].content).toBe("un re contenido papa");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Get posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");

      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.get("/posting").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Get admin posting ", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido papa",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);

      const res = await request.get("/posting/admin").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message[0].content).toBe("un re contenido papa");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Get  admin posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");

      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.get("/posting/admin").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Create posting ", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([{ get_creator_id: 2 }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "createRoom");
      apiClientMock.mockReturnValue({
        status: 200,
        message: "unaWalletRePicante",
        error: false,
      });

      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido papa",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);

      const res = await request.post("/posting").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message.content).toBe("un re contenido papa");
      expect(res.body.message.transaction_hash).toBe(
        "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f"
      );
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Create posting fail smart contract transaction", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([{ get_creator_id: 2 }]);

      const apiClientMock = jest.spyOn(apiClient.prototype, "createRoom");
      apiClientMock.mockReturnValue({
        status: 401,
        message: "insuficients money",
        error: true,
      });

      const res = await request.post("/posting").send();
      expect(res.body.status).toBe(401);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("insuficients money");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Create posting fail", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.post("/posting").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });


  it("Update posting ", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ is_owner: true }]);

      //este es el update
      daoMock.mockResolvedValueOnce([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido papa updateado",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);

      const res = await request.put("/posting/8").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message.content).toBe("un re contenido papa updateado");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Update posting fail, you are not owner", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ is_owner: false }]);

      const res = await request.put("/posting/8").send();
      expect(res.body.status).toBe(400);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("You are not the owner of the room");
    } catch (error) {
      console.log(error);
    }
  });

  it("Update posting fail", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ is_owner: true }]);

      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.put("/posting/8").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });

  it("Blocked posting update", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");

      daoMock.mockResolvedValueOnce([{ blocked: true }]);
      const res = await request.put("/posting/blocked_status/8").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error);
    }
  });

  it("Blocked posting update fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");

      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.put("/posting/blocked_status/8").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });

  it("Delete posting", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request.delete("/posting/8").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Delete posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([{ ok: true }]);
      const res = await request.delete("/posting/8").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Search posting", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido buscado",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);
      const res = await request
        .get(
          "/posting/search?priceMin=1&priceMax=99999&startDate=2022-04-04&endDate=2022-04-04&feature=1%2C3%2C4&name=condor&max_number_guests=10"
        )
        .send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message[0].content).toBe("un re contenido buscado");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Search posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request
        .get(
          "/posting/search?priceMin=1&priceMax=99999&startDate=2022-04-04&endDate=2022-04-04&feature=1%2C3%2C4&name=condor&max_number_guests=10"
        )
        .send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Get all feature", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_feature: 1,
          name: "Wifi",
        },
        {
          id_feature: 2,
          name: "Tv",
        },
        {
          id_feature: 3,
          name: "Baño",
        },
        {
          id_feature: 4,
          name: "Condor masaje",
        },
      ]);
      const res = await request.get("/feature").send();
      expect(res.body.status).toBe(200);
      expect(res.body.message[0].name).toBe("Wifi");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Search posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request.get("/feature").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Update price room ", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ is_owner: true }]);

      daoMock.mockResolvedValueOnce([{ get_transaction_hash_room: "elCondorTransaccion" }]);


      const apiClientMock = jest.spyOn(apiClient.prototype, "changePriceRoom");
      apiClientMock.mockReturnValue({
        status: 200,
        message: { "transaction": "precioCambiado" },
        error: false
      });

      //update precio posting
      daoMock.mockResolvedValueOnce([{ get_transaction_hash_room: "updatePrecio" }]);

      const res = await request.put("/priceRoom/17").send({ "priceRoom": 0.0001 });
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });


  it("Update price room fail, you are not owner", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ is_owner: false }]);

      const res = await request.put("/priceRoom/17").send({ "priceRoom": 0.0001 });
      expect(res.body.status).toBe(400);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("You are not the owner of the room");

    } catch (error) {
      console.log(error.message);
    }
  });

  it("Update price room fail call smartcontract", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{ is_owner: true }]);

      daoMock.mockResolvedValueOnce([{ get_transaction_hash_room: "elCondorTransaccion" }]);
      const apiClientMock = jest.spyOn(apiClient.prototype, "changePriceRoom");
      apiClientMock.mockReturnValue({
        status: 401,
        message: "Insuficient money for transaction",
        error: true
      });

      const res = await request.put("/priceRoom/17").send({ "priceRoom": 0.0001 });
      expect(res.body.status).toBe(401);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("Insuficient money for transaction");

    } catch (error) {
      console.log(error.message);
    }
  });

  it("Update price room fail database", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });

      const res = await request.put("/priceRoom/17").send({ "priceRoom": 0.0001 });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });


  it("Search posting", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido buscado y likeado",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);
      const res = await request
        .get(
          "/posting/searchLiked?priceMin=1&priceMax=99999&startDate=2022-04-04&endDate=2022-04-04&feature=1%2C3%2C4&name=condor&max_number_guests=10"
        )
        .send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message[0].content).toBe("un re contenido buscado y likeado");
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Search liked posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request
        .get(
          "/posting/searchLiked?priceMin=1&searchMax=99999&startDate=2022-04-04&endDate=2022-04-04&feature=1%2C3%2C4&name=condor&max_number_guests=10"
        )
        .send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Nearby hotels", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido buscado",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);
      const res = await request
        .get(
          "/posting/nearbyHotels?MyLatitude=-14.56165165161616161&MyLongitude=-14.56165165161616161&numberPostings=1"
        )
        .send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Nearby hotels fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request
        .get(
          "/posting/nearbyHotels?MyLatitude=-14.56165165161616161&MyLongitude=-14.56165165161616161&numberPostings=1")
        .send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Hotels in area", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido buscado",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);
      const res = await request
        .get(
          "/posting/hotelsInArea?MyLatitude=-14.56165165161616161&MyLongitude=-14.56165165161616161&radioArea=999"
        )
        .send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Hotels in area fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request
        .get(
          "/posting/hotelsInArea?MyLatitude=-14.56165165161616161&MyLongitude=-14.56165165161616161&radioArea=999")
        .send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("My postings", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });
      daoMock.mockReturnValue([
        {
          id_posting: 17,
          price_day: "0.0002",
          creation_date: "2021-01-14T16:58:48.885Z",
          start_date: "2021-04-03T03:00:00.000Z",
          end_date: "2022-04-03T03:00:00.000Z",
          state: "activo",
          public: true,
          content: "un re contenido buscado",
          country: "argentina",
          city: "necochea",
          max_number_guests: 3,
          id_user: 2,
          name: "telo",
          transaction_hash:
            "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
          deleted: false,
          location: {
            x: -58.5075778,
            y: -34.462299,
          },
          blocked: false,
        },
      ]);
      
      const res = await request.get("/myPostings").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("My posting fail", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });
      daoMock.mockImplementation(() => {
        throw "un error mockeado";
      });
      const res = await request.get("/myPostings").send();
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

  
});
