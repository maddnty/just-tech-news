const path = require("path");
const express = require("express");

const exphbs = require("express-handlebars");


const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require("./config/connection");

const hbs = exphbs.create({});


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// turn on routes
app.use(require('./controllers'));
app.use(express.static(path.join(__dirname, "public")));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});
