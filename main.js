var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// Чтение из файла
var file = fs.readFileSync('films.json', 'utf8');
var jsObjectFilms = JSON.parse(file);
// Форма
app.post('/add', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    var jsonData = fs.readFileSync('film.json', 'utf8');
    var all = json.Data.substring(0,json.Data.lenght-1) + ',' + JSON.stringify(req.body)+"]";
    console.log(all);
    fs.writeFileSync('films.json', all, function(error) {
        if(error) throw error; //если возникла ошибка
        console.log("Асинхронная запись файла завершена");
    })
    res.render('add');
});
// СЕРВЕР
app.listen(3000);

app.get('/', function(req, res) {
    res.render('add');
});

app.get('/:name', function(req, res) {
    if (req.params.name === 'add') {
        res.render('add');
    } else if (req.params.name === 'view') {
        res.render('view', {data: jsObjectFilms});
    } else {
        res.sendFile(__dirname + '/404.html');
    }
});