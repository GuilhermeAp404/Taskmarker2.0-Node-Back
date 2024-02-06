const NotFoundError = require("../errors/NotFoundError.js");

function notFoundMiddleware (req, res, next) {
    const error404 = new NotFoundError();
    next(error404);
}

module.exports = notFoundMiddleware;