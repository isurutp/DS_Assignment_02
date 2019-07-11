
import * as axios from "axios/lib/core/Axios";
axios.defaults.baseURL = 'http://localhost:8080';

let headers = {};
let ticketDetails = {} ;

function getHeaders() {
    let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow0Origin' : '*',
        'Access-Control-Allow-Credentials' : true,
        'Authentication' : localStorage.getItem("passw"),
        'ClientId' : localStorage.getItem("uName")
    };
    return headers;
}

if (localStorage.getItem('uName') != undefined ){
    headers.Authentication = localStorage.getItem('passw');
    headers.ClientId = localStorage.getItem('uName');
}

function validateLogin() {
    var username = document.forms["login"]["uName"].value ;
    var password = document.forms["login"]["passw"].value ;

    if (username =="" || username==null) {
        alert ("Invalid username or password") ;
        return false ;
    }

    if (password=="" || password==null) {
        alert ("Invalid username or password");
        return false ;
    }

    let loginData = {
        uName: username ,
        passw: password
    };

    axios.post('/user/login', loginData,{headers: getHeaders()}).then((res) =>{
        let response = res.data ;
        if (response.SUCCESS === true){
            localStorage.setItem('passw', response.data.passw);
            localStorage.setItem('uName', response.data.uName);

            headers.Authentication = localStorage.getItem('passw');
            headers.ClientId = localStorage.getItem('uName');

            return true;
        }
    }).catch((error)=>{
        console.log(error);
        return false ;
    })

}

function validateRegister() {
    var username = document.forms["signUp"]["uName"].value ;
    var email = document.forms["signUp"]["email"].value ;
    var phone = document.forms["signUp"]["phone"].value ;
    var password = document.forms["signUp"]["passw"].value ;
    var rePassword = document.forms["signUp"]["rePassw"].value ;

    if (username =="" || username==null) {
        alert ("You cannot have empty fields") ;
        return false ;
    }

    if (email=="" || email==null) {
        alert ("You cannot have empty fields");
        return false ;
    }

    if (phone=="" || phone==null) {
        alert ("You cannot have empty fields");
        return false ;
    }

    if (password=="" || password==null) {
        alert ("You cannot have empty fields");
        return false ;
    }

    if (rePassword=="" || rePassword==null) {
        alert ("You cannot have empty fields");
        return false ;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

    }else{
        alert("You have entered an invalid email address")
        return (false)
    }

    var phoneno = /^\d{10}$/;
    if((phone.match(phoneno))){

    } else {
        alert("You have entered an invalid phone number");
        return false;
    }

    let registerData = {
        uName: username ,
        email: email ,
        phone: phone ,
        passw: password
    };

    axios.post('/user/add', registerData , {headers: getHeaders()}).then(res =>{
        console.log(res.status);
        if (res.status == 500){
            alert("Fill the form correctly");
            return false ;
        }
        return true ;
    }).catch(error =>{
        console.log(error);
        return false ;
    });

}

function selectTicket() {
    if (document.getElementById('train').value == "badulla" ){
        document.getElementById('price').innerHTML = 10 ;
        totalPrice();
    }

    if (document.getElementById('train').value == "avisawella" ){
        document.getElementById('price').innerHTML = 20 ;
        totalPrice();
    }

    if (document.getElementById('train').value == "matale" ){
        document.getElementById('price').innerHTML = 30 ;
        totalPrice();
    }
}

function totalPrice() {
    var ticket = document.getElementById('ticket').value ;
    var price = document.getElementById('price').innerText ;
    var route = document.getElementById('train').value ;
    var total = ticket * price ;
    document.getElementById('tPrice').innerHTML = total ;

    localStorage.setItem('trainRoute', route );
    localStorage.setItem('numberOfTickets', ticket);
    localStorage.setItem('price', total );
}

