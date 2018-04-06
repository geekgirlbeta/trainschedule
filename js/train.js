// Initialize Firebase
var config = {
    apiKey: "AIzaSyCN-qTw5U83im0Ct6_zQoWUVlMNiakI-_s",
    authDomain: "newproject-6a9d6.firebaseapp.com",
    databaseURL: "https://newproject-6a9d6.firebaseio.com",
    projectId: "newproject-6a9d6",
    storageBucket: "newproject-6a9d6.appspot.com",
    messagingSenderId: "900322598421"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function () {
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        train: trainName,
        destination: trainDestination,
        start: firstTrain,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    alert("Train successfully added.");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var tName = childSnapshot.val().train;
    var tDest = childSnapshot.val().destination;
    var tFreq = childSnapshot.val().frequency;
    var tFirst = childSnapshot.val().start;


    var trainIntervals = moment().diff(moment.unix(tFirst), "minutes");
    var trainRemainder = moment().diff(moment.unix(tFirst), "minutes") % tFreq;
    var tMinutes = tFreq - trainRemainder;

    var arrivalTime = moment().add(tMinutes, "m").format("hh:mm A");

    $("#train-table > tbody").append(
        "<tr><td>" +
        tName +
        "</td><td>" +
        tDest +
        "</td><td>" +
        tFreq +
        "</td><td>" +
        arrivalTime +
        "</td><td>" +
        tMinutes +
        "</td></tr>"
    );
});