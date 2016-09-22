var latitude;
var longitude;

function geoFindMe() {

  var button = document.getElementById('sunset-button').classList;

  button.add('hide-button');

  var output = document.getElementById("out");

  // output.add('show-sunset-time');



  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log('Here is the lat: ' + latitude + ' Here is the long: ' + longitude);
    getSunset();
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

  function getSunset() {

  	var celestialObject = document.getElementById('sunset-container').classList;
    var sun = document.getElementById('sun').classList;

  	if(celestialObject.contains('sunset-time')){
  		celestialObject.add('sky-transition');
  	}

    if(sun.contains('sun')){
    sun.add('set-the-sun');
    }

  	var background = document.getElementById('body-id').classList;

  	if(background.contains('body-background')){
  		background.remove('body-background');
  		background.add('night-color');
  	}

   



    // var skyOrb = document.getElementById('sunset-container')

  	var baseUrl = 'http://api.sunrise-sunset.org/json?';
  	var xhr = new XMLHttpRequest();
  	xhr.onreadystatechange = function() {
  		if (xhr.readyState === XMLHttpRequest.DONE) 
  		{
  			var result = JSON.parse(xhr.responseText);
  			var sunset_utc = new Date(result.results.sunset);
  			var sunset_local = sunset_utc.toLocaleTimeString('en-US', {'hour12' : true});
  			console.log(sunset_local);
  			output.innerHTML = sunset_local;

  		}

  	}

  	var reqUrl = baseUrl + 'lat=' + latitude + '&lng=' + longitude + '&formatted=0';
  	console.log(reqUrl);
  	xhr.open('GET', reqUrl);
  	xhr.send();

		
		
	

	}	
}

// http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today