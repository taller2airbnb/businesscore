const Requester = require("./Requester.js");
const fakeRequesterExpectedResponses = require("../mocks/fakeRequesterExpectedResponses.js");

("use strict");

module.exports = class FakeRequester extends Requester {
    constructor(expectedResponses) {
        super();
        this._expectedResponses = expectedResponses || fakeRequesterExpectedResponses();
    }

    call({endpoint, onResponse, data = undefined}) {
        const expectedResponseType = this._expectedResponses[endpoint.constructor.name];
        // TODO: Agregar response por defecto si no está definida en el diccionario
        const jsonResponse = expectedResponseType.defaultResponse();
        const endpointResponse = new expectedResponseType(jsonResponse);

        setTimeout(() => onResponse(endpointResponse), 2500);
    }
}
