var counter = 0;
var timeoutID;
var delay = 5000;
var ip = location.host;
$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var status = $('#status');
    var colours = ["white", "red", "yellow", "blue"];

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        input.hide();
        $('span').hide();
        return;
    }

    // open connection
    var host = 'ws://' + ip + ':31337';
    var connection = new WebSocket(host);

    connection.onopen = function () {
        // first we want users to enter their names
        input.removeAttr('disabled');
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
	    try {
		    var json = JSON.parse(message.data);
	    } catch(e) {
		    console.log('This doesn\'t look like a valid JSON: ', message.data);
		    return;
	    }
	    console.log(message.data);
	    if (json.type === 'message') {
		var id = "";
		var secondary_id = "main_lightA_B";
		id = id.concat('main_light', json.id);
		var button = json.button;
		console.log("ID: ", id);
		console.log("Button: ", button);
		// increase counter 
		counter++;
		if(button < 1) {
			var light = document.getElementById(id);
			light.style.backgroundColor = colours[button];
		}
		else {
			var secondary_light = secondary_id;
			secondary_light = secondary_light.replace(/A/, json.id);
			secondary_light = secondary_light.replace(/B/, json.button);
			console.log(secondary_light);
			var main_light = document.getElementById(id);
			main_light.style.backgroundColor = colours[1];
			var secondary_light_id = document.getElementById(secondary_light);
			secondary_light_id.style.backgroundColor = colours[button];
		}
	    }
	    if(counter == 3) {
		    console.log("All lights set. Resetting....");
		    counter = 0;
		    timeoutID = window.setTimeout(resetLights, delay);
	    }
    };
});

function resetLights() {
	// Reset lights
	var x;
	for(x = 0; x < 3; x++) {
		var reset_id = "";
		var reset_secondary_id = "main_lightA_B";
		reset_id = reset_id.concat('main_light', x);
		reset_secondary_id = reset_secondary_id.replace(/A/, x);
		reset_secondary_id = reset_secondary_id.replace(/B/, "");
		var light = document.getElementById(reset_id);
		light.style.backgroundColor = "#111111";
		light = document.getElementById(reset_secondary_id+"1");
		light.style.backgroundColor = "#111111";
		light = document.getElementById(reset_secondary_id+"2");
		light.style.backgroundColor = "#111111";
		light = document.getElementById(reset_secondary_id+"3");
		light.style.backgroundColor = "#111111";
		/*
		var light1 = document.getElementById(x+"_1");
		light1.style.backgroundColor = "#111111";
		var light2 = document.getElementById(x+"_2");
		light2.style.backgroundColor = "#111111";
		var light3 = document.getElementById(x+"_3");
		light3.style.backgroundColor = "#111111";
		*/
	}
}
