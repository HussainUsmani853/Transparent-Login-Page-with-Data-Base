const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/loginPageTransparent', {useNewUrlParser: true})
const port = 8000;

//Define Mongoose schema
const contactSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.post('/', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to the database");
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
});

app.listen(port, () =>{
    console.log(`The application is running on port ${port}`);
});