function validatePayment() {
    var email = document.forms["payment"]["mail"].value ;
    var phone = document.forms["payment"]["phone"].value ;
    var name = document.forms["payment"]["name"].value ;
    var creditRadio = document.getElementById('card').checked ;
    var mobileRadio = document.getElementById('mobile').checked ;
    var card = document.forms["payment"]["cardNum"].value ;
    var expDate = document.forms["payment"]["expDate"].value ;
    var ccv = document.forms["payment"]["ccv"].value ;
    var dialog = document.forms["payment"]["dialog"].value ;
    var pin = document.forms["payment"]["pin"].value ;
    var nic = document.getElementById('nic').checked ;
    var nicNo = document.forms["payment"]["nicNum"].value ;

    if (email=="" || email==null) {
        alert ("You cannot have empty fields");
        return false ;
    }
    if (phone=="" || phone==null) {
        alert ("You cannot have empty fields");
        return false ;
    }
    if (name=="" || name==null) {
        alert ("You cannot have empty fields");
        return false ;
    }

    if (creditRadio){
        if (card=="" || card==null) {
            alert ("You cannot have empty fields");
            return false ;
        }
        if (expDate=="" || expDate==null) {
            alert ("You cannot have empty fields");
            return false ;
        }
        if (ccv=="" || ccv==null) {
            alert ("You cannot have empty fields");
            return false ;
        }
    }else if (mobileRadio){
        if (dialog=="" || dialog==null) {
            alert ("You cannot have empty fields");
            return false ;
        }
        if (pin=="" || pin==null) {
            alert ("You cannot have empty fields");
            return false ;
        }
    }else{
        alert('Select a payment method');
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

    }else{
        alert("You have entered an invalid email address");
        alert(email) ;
        return (false)
    }

    var phoneno = /^\d{10}$/;
    if((phone.match(phoneno))){

    } else {
        alert("You have entered an invalid phone number");
        return false;
    }

    let newPrice = localStorage.getItem('price');

    if (nic){
        if (nicNo=="" || nicNo==null) {
            alert ("You cannot have empty fields");
            return false ;
        }else{
            newPrice = newPrice - (newPrice * 10/100) ;
            localStorage.setItem('price', newPrice);
        }
    }

    let paymentData = {} ;

    if(creditRadio){
        paymentData = {
            emailAdd: email ,
            phoneNum: phone ,
            fullName: name,
            cardNum: card,
            exDate: expDate,
            cv: ccv,
            route: localStorage.getItem('trainRoute'),
            tickets: localStorage.getItem('numberOfTickets'),
            price: localStorage.getItem('price')
        }
        console.log(paymentData);
        axios.post('/user/payment', paymentData , {headers: getHeaders()}).then(res => {
            let data = res.data ;
            if(data.SUCCESS == true){
                localStorage.setItem('trainRoute', '' );
                localStorage.setItem('numberOfTickets', '');
                localStorage.setItem('price', '' );
                return true ;
            }else{
                alert("Something went wrong") ;
                return false;
            }
        }).catch(error => {
            console.log(error);
            return false ;
        })

    }else if(mobileRadio){
        paymentData = {
            emailAdd: email ,
            phoneNum: phone ,
            fullName: name,
            dialogNum: dialog,
            pinNum: pin,
            route: localStorage.getItem('trainRoute'),
            tickets: localStorage.getItem('numberOfTickets'),
            price: localStorage.getItem('price')
        }

        console.log(paymentData);
        axios.post('/payment', paymentData , {headers: getHeaders()}).then(res => {
            let data = res.data ;
            if(data.SUCCESS == true){
                localStorage.setItem('trainRoute', '' );
                localStorage.setItem('numberOfTickets', '');
                localStorage.setItem('price', '' );
                alert("Payment successful");
                return true ;
            }else{
                alert("Something went wrong") ;
                return false;
            }
        }).catch(error => {
            console.log(error);
            return false ;
        })
    }

}




