const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('current-year', ()=>{
  return new Date().getFullYear();
})
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
    tabTitle: "Home"
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    myTitle: "About Page",
    tabTitle: "About"
  });
})

app.get('/projects', (req,res)=>{
  res.render('projects.hbs', {
    myTitle: 'Projects Page'
  })
})

app.listen(port, ()=>{
  console.log(`Listening on port: ${port}`);
});
