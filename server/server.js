const express = require("express");

const bodyParser = require("body-parser");

const routes = require("./routes");

const cors = require('cors');



const app = express();

const PORT = 8000;



const allowedOrigins = new Set([

  "http://localhost:8080",

  "http://localhost:8081",

  "http://localhost:5173",

]);



const corsOptions = {

  origin(origin, callback) {

    if (!origin) return callback(null, true);

    return callback(null, allowedOrigins.has(origin));

  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

};



app.use(cors(corsOptions));

app.options("*", cors(corsOptions));



app.use(bodyParser.json());

app.use("/api", routes);





app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});



