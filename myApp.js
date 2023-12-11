let express = require("express");
let bodyParser = require("body-parser");
let app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

app.get(
	"/now",
	function (req, res, next) {
		req.time = new Date().toString();
		next();
	},
	function (req, res) {
		res.json({ time: req.time });
	}
);

app.use(function (req, res, next) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
});

// app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.send("Response String");
});

app.get("/html", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/public/html", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/:word/echo", function (req, res) {
	res.json({ echo: req.params.word });
});

// app.get("/name", function (req, res) {
// 	res.json({ name: req.query.first + " " + req.query.last });
// });

app
	.route("/name")
	.get(function (req, res) {
		res.json({ name: req.query.first + " " + req.query.last });
	})
	.post(function (req, res) {
		res.json({ name: req.body.first + " " + req.body.last });
	});

app.get("/json", function (req, res) {
	if (process.env.MESSAGE_STYLE === "uppercase")
		res.json({ message: "HELLO JSON" });
	else {
		res.json({ message: "Hello json" });
	}
});

module.exports = app;
