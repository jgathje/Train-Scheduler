var config = {
    apiKey: "AIzaSyBcnERdGtVUIEasNEg3o1Bcw0WvpRcnLO0",
    authDomain: "firstfirebase-11dc3.firebaseapp.com",
    databaseURL: "https://firstfirebase-11dc3.firebaseio.com",
    projectId: "firstfirebase-11dc3",
    storageBucket: "firstfirebase-11dc3.appspot.com",
    messagingSenderId: "382103119575"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val().trim();

    if (firstTrain == "Invalid date" || trainName == "" || destination == "") {
        alert("Try again. All forms must be filled out correctly.");
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#frequency-input").val("");
    }
    else {
        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);

        alert("Train successfully added");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#frequency-input").val("");
    }
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;


    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log(diffTime);

    var remainder = diffTime % frequency;
    console.log(remainder);

    var nextTrainMinutes = frequency - remainder;

    var nextTrain = moment().add(nextTrainMinutes, "minutes");
    var nextTrainClean = moment(nextTrain).format("h:mm A");

    if (nextTrainMinutes === 1) {
        nextTrainMinutes = "Arriving Now";
        // nextTrainClean = moment().format("h:mm A")
    }

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainClean),
        $("<td>").text(nextTrainMinutes),
    );

    $("#train-table > tbody").append(newRow);
});

console.log(database)