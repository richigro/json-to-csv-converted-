const express = require('express');
const app = express();

const port = 8080;

// will server all static files inside the client folder
app.use(express.static('client'));

//will parse incoming user requests with json payloads
//thi will make it so that req.body is not undefined
app.use(express.json());

//will
app.use(express.urlencoded({extended: true}));

//Middleware
var myMiddleware = (req, res, next) => {
  console.log('hello from middleware', req.body);
  const jsonObject = JSON.parse(req.body.text);
  const headers = Object.keys(jsonObject);
  let  values = Object.values(jsonObject);
  let newValues = [];
  const replacedValues = values.forEach((value) => {
      if(value === null){
          // replace value with empty string
          value = 'empty'
      }
      newValues.push(value);
  });
  values = newValues;

  console.log('Headers', headers.length);
  console.log("values", values.length);
  res.send(`${headers} \n ${values}`);
  /// post this stuff somewhere in the html page
  


  next();
};

app.use(myMiddleware);

app.get('/', (req, res) => {
    res.json({hello: "world", myName: "Ricardo"});
});

app.post('/', (req, res) => {
   
    res.redirect('/');
    res.end();
});

app.listen(port, () => {
    console.log(`App listening on  http://localhost:${port}`);
})