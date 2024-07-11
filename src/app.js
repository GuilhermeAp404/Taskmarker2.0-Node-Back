const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const routes = require("./routes");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app=express();

const cors = require("cors");
var corsOptions = {
    origin: process.env.ORIGIN_URL,// some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(helmet());
routes(app);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports =app;
