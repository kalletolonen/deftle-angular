// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.get("/api/thisword", (req, res, next) => {
    var sql = "SELECT * FROM wordlist ORDER BY RANDOM() LIMIT 1;"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
		
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/allwords", (req, res, next) => {
	
    var sql = "select * from wordlist"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
