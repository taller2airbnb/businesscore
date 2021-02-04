var supertest = require("supertest-as-promised");
var apiClient = require("../../src/communication/client/ApiClient.js");
const {Response}  = require('node-fetch');
const fetch  = require('node-fetch');
const server = require("../../app.js");
const request = supertest(server);

jest.mock('node-fetch');

describe(" Test Suite: Bookings", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  xit("Intent booking", async () => {
    try {

      fetch.mockReturnValue(Promise.resolve(new Response({
        "alias": "stevenseagal",
        "email": "steven@seagal.com",
        "id": 2,
        "name": "Steven",
        "profile": 1
      })));

      const res = await request.post("/login").send();
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/login', {
        method: 'POST',
      });

    } catch (error) {
      console.log(error.message);
    }
  });

});
