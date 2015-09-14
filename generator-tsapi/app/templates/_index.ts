/// <reference path="../typings/tsd.d.ts" />

import express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello Typescript');
});

function repeatQuery(req: express.Request, res: express.Response) {
    res.json(req.query)
}

app.get('/repeat', repeatQuery);

var port: number = +process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Express server listening on port: ' + port);
});
