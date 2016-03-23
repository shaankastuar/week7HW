
		// i think this is wrong, as my initial instinct was to create multiple objects for each variable...however, I changed this to making one variable with multiple keys
		// var trainNameFB = new Firebase("https://rucbweek7hw.firebaseio.com/");
		// var destinationFB = new Firebase("https://rucbweek7hw.firebaseio.com/");
		// var frequencyFB = new Firebase("https://rucbweek7hw.firebaseio.com/");
		// var nextArrivalFB = new Firebase("https://rucbweek7hw.firebaseio.com/");
		// var minutesAwayFB = new Firebase("https://rucbweek7hw.firebaseio.com/");

		var trainInfoFB = new Firebase("https://rucbweek7hw.firebaseio.com/");

		$('#trainSubmit').on('click', function(){
		    var trainName = $('#trainName').val();
		    var destination = $('#destination').val();
		    var frequency = $('#frequency').val();
		    var firstTrainTime = $('#firstTrainTime').val();
		    // var diffTime1 = moment().diff(moment(firstTrainTime), "minutes").val();

		    
		    // local storage
		    var newTrainInfo ={
		    	trainNameL: trainName,
		    	destinationL: destination,
		    	frequencyL: frequency,
		    	firstTrainTimeL: firstTrainTime,
		    	diffTimeL: 0
		    }


		    // set firebase

		    trainInfoFB.push(newTrainInfo);

		    // initially tried to use set 
		//     {
  //           trainName: trainNameFB,
  //           destination: destinationFB,
  //           frequency: frequencyFB,
  //           firstTrainTime: firstTrainTimeFB
		// });

			// log to console
			console.log(newTrainInfo.trainNameL);
			console.log(newTrainInfo.destinationL);
			console.log(newTrainInfo.frequencyL);
			console.log(newTrainInfo.firstTrainTimeL);
			console.log(newTrainInfo.diffTimeL);

			alert("Train successfully added");

			// Clears text boxes
			$("#trainName").val("");
			$("#destination").val("");
			$("#firstTrainTime").val("");
			$("#frequency").val("");

			// Prevents moving to new page
			return false;


		});

// THE FOLLOWING IS THROWING MY CODE OFF (so i commented it out)


	trainInfoFB.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// Store everything into a variable.
		var trainNameFB2 = childSnapshot.val().trainNameL;
		var destinationFB2 = childSnapshot.val().destinationL;
		var frequencyFB2 = childSnapshot.val().frequencyL;
		var firstTrainTimeFB2 = childSnapshot.val().firstTrainTimeL;
		var diffTimeFB = childSnapshot.val
		().diffTimeL;

		// Employee Info
		console.log(trainNameFB2);
		console.log(destinationFB2);
		console.log(frequencyFB2);
		console.log(firstTrainTimeFB2);

		// Prettify the employee start
		var firstTrainConverted = moment.unix(firstTrainTimeFB2).format("hh:mm");
		var currentTime = moment();
		var diffTime = diffTimeFB % frequencyFB2; 
		
		console.log(diffTime);
		
		console.log("Difference in time:" + diffTime);

		var tRemainder = diffTime % frequencyFB2;

		console.log(tRemainder);

		var minutesAwayFB = frequencyFB2 - tRemainder;

		var nextArrivalFB = moment().add(minutesAwayFB, "minutes");

		var nextArrivalFormat = moment(nextArrivalFB, "hh:mm");

		// console.log("arrival time:" _moment(nextArrivalFB).format("hh:mm"))



		// Add each train's data into the table 
		$("#trainTable > tbody").append("<tr><td>" + trainNameFB2 + "</td><td>" + destinationFB2 + "</td><td>" + frequencyFB2 + "</td><td>" + nextArrivalFormat + "</td><td>" + minutesAwayFB + "</td><td>" + firstTrainTimeFB2 + "</td></tr>");

		return false

	});

