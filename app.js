const express = require('express');
const port = 80;
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyparser = require('body-parser');

//Mongoose specific stuff
mongoose.connect('mongodb://localhost:27017/countrymusic',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//Define mongoose Scema
const ContactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:String,
    address:String
  });
const Contact = mongoose.model("Contact", ContactSchema);  

//Express Specific Stuff
app.use(express.urlencoded());
app.use('/img', express.static('img'));

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//END POINTS
app.get('/',(req, res)=>{
    // console.log(req.body);
    res.status(200).render('index.pug');
});
app.get('/contact',(req, res)=>{
    // console.log(req.body);
    res.status(200).render('contact.pug');
});
app.post('/form',(req, res)=>{
    res.status(200).send('Item has been saved to database');
    let data = new Contact(req.body);

    data.save()
   .then(doc => {
     console.log(doc);
   })
   .catch(err => {
     console.error(err)
   })   
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});