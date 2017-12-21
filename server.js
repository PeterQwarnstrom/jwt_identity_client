const express = require('express')
var path = require("path");

const app = express()

app.use(express.static(path.join(__dirname,"./dist")));
// app.use(express.static(path.join(__dirname,"./src")));

// app.get('/', function (req, res) {

//     res.sendFile(path.join(__dirname + '/index_LoginRedirect.html'));

// });

app.listen(3000, () => console.log('Example app listening on port 3000!'))