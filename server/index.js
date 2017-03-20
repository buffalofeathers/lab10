var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var url = require('url');

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

app.get('/api/chirps', function(req, res) {
        res.sendFile(path.join(__dirname, 'data.json'));
        });

app.post('/api/chirps', function(req, res) {
        var chirp = req.body;
        fs.readFile('server/data.json', 'utf8', function(err, data) {
                var chirps =JSON.parse(data);
                 chirps.push(chirp);
                fs.writeFile('server/data.json', JSON.stringify(chirps), function(err) {
                    res.sendStatus(201);
                });
            }); 
         });

app.listen(3000);
