var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');

const cmdTwainCmd = "C:\\CmdTwain\\CmdTwain.exe"
const cmdTwainPreviewOpts = "/PAPER=A4 /RGB /DPI=30 /JPG25"
const cmdTwainScanOpts = "DPI 1200 COLOR"
const cmdTwainQuality = 100
const cmdTwainTmpDir = "C:\\tmp"

var app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));


app.listen(3001, () => {
    console.log("Server running on port 3000");
});


app.get("/scan", (req, res, next) => {
    console.log('/scan');

    const tmpFileName = cmdTwainTmpDir + "\\scan_#" + (new Date().toISOString().replace('T', '_').replace(/[:,-]/g, '').substr(0, 15)) + ".jpg";

    child_process = require('child_process');

    child_process.execSync(cmdTwainCmd + " -c \"" + cmdTwainScanOpts + "\" " + cmdTwainQuality + " " + tmpFileName);

    res.json({
        "status": "ok",
    });
});
