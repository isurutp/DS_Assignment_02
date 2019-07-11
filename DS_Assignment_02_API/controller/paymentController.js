const mongo = require('../dbschema/DBSchema');
const bookingSchema = mongo.model('booking');
var nodemailer = require('nodemailer');

var paymentController = function () {

    this.add = function (data) {
        return new Promise((resolve, reject) => {
            var bookingSchema = new bookingSchema({
                trainName: data.train,
                userName:data.email,
                totalPrice:data.total,
                bookingDate: Date.now() ,
            });

            bookingSchema.save().then(function(){
                resolve({status: 200,message: 'Payment successful'});
            }).catch((error) => {
                reject({status: 500, message: error});
            });

            var message =
                '<p>Dear Sir </p>' +
                '<p>We have received your payment</p>`' +
                '<p>Route : </p>' + data.route +
                '<p>Number of tickets : </p>' + data.tickets +
                '<p>Total Price : </p>' + data.price +
                '<p>Thank you</p>';

            let transporter = nodemailer.createTransport({service: 'gmail', secure: false, port: 25, auth: {
                    user:'testinghardwareAMS@gmail.com',
                    pass: 'testingpassword'},
                tls:{rejectUnauthorized:false}
            });

            let mailSettings = {
                from: 'testinghardwareAMS@gmail.com',
                to: data.email,
                subject: 'Train Ticket Reservation',
                text: '',
                html: message
            };

            transporter.sendMail(mailSettings,(error) => {
                if(error){
                    return console.log(error);
                }
                console.log('Email successful');
            });
        }).catch(error => {
            return console.log(error);
        });
    };

};

module.exports = new paymentController();