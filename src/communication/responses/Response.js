
 class ApiResponse {
    static understandThis(jsonResponse) {
        throw new Error("You have to implement the method");
    }

    constructor(jsonResponse) {
        this._jsonResponse = jsonResponse;
    }

    hasError() {
        return this._jsonResponse.error !== undefined;
    }

    errors() {
        return "Error desconocido";
    }

    content() {
        return this._jsonResponse;
    }
}

module.exports = ApiResponse

