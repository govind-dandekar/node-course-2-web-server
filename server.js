const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //sets hbs at the view engine


//middleware; use 'next' to tell express when the function is done
app.use((req, res, next) => { //have access to everything in req object
  now = new Date().toString(); //string formatted timestamp
  var log = (`${now}: ${req.method} ${req.url}`);

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanence.hbs');
// }); //since there's no next(), nothing below is executed

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
//   res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my homepage!'
  })
})

//root: replace with response.render(home.hbs, {})
// same h1, same footer, welcome message passed

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

//create a route at /bad
//res.send -> JSON data with an error message property; error handling request

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
