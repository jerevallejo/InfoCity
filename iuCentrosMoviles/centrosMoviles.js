var map;
var drawer;

$(document).ready(function() {
  $(bootstrap);
});



var bootstrap = function() {

	map = createMap("divMapa",  Config.ungsLocation);
    var drawer = new Drawer(map);
    var res= request();
    console.log(res);

}

var request = function() {
  var url = Config.urlAsistService;
  var urlmoviles = "/supporttrucks/";

    var requestPeticion = function() {
    return $.ajax(url + urlmoviles);
  	}

	var resolveDrivers = function(request) {
		var newAvailableDrivers = [];
	    request.availableDrivers.forEach(function(driver) {
	      requestDriver(driver.driver_id)
	        .then(function(response) {
	          var newDriver = responseExtract("driver", response);
	          newDriver["position"] = driver.position;
	          newAvailableDrivers.push(newDriver);
	        });
	    });
	    request["availableDrivers"] = newAvailableDrivers;
	    return request;
	 }
}
