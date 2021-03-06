const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: "./.env"
});
require("./src/db")();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
  res.setHeader(
      'Access-Control-Allow-Origin',
      '*'
  );
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
      // '*'
  );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE'
  );
  next();
});

require("./src/routes")(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Port: ${port}`));