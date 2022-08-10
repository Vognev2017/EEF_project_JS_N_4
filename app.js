const express = require('express');
const fs = require('fs');

const server = express();

const ob = [{
        name: "Petr",
        age: 23,
        phone: "12345"
    },
    {
        name: "Igor",
        age: 33,
        phone: "34567"
    },
    {
        name: "Dima",
        age: 32,
        phone: "89567"
    }
]

server.use(express.static(__dirname + '/style'));

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

server.get('/blog', (req, res) => {
    res.send('<h1>It\'s my blog page</h1>')
});

server.get('/json', (req, res) => {
    res.send(JSON.stringify(ob))
});

server.get('/download/:name', (req, res) => {
    const {
        name
    } = req.params;
    let fileName = name + '.txt'

    console.log(fileName);
    if (fs.existsSync(__dirname + '/' + fileName)) {
        res.download(__dirname + '/' + fileName)
    } else {
        res.status(404).sendFile(__dirname + '/404-not-found-png.png')
    }
});


server.listen(3000)