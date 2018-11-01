var socket = io.connect('https://roomtopia-emielpopelier.c9users.io');  
socket.on('established', function (data) {
    console.log(data);
});