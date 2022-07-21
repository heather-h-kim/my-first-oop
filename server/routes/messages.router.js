const express = require('express');
const router = express.Router();
const messages = require('../modules/messages.data.js')

router.post('/', (req, res) => {
    console.log('in message post route');
    console.log('req.body is', req.body);
    let guest = req.body.guest;
    let hotel = req.body.hotel;
    let template = req.body.template;

    console.log('guest is', guest);
    console.log('hotel is', hotel);
    console.log('template is', template);
    
    //Generate the greeting depending on the local time at the hotel's location 
    let currentTime = new Date().toLocaleString("en-US", {hour:'numeric', hour12: false, timeZone: hotel.timezone});

    let greeting;
    if(currentTime >= 0 && currentTime < 12){
        greeting = "Good morning, ";
    } else if(currentTime >= 12 && currentTime < 18){
        greeting = "Good afternoon, ";
    } else if(currentTime >= 18 && currentTime < 24){
        greeting = "Good evening, ";
    }

    //Create a class to generate a message
    class Message {
        constructor(template, greeting, firstName, hotelName, roomNumber){
            this.template = template;
            this.greeting = greeting;
            this.firstName = firstName;
            this.hotelName = hotelName;
            this.roomNumber = roomNumber;
        }

        getTemplate = () => {
            return this.template;
        }

        getGreeting = () => {
            return this.greeting;
        }

        getFirstName = () => {
            return this.firstName;
        }

        getHotelName = () => {
            return this.hotelName;
        }

        getRoomNumber = () => {
        return this.roomNumber;
        }

        generateGreeting = () => {
            return this.greeting + this.firstName + "." ;
        }

        generateBody = () => {
            let body = this.template.replace("{hotelName}", this.hotelName);
            body = body.replace("{roomNumber}", this.roomNumber);
            return body;
        }

        generateMessage = () => {
            return this.generateGreeting() + " " + this.generateBody();
        }
    }

    let message = new Message(template.message, greeting, guest.firstName, hotel.company, guest.reservation.roomNumber);

    let generatedMessage = message.generateMessage();  
    res.send(generatedMessage);
})


module.exports = router;