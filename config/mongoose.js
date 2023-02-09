const mongoose = require("mongoose");

// connect to the db
mongoose.connect("mongodb://localhost:27017/todos_list_db");

//acquire the connection
const db = mongoose.connection;

// on error
db.on("error", console.log.bind(console, "error connecting to the db"));

// if up and running then print the msg
db.once("open", function () {
  console.log("Succesfully connected to the database");
});
