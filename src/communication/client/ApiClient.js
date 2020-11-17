const ServerErrorResponse  = require('../responses/generalResponses/ServerErrorResponse.js');
const  GetProfileEndpoint  = require('../endpoints/GetProfileEndpoint.js');
const  LoginEndpoint  = require('../endpoints/LoginEndpoint');
const  LoginGoogleEndpoint  = require('../endpoints/LoginGoogleEndpoint');
const RegisterEndpoint  = require('../endpoints/RegisterEndpoint');
const StatusProfile  = require('../endpoints/StatusProfileEndpoint');
const RegisterAdminEndpoint  = require('../endpoints/RegisterAdminEndpoint');
const UpdateUserEndpoint  = require('../endpoints/UpdateUserEndpoint');
const AddProfileEndpoint  = require('../endpoints/AddProfileEndpoint');
const ChangePasswordEndpoint  = require('../endpoints/ChangePasswordEndpoint');

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

    loginGoogle(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginGoogleEndpoint(),
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

}