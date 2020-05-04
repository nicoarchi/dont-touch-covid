const path = require("path");
const express = require("express");
var favicon = require('serve-favicon')
const app = express();

// SETTINGS
app.set("port", process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// STARTING THE SERVER
const server = app.listen(app.get("port"), () => {
    console.log("Server running on port", app.get("port"));
});