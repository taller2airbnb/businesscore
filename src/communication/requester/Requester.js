("use strict");

module.exports = class Requester {
    call({endpoint, onResponse, data = undefined}) {
        throw new Error("You have to implement the method");
    }
}
