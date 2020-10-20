const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// tallies going back to 5/3 from 10/18
var tallies = [
  { name: "kerns1", display: "Kerns 1-15", count: 14 },
  { name: "kerns2", display: "Kerns 16-20", count: 14 },
  { name: "kerns3", display: "Kerns 21-33", count: 67 },
  { name: "buckman1", display: "Buckman 1-15", count: 69 },
  { name: "buckman2", display: "Buckman 16-20", count: 67 },
  { name: "buckman3", display: "Buckman 21-30", count: 80 },
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/tallies", (request, response) => {
  response.json(tallies);
});

 app.post("/tally", (request, response) => {
   tallies[request.body.index].count = request.body.count;
 });

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
