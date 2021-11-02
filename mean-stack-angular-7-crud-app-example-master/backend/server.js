let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

//*********** */

function initial() {
   Role.estimatedDocumentCount((err, count) => {
     if (!err && count === 0) {
       new Role({
         name: "user"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
 
         console.log("added 'user' to roles collection");
       });
 
       new Role({
         name: "moderator"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
 
         console.log("added 'moderator' to roles collection");
       });
 
       new Role({
         name: "admin"
       }).save(err => {
         if (err) {
           console.log("error", err);
         }
 
         console.log("added 'admin' to roles collection");
       });
     }
   });
 }

 //*********** */

// Setting up port with express js
const employeeRoute = require('../backend/routes/employee.route')
const authRoute = require('../backend/routes/auth.route')
const userRoute = require('../backend/routes/user.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', employeeRoute)
app.use('/api', authRoute)
app.use('/api', userRoute)



// Create port
const port = process.env.PORT ||  8080;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});