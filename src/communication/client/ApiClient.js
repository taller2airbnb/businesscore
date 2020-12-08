const ServerErrorResponse  = require('../responses/generalResponses/ServerErrorResponse.js');
const  GetProfileEndpoint  = require('../endpoints/GetProfileEndpoint.js');
const  LoginEndpoint  = require('../endpoints/LoginEndpoint');
const StatusProfile  = require('../endpoints/StatusProfileEndpoint');
const RegisterEndpoint  = require('../endpoints/RegisterEndpoint');
const UpdateUserEndpoint  = require('../endpoints/UpdateUserEndpoint');
const AddProfileEndpoint  = require('../endpoints/AddProfileEndpoint');
const ChangePasswordEndpoint  = require('../endpoints/ChangePasswordEndpoint');
const GetUserEndpoint  = require('../endpoints/GetUserEndpoint');
const RegisterUserWalletEndpoint = require('../endpoints/RegisterUserWalletEndpoint');
const RegisterUserRoomEndpoint = require('../endpoints/RegisterUserRoomEndpoint');

'use strict';

module.exports = class ApiClient {
    constructor(requester, onServerErrorDo = () => {
    }) {
        this._requester = requester;
        this._handleServerError = onServerErrorDo;
        this._handleResponse = this._handleResponse.bind(this);
    }

    _handleResponse(response, onResponse) {
        if (response instanceof ServerErrorResponse) {
            console.log("Server error: ", response);
            return this._handleServerError(response);
        }

        return onResponse(response);
    }

    login(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getProfile(onResponse) {
        return this._requester.call({
            endpoint: new GetProfileEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    register(data, onResponse) {
        return this._requester.call({
            endpoint: new RegisterEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    statusProfile(data, onResponse) {
        return this._requester.call({
            endpoint: new StatusProfile(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    registerAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new RegisterAdminEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    updateUser(data, onResponse) {
        return this._requester.call({
            endpoint: new UpdateUserEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    addProfile(data, onResponse) {
        return this._requester.call({
            endpoint: new AddProfileEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    changePassword(data, onResponse) {
        return this._requester.call({
            endpoint: new ChangePasswordEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getUser(idUser, onResponse) {
        return this._requester.call({
            endpoint: new GetUserEndpoint(idUser),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: idUser
        });
    }

    createIdentity(data, onResponse) {
        return this._requester.call({
            endpoint: new RegisterUserWalletEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    createRoom(data, onResponse) {
        return this._requester.call({
            endpoint: new RegisterUserRoomEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

}