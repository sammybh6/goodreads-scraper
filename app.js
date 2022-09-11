const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");


const app = express();

app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
const config = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    },
};

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post ("/", function (req, res) {

    const url=req.body.link
    axios.get(url, config)
        .then(res => {
            const $ = cheerio.load(res.data)
            console.log($(".authorName").text())
        }).catch(err => console.error(err))
});




app.listen(4000, function () {
    console.log("Server started on port 4000.");
});
