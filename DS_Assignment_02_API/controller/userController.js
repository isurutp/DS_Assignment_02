const mongo = require('../dbschema/DBSchema');
var userSchema = mongo.model('user');


var userController = function () {

    this.addData = (data) => {
        return new Promise((resolve, reject) => {
            var user = new userSchema({
                uName : data.uName ,
                userEmail: data.email,
                password: data.passw,
                phoneNumber: data.phone,
            });

            user.save().then(() => {
                resolve({status: 200, message: 'Successfully added', data: user.uName});
            }).catch((error) => {
                reject({status: 500, message: error});
            });
        }).catch(error => {
            return (console.log(error)) ;
        });
    };

    this.getUser = (email,password) => {
        return new Promise((resolve, reject) => {
            userSchema.find({$and:[{userEmail: email, password: password}]}).exec().then((data) => {
                resolve({status: 200, data: data}) ;
            }).catch((error) => {
                reject({status: 500, message: error});
            });
        });
    };

    this.checkEmail = (email) => {
        return new Promise((resolve, reject) => {
            userSchema.find({userEmail: email}).exec().then((data) => {
                resolve({status: 200, data: data});
            }).catch((error) => {
                reject({status: 500, message: error});
            });
        });
    };
}
module.exports = new userController();