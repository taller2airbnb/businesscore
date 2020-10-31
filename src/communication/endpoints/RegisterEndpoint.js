import {Endpoint} from "./Endpoint.js";


export class RegisterEndpoint extends Endpoint {
    static url() {
        return '/register'
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}