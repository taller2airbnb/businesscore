var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");

const request = supertest(server);

describe(" Test Suite: comment", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        const validTokenMock = jest.spyOn(validToken, "validToken");
        validTokenMock.mockReturnValue(true);
    });

    it("Get comments by posting id", async () => {
    try {
      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([
        {
            status: 200,
            message: {
              "id_comment": 5,
              "id_posting": 14,
              "id_user": 2,
              "content": "test2",
              "creation_date_comment": "2021-01-16T17:44:51.458Z",
              "public": true,
              "linked_comment": null
            },
            error: false
        },
      ]);

      const res = await request.get("/comment/14").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Insert comment", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([
        {
            status: 200,
            message: {
              "content": "un contenido"
            },
            error: false
        },
      ]);

      daoMock.mockResolvedValueOnce([{ "insert_comment": "un contenido" }]);

      const res = await request.post("/comment/14").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("Delete comment by id", async () => {
    try {
      const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
      tokenDecodeMock.mockReturnValue({ payload: { id: 8 } });

      const daoMock = jest.spyOn(dao, "execSql");
      daoMock.mockResolvedValueOnce([
        {
            status: 200,
            message: {
              "delete_comment": ""
            },
            error: false
        },
      ]);

      const res = await request.delete("/comment/14").send();
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
    } catch (error) {
      console.log(error.message);
    }
  });
            
});
