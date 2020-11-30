
class ApiResponse {
    static understandThis(jsonResponse) {
        throw new Error("You have to implement the method");
    }

    constructor(jsonResponse, _statusCode) {
        this._jsonResponse = jsonResponse;
        this._statusCode = _statusCode;
    }

    static understandThis(status) {
        return (status == 400 || status == 403 || status == 404 || status == 409 || status == 401);
    }



    isError() {
        return !(this._statusCode >= 200 && this._statusCode < 300);
    }

    static errorCodes() {
        throw new Error("You have to implement the method");
    }

    errorMessages() {
        return this.errors();
    }

    description() {
        return "¡Ha ocurrido un error!";
    }

    hasBodyMessage() {
        return true;
    }

    static hasBodyMessage() {
        return false;
    }



    message() {
        return this.errorMessages();
    }

    statusCode() {
        return 400;
    }

    hasError() {
        return true;
    }

    getMessage() {
        return this._jsonResponse;
    }

    statusCode() {
        return this._statusCode;
    }

    static understandThis(status) {
        return (status == 400 || status == 403 || status == 404 || status == 409 || status == 401);
    }

    static hasError() {
        return true
    }

    static statusCode() {
        return 400;
    }

}

module.exports = ApiResponse

