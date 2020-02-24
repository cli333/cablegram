const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const firebase = require("./firebase/firebase");

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes
app.get("/users/:id", (req, res) => {
  res.send(`get user with id:${req.params.id}`);
});

// basic get all grams
// initial order by NEWEST
app.get("/grams", (req, res) => {
  firebase
    .firestore()
    .collection("grams")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      let docs = snapshot.docs.map(doc => doc.data());
      res.json(docs);
    })
    .catch(error => console.log(error));
});

app.get("*", (req, res) => {
  res.send("Nothing here!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
