const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 800;
const mongoose = require('mongoose');

// Mongoose connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Danceweb');
}

// Define Mongoose Schema
const contactSehema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    textarea: String
  });

const contact = mongoose.model('Contact', contactSehema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    const myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("<H1>This item has been saved to the Database</h1>")
    }).catch(()=>{
        res.status(400).send("Item was saved in the data base")
    });

})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});