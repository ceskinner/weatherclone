var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 4000;

app.set('port', port);
app.use(express.static(path.join(__dirname, '/')));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/public/html/index.html"))
});

app.get("/new-page", function (request, response) {
  response.sendFile(path.join(__dirname + "/public/html/new_page.html"))
});
app.get("/tokyo", function (request, response) {
  response.sendFile(path.join(__dirname + "/public/html/tokyo.html"))
});
app.listen(app.get('port'),  function () {
  console.log('Hello and welcome the the most badass express IN THE WORLD, started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
});
