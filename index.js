const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const dayjs = require("dayjs");

//setting up view engine as ejs and views as ./views folder
app.set("view engine", "ejs");
app.set("views", "./views");

//using a pre-built middleware to add static files (css, js, images, etc.)
app.use(express.static("assets"));

//middleware to parse incoming data --> body parser {req.body}
app.use(bodyParser.urlencoded({ extended: false }));

// setting up mongoose ODM to use mongodb
const db = require("./config/mongoose");

//importing the Todo collection
const Todos = require("./models/todos");

//listening to the port
app.listen(port, (err) => {
  if (err) {
    console.log("Error in starting the server: ", err);
  }

  console.log("Yayyy! Server is running on port: ", port);
});

//handling GET request

app.get("/", function (req, res) {
  Todos.find({}, (err, todos) => {
    if (err) {
      console.log("error in fetching todos from db");
      return;
    }

    //formatting the dates
    let formatted_dates = todos.map((el) =>
      dayjs(el.duedate).format("MMM DD, YYYY")
    );

    // console.log(formatted_dates);

    return res.render("home", {
      title: "Catman's To-Do List",
      todos_list: todos,
      //passing the formatted dates as a new parameter to home.ejs
      dates: formatted_dates,
    });
  });
});

//handling incoming data from the browser and adding it to the db

app.post("/add-task", (req, res) => {
  //creating and adding the incoming todo to the db
  Todos.create(
    {
      todo: req.body.todo,
      category: req.body.category,
      duedate: req.body.duedate,
    },
    function (error, newTodo) {
      if (error) {
        console.log("error in creating a todo");
        return;
      }
      // console.log("**************", newTodo);
      return res.redirect("back");
    }
  );
});

//deleting a todo

app.post("/delete-todo", function (req, res) {
  let ids = req.body.ids;
  // console.log(ids);
  if (typeof ids == "string") {
    //converting the id (of type string) to an array so that we can apply array functionality on it
    ids = [ids];
  }

  //deleting multiple ids
  Todos.deleteMany(
    {
      _id: {
        $in: ids,
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) console.log(result);
    }
  );
  // console.log(ids);
  return res.redirect("back");
});
