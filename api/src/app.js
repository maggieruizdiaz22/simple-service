const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const dotenv = require("dotenv");
//const passport = require("passport");
require("./db.js");
const server = express();
const cors = require("cors");
dotenv.config();

server.name = "API";

//server.use(session({ secret: "secret" }));
server.use(
  cors({
    origin: "*", // Permite solicitudes desde cualquier origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Habilita el envío de cookies u otros datos de autenticación
  })
);
//server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(express.json());
//commented because no cookieParser
// server.use(cookieParser());
server.use(morgan("dev"));
// server.use(passport.initialize());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
