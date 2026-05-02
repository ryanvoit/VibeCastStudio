const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use("/api", routes);

app.use(cors({
  origin: 'http://localhost:8080'
}))

app.use(express.json());

/*
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'application/json'],
    credentials: true
}));
*/



/*
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({
  target: 'https://api.example.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}));
*/



/*
app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'application/json'],
  credentials: true
}));
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

