const express = require('express');


const mongoose = require('mongoose');


const Narudjbenica = require('./models/narudjbenica');

const app = express();

mongoose.connect('mongodb://localhost/fpis').then(()=> {
  console.log('Connected to database')
})
.catch(()=> {
  console.log('Connection failed');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS ");
  next();
});

app.get("/api/narudjbenice",(req, res, next) => {
  Narudjbenica.find().then(documents => {
    res.status(200).json({
      narudjbenice: documents
    })
    }).catch((error) =>{
      res.status(400).send(error);
  });
});


app.put("/api/narudjbenice/:id", (req, res, next) => {
  const narudjbenica = new Narudjbenica({
    idNarudjbenice: req.body.idNarudjbenice,
    datumKreiranja: req.body.datumKreiranja,
    status: req.body.status,
    datumPotvrde: req.body.datumPotvrde
  });
  Narudjbenica.updateOne({idNarudjbenice: req.params.id}, narudjbenica).then(result => {
    console.log(result);
    res.status(201).json
    ({message:
      'Narudjbenica sa id '+ req.params.id+ ' je potvrdjena'
    })
    }).catch((error) =>{
      res.status(400).send(error);
    });;
});



module.exports = app;
