//Express is a framework
const express = require('express');
const app = express();

//Set favorite icon
var favicon = require('serve-favicon');
var path = require('path');

//Morgan is logger
const morgan = require('morgan');

//body-parser is used when we require data from front-end to the router in backend using req.body
const bodyParser = require('body-parser');

//multer is used for handling file uploads
//It uploads the file first and then it allows you to save it to the database.
const multer = require('multer');

//This is user authentication module
const passport = require('passport');

//cookie-parser is used to parse cookies, so that we can use req.cookies
const cookieParser = require('cookie-parser');

//express-validator is a package which makes server side validation really easy.
const validator = require('express-validator');

//express-session is a package which stores the variables to evaluate between multiple sessions
const session = require('express-session');

//connect-flash stores the flash messages like errors or success messages which were tossed up during router.post or put
const flash = require('connect-flash');

const ejs = require('ejs');

//This file is used to connect node server and mongodb. 
//Also it checks for any errors or success during the connection.
require('./config/database');

var cs = require('./helpers/compareStrings');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handle express sessions
app.use(session({
    secret: 'this is developers secret',
    saveUninitialized: true,
    resave: true
}));


//validator
app.use(validator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        noRecordFound: function(input, propertyName, collection) {
            //Use this method when creating new record
            var RecordFound = false;
            collection.forEach(function(element) {
                if (cs(element[propertyName], input, true, false)) {
                    RecordFound = true;
                    return;
                }
            }, this);
            return RecordFound;
        }, 
        duplicateRecord: function(input, propertyName, collection) {
            //Use this method when creating new record
            var duplicateRecordNotFound = true;
            collection.forEach(function(element) {
                if (cs(element[propertyName], input, true, false)) {
                    duplicateRecordNotFound = false;
                    return;
                }
            }, this);
            return duplicateRecordNotFound;
        }, 
        duplicateRecordExcludingCurrentRecord: function(input, propertyName, collection, currentRecordPropertyValue) {
            //Use this method when editing a record
            var duplicateRecordNotFound = true;
            collection.forEach(function(element) {
                if (input != currentRecordPropertyValue && cs(element[propertyName], input, true, false)) {
                    duplicateRecordNotFound = false;
                    return;
                }
            }, this);
            return duplicateRecordNotFound;
        },
        isImage: function(input) {
            //check if the uploaded file has any one of these extensions: '.jpg, .jpeg, .png'
            var extension = input.substring(input.lastIndexOf('.'), input.length).toLocaleLowerCase();
            console.log(extension); 
            if(extension == '.jpg' || extension == '.jpeg' || extension == '.png') {
                return true;
            } else {
                return false;
            }
        }
    }
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

//Set static directories, so that we can access them easily
app.use(express.static(path.join(__dirname, '/public')));
app.use('/templates', express.static(path.join(__dirname, '/views/templates')));

//Set View-engine
app.set('views', path.join(__dirname, '/views'));
app.set('view-engine', ejs)

//For flashing server side error/success messages
app.use(flash());

//For displaying flashed messages from connect-flash on the same or redirected page
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Passport config
require('./config/passport')(passport);

var category = require('./api/category');
var photo = require('./api/photo');
var message = require('./api/message');
var user = require('./api/user')(passport);

//Map urls
app.use('/api/category', category);
app.use('/api/photo', photo);
app.use('/api/message', message);
app.use('/api/user', user);

//routes that don't match any other route should go here
app.get('*', function(req, res) {
    res.render('index.html.ejs');
});

//Create a server
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('server is listening on Port: %d', server.address().port);
});