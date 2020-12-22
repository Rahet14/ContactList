const express = require("express");
const path = require("path");
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.static("assets"));

// app.use(function (req, res, next) {
//   req.myName = "rahet";
//   console.log("MW1");
//   next();
// });

// app.use(function (req, res, next) {
//   req.body.name = "heyaa";
//   console.log("MW2");
//   next();
// });

var contactList = [
  {
    name: "Rahet",
    phone: "345678",
  },
  {
    name: "mum",
    phone: "1234",
  },
  {
    name: "mehar",
    phone: "876",
  },
  {
    name: "papa",
    phone: "87621",
  },
];

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching data from db");
    }

    return res.render("home", {
      title: "Contact List",
      contact_list: contacts,
    });
  });
});

app.post("/create-contact", function (req, res) {
  // contactList.push(req.body);

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating the contact");
        return;
      }
      console.log("******", newContact);
      return res.redirect("back");
    }
  );

  // res.redirect("back");
});

app.get("/delete-contact", function (req, res) {
  console.log(req.query);
  let id = req.query.id;

  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in Deleting the contact");
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("ERROR");
    return err;
  } else {
    console.log("Server is running on Port: ", port);
  }
});
