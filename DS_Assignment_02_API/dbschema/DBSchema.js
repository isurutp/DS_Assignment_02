var mongo = require('mongoose');
var schema = mongo.Schema;

var trainSchema = new schema(
    {
        trainName: {
            type: String,
            trim: true,
            required: 'Field cannot be empty'
        },
        pricePerTicket: {
            type: String,
            required: 'Field cannot be empty'
        },
        trainRoute: {
            type: String,
            trim: true,
            required: 'Field cannot be empty'
        },
    }
);


var UserSchema = new schema(
    {
        uName: {
            type: String,
            trim: true,
            required: 'Field cannot be empty'
        },
        userEmail: {
            type: String,
            required: 'Field cannot be empty'
        },
        password: {
            type: String,
            trim: true,
            required: 'Field cannot be empty'
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: 'Field cannot be empty'
        },
    }
);

var BookingSchema = new schema(
    {
        trainName: {
            type: String,
            trim: true,
        },
        userName: {
            type: String,
            trim: true,
        },
        totalPrice: {
            type: String,
        },
        bookingDate:{
            type: String
        }
    }
);

mongo.model('train', trainSchema);
mongo.model('user', UserSchema);
mongo.model('booking', BookingSchema);

mongo.connect('mongodb://127.0.0.1:27017/DS_Assignment_02', (error) => {
    if(error){
        console.log(error);
        process.exit(-1);
    }
    console.log("DB Connection Successful");
});

module.exports = mongo;