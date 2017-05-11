const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (e)=>{
    if(e){
    console.log('Error has been occured.');
  }
  })
  next();
})

app.get('/', (req,res) => {
  res.render('home.hbs', {
    myTitle: 'Welcome to my awesome web page!',
    currentYear: new Date().getFullYear(),
    tabTitle: "Home"
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    myTitle: "About Page",
    currentYear: new Date().getFullYear(),
    tabTitle: "About"
  });
})

app.listen(3000);
console.log('Listening on port 3000');
