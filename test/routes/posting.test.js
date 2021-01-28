
var supertest = require('supertest-as-promised');
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js")


const request = supertest(server);


describe(" Test Suite: posting", () => {


    beforeEach(() => {
        jest.resetAllMocks();
        const validTokenMock = jest.spyOn(validToken, 'validToken');
        validTokenMock.mockReturnValue(true);
    });

    it('Get posting get wallet', async () => {
        try {
            const daoMock = jest.spyOn(dao, "execSql");
            daoMock.mockReturnValue([
                {
                    "id_posting": 17,
                    "price_day": "0.0002",
                    "creation_date": "2021-01-14T16:58:48.885Z",
                    "start_date": "2021-04-03T03:00:00.000Z",
                    "end_date": "2022-04-03T03:00:00.000Z",
                    "state": "activo",
                    "public": true,
                    "content": "un re contenido papa",
                    "country": "argentina",
                    "city": "necochea",
                    "max_number_guests": 3,
                    "id_user": 2,
                    "name": "telo",
                    "transaction_hash": "0xdbb8fe79357a6816287057f39b9533a13e97438908a2266a1fff9f0b52d5171f",
                    "deleted": false,
                    "location": {
                        "x": -58.5075778,
                        "y": -34.462299
                    },
                    "blocked": false
                }
            ]);

            const res = await request.get('/posting').send();
            expect(res.body.status).toBe(200);
            expect(res.body.error).toBe(false);
            expect(res.body.message[0].content).toBe("un re contenido papa");
        } catch (error) {
            console.log(error.message)
        }
    });

    it('Get posting fail', async () => {
        try {
            const daoMock = jest.spyOn(dao, "execSql");

            daoMock.mockImplementation(() => {
                 throw 'un error mockeado';
            });

            const res = await request.get('/posting').send();
            expect(res.body.status).toBe(500);
            expect(res.body.error).toBe(true);
        } catch (error) {
            console.log(error.message)
        }
    });


});
