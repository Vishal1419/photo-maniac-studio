//connection of node server with mongodb is handled by mongoose.
const mongoose = require('mongoose');

//this line tells mongodb to connect to a database named photomaniacstudiodb with nodejs server using mongoose package
mongoose.connect('mongodb://localhost/photomaniacstudiodb');

let db = mongoose.connection;

//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

//check for DB errors
db.on('error', function(err){
    console.log(err);
})