"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, request, response, next) => {
    if (error.status !== undefined) {
        console.log("error status: ", error.status);
        console.log("error message: ", error.statusText);
        console.log("full error: ", error.data);
        response.status(error.status).json({ error: error.statusText });
        return;
    }
    response.status(700).json({ error: 'A General Error Has Occurred' });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map