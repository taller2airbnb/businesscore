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

describe(" Test Suite: Ratings", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const validTokenMock = jest.spyOn(validToken, "validToken");
    validTokenMock.mockReturnValue(true);
    dbMock.mockResolvedValueOnce({});
  });

  it("Add rating to posting", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([{i_book_posting: true}]);
      daoMock.mockResolvedValueOnce([{rate_hotel_only_once: true}]);
      daoMock.mockResolvedValueOnce([
        [
          {
            id_rating: 2,
            content: "re pistero",
            score: 4,
            id_user_booker: 2,
            id_posting: 17,
          },
        ],
      ]);

      const res = await request.post("/ratingPosting/17").send({
        score: 4,
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
        score: 4,
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
      daoMock.mockResolvedValueOnce([{visit_to_me: true}]);
      daoMock.mockResolvedValueOnce([{rate_user_only_once: true}]);
      daoMock.mockResolvedValueOnce([
        [
          [
            {
              "id_rating": 2,
              "content": "re buen tipo este",
              "score": 3,
              "id_user_owner": 2,
              "id_user_booker": 7
            }
          ]
        ],
      ]);

   

      const res = await request.post("/ratingBooker/4").send({
        "score": 3,
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
        "score": 3,
        "content": "re buen tipo este"
      });
      expect(res.body.status).toBe(500);
      expect(res.body.error).toBe(true);
    } catch (error) {
      console.log(error.message);
    }
  });

});
