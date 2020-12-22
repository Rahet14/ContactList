// Requiring the library
const mongoose = require("mongoose");

// connecting to the db
mongoose.connect("mongodb://localhost/contacts_list_db");

// acquiring the connection
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print
db.once("open", function () {
  console.log("Successfully Connected to db");
});
