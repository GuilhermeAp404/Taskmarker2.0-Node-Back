const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const routes = require("./routes");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app=express();

app.use(helmet());
routes(app);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports =app;
