(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESDetailsMapController', ['$q', '$scope', '$timeout','$state', '$location','GoogleService','DataFactory','MapService','CommonFactory', TESDetailsMapController]);

    function TESDetailsMapController($q, $scope,$timeout,$state, $location,GoogleService,DataFactory,MapService,CommonFactory)
    {
        var self = this;
        self.DataFactory = DataFactory;
		self.MapService = MapService;
		self.GoogleService = GoogleService;
		$('#mapTab').tab('show');
		self.travelModeMappingList = [
			{text:"Driving",value:google.maps.TravelMode["DRIVING"]},
			{text:"Bicycling",value:google.maps.TravelMode["BICYCLING"]},
			{text:"Walking",value:google.maps.TravelMode["WALKING"]},
			{text:"Transit",value:google.maps.TravelMode["TRANSIT"]}
			
		];
		self.DataFactory.prevState="map";
		self.searchedAtleastOnce = 0;
		self.directionRequest={};
		self.isStreeViewPresent = false;
		self.showMap = function()
		{
			self.from= "Your Location";
			self.initAutocomplete();
			var mapDiv = document.getElementById("map");
			self.MapService.showMap(mapDiv,{lat:self.DataFactory.lat , lng: self.DataFactory.lon},document.getElementById('directionsPanel'),
							{lat:self.DataFactory.placeDetails.geometry.location.lat() , lng: self.DataFactory.placeDetails.geometry.location.lng()});
			// console.log(self.MapService.panorama);
			// if(self.MapService.panorama.projection)
			// 	self.isStreeViewPresent = true;
			
			setTimeout(function () {if(self.DataFactory.startAnimation == false)
				self.DataFactory.startAnimation  = true;});
		}
		self.toggleStreetView = function()
		{
			var mapDiv = document.getElementById("map");
			self.MapService.setStreetView(mapDiv,{lat:self.DataFactory.lat , lng: self.DataFactory.lon});
		}
		self.getDirections = function()
		{
			
			self.directionRequest.destination = new google.maps.LatLng(self.DataFactory.placeDetails.geometry.location.lat(),self.DataFactory.placeDetails.geometry.location.lng());
			if(!self.from || self.from.toLowerCase() == "my location" ||(self.searchedAtleastOnce == 0 && self.from.toLowerCase() == "your location"))
			{
				self.directionRequest.origin = new google.maps.LatLng(self.DataFactory.lat, self.DataFactory.lon);
				self.directionRequest.travelMode = self.searchParams.travelMode.value;
				self.MapService.getDirections(self.directionRequest,$scope,$timeout);
				
			}
			else if(self.lat!= null)
			{
				self.directionRequest.origin = new google.maps.LatLng(self.lat, self.lon);
				self.lat = null;
				self.lon - null;
				self.searchedAtleastOnce = 1;
				self.directionRequest.travelMode = self.searchParams.travelMode.value;
				self.MapService.getDirections(self.directionRequest,$scope,$timeout);
			}
			else
			{
				
                self.GoogleService.getGeocode(self.from).then(function(results){
					
                    if(results.status == 200 && results.data && results.data!="" && results.data.results && results.data.results.length>0)
                    {
                       	self.directionRequest.origin = new google.maps.LatLng(results.data.results[0].geometry.location.lat, results.data.results[0].geometry.location.lng);
						self.directionRequest.travelMode = self.searchParams.travelMode.value;
						self.MapService.getDirections(self.directionRequest,$scope,$timeout);
                    }
                    self.searchedAtleastOnce = 1;
                });
			}
			
		}
		self.initAutocomplete = function() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
			if(self.autocomplete)
				return;
		    self.autocomplete = new google.maps.places.Autocomplete(
		    /** @type {!HTMLInputElement} */(document.getElementById('from')),{types: ['geocode']});

		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		   
		    self.autocomplete.addListener('place_changed', self.fillInAddress);
		}
        self.fillInAddress = function() {
        // Get the place details from the autocomplete object.
            var place = self.autocomplete.getPlace();
			
            //console.log(place);
            if(place && place.geometry)
            {
                self.from = place.formatted_address;
                self.lat = place.geometry.location.lat();
                self.lon = place.geometry.location.lng();
            
            }
			else if(place && place.name)
			{
				self.directionRequest.destination = new google.maps.LatLng(self.DataFactory.placeDetails.geometry.location.lat(),self.DataFactory.placeDetails.geometry.location.lng());
				self.GoogleService.getGeocode(place.name).then(function(results){
					
                    if(results.status == 200 && results.data && results.data!="" && results.data.results && results.data.results.length>0)
                    {
                       	self.directionRequest.origin = new google.maps.LatLng(results.data.results[0].geometry.location.lat, results.data.results[0].geometry.location.lng);
						self.directionRequest.travelMode = self.searchParams.travelMode.value;
						self.MapService.getDirections(self.directionRequest,$scope,$timeout);
                    }
                    self.searchedAtleastOnce = 1;
                });
			}
            
        }
		if(self.DataFactory.lat && self.DataFactory.lon && self.DataFactory.placeDetails)
			self.showMap();
		else
			$state.go("main");
    }
})();

