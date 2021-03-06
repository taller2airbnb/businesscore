const ServerErrorResponse = require('../responses/generalResponses/ServerErrorResponse.js');
const GetProfileEndpoint = require('../endpoints/GetProfileEndpoint.js');
const LoginEndpoint = require('../endpoints/LoginEndpoint');
const StatusProfile = require('../endpoints/StatusProfileEndpoint');
const RegisterEndpoint = require('../endpoints/RegisterEndpoint');
const UpdateUserEndpoint = require('../endpoints/UpdateUserEndpoint');
const AddProfileEndpoint = require('../endpoints/AddProfileEndpoint');
const ChangePasswordEndpoint = require('../endpoints/ChangePasswordEndpoint');
const GetUserEndpoint = require('../endpoints/GetUserEndpoint');
const RegisterUserWalletEndpoint = require('../endpoints/RegisterUserWalletEndpoint');
const RegisterUserRoomEndpoint = require('../endpoints/RegisterUserRoomEndpoint');
const GetUsersEndpoint = require('../endpoints/GetUsersEndpoint');
const IntentBookingEndpoint = require('../endpoints/IntentBookingEndpoint');
const RecoverTokenEndpoint = require('../endpoints/RecoverTokenEndpoint');
const BlockedStatusEndpoint = require('../endpoints/BlockedStatusEndpoint');
const AcceptBookingEndpoint = require('../endpoints/AcceptBookingEndpoint');
const RejectBookingEndpoint = require('../endpoints/RejectBookingEndpoint');
const ChangePriceRoomEndpoint = require('../endpoints/ChangePriceRoomEndpoint');
const TransactionsEndpoint = require('../endpoints/TransactionsEndpoint');
const GetWalletEndpoint = require('../endpoints/GetWalletEndpoint');
const PutPushTokenEndpoint = require('../endpoints/PutPushTokenEndpoint');
const SendNotificationEndpoint = require('../endpoints/SendNotificationEndpoint');

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

    changePassword(user_mail, data, onResponse) {
        return this._requester.call({
            endpoint: new ChangePasswordEndpoint(user_mail),
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

    getUsers(onResponse) {
        return this._requester.call({
            endpoint: new GetUsersEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    intentBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new IntentBookingEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    recoverToken(mail, data, onResponse) {
        return this._requester.call({
            endpoint: new RecoverTokenEndpoint(mail),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }
    
    blockedStatus(user_id, data, onResponse) {
        return this._requester.call({
            endpoint: new BlockedStatusEndpoint(user_id),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    

    acceptBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new AcceptBookingEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    rejectBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new RejectBookingEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    changePriceRoom(data, onResponse) {
        return this._requester.call({
            endpoint: new ChangePriceRoomEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    transactions(data, onResponse) {
        return this._requester.call({
            endpoint: new TransactionsEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getWallet(creator_id, onResponse) {
        return this._requester.call({
            endpoint: new GetWalletEndpoint(creator_id),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: creator_id
        });
    }

    putPushToken(userId, data, onResponse) {
        return this._requester.call({
            endpoint: new PutPushTokenEndpoint(userId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    sendNotification(data, onResponse) {
        return this._requester.call({
            endpoint: new SendNotificationEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

}
