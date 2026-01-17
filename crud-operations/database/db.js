const mongoose = require('mongoose');

// Get the mongoDB url
const mongoURL =  `mongodb://127.0.0.1:27017/demo`;

// Connection setup with the mongoDB

mongoose.connect(mongoURL, {
    useNewUrlParser :  true,
    useUnifiedTopology : true,

});


// get the default connection 
// mongoes maintains a default connection object that representing the mongo db connection.

const db = mongoose.connection;


// event listners;

db.on('connected', ()=> {
    console.log()
})

db.on('disconnected', () => {
    console.log('Disconnected Database');
});

// Added 'err' parameter to log the actual issue
db.on('error', (err) => {
    console.error('Database connection error:', err);
});


// Exporting db and we will inport it into the SERVER FILE;

module.exports = db;
