/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.on('get:speakers', function() {
  	sendSpeakers();
  });

  socket.on('set:speakers', function(id) {
  	updateActiveSpeaker(id);
  	sendSpeakers();
  });

  setInterval(function() {
  	for (var i = speakers.length - 1; i >= 0; i--) {
  		if(speakers[i].active == "true") {
  			speakers[i].time++;
  			rolling = speakers[i].time;
  			if (rolling > 59) {
  				minutes = Math.floor(rolling / 60);
  				seconds = rolling % 60;
  				if (seconds < 10) {
  					pt = minutes+":0"+seconds;
  				} else {
  					pt = minutes+":"+seconds;
  				}
  			} else {
  				pt = "0:"+rolling;
  			}
  			speakers[i].parsedTime = pt;
  		}
  	}
  	sendSpeakers();
  }, 1000);

  function getActiveSpeaker(id) {
  	for (var i = speakers.length - 1; i >= 0; i--) {
  		if (speakers[i].id == id) {
  			return speakers[i];
  			break;
  		}
  	}
  }

  function updateActiveSpeaker(id) {
  	for (var i = speakers.length - 1; i >= 0; i--) {
  		if (speakers[i].id == id) {
  			speakers[i].active = "true";
  		} else {
  			speakers[i].active = "false";
  		}
  	}
  }

  function sendSpeakers() {
	  socket.emit('send:speakers', speakers);
  }

  var speakers = [
  	{
  		"name": "Ted Cruz",
  		"path": "http://localhost:3000/imgs/cruz.jpg",
  		"time": "100",
  		"id": "cruz",
  		"active": "false",
  		"parsedTime": "0:00"
  	},
  	{
  		"name": "Donald Trump",
  		"path": "http://localhost:3000/imgs/trump.jpg",
  		"time": "141",
  		"id": "trump",
  		"active": "false",
  		"parsedTime": "0:00"
  	},
  	{
  		"name": "Marco Rubio",
  		"path": "http://localhost:3000/imgs/rubio.jpg",
  		"time": "51",
  		"id": "rubio",
  		"active": "false",
  		"parsedTime": "0:00"
  	},
  	{
  		"name": "John Kasich",
  		"path": "http://localhost:3000/imgs/kasich.jpg",
  		"time": "0",
  		"id": "kasich",
  		"active": "false",
  		"parsedTime": "0:00"
  	}
  ];
};
