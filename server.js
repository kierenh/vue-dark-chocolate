var path = require("path"),  
    express = require("express");

var BUILD_DIR = path.join(__dirname, "build"),  
    PORT = process.env.port || 3000,
    app = express();

//Serving the files on the dist folder
app.use(express.static(BUILD_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {  
  res.sendFile(path.join(BUILD_DIR, "index.html"));
});

app.listen(PORT, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  // 0.0.0.0 represents your IP or localhost
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', PORT, PORT);
});
