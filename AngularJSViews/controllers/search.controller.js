(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESSearchController', ['$q', '$window','$scope', '$state', '$location','GoogleService','DataFactory','UtilService', TESSearchController]);

    function TESSearchController($q,$window, $scope, $state, $location,GoogleService,DataFactory,UtilService)
    {
        var self = this;
        self.GoogleService = GoogleService;
        self.UtilService = UtilService;
        self.searchParams={};
        self.DataFactory = DataFactory;
        if(self.DataFactory.isFavTab == null)
            self.DataFactory.isFavTab = false;
        self.DataFactory.clearSet  = 0;
        if(self.DataFactory.searchParams)
        {
            self.searchParams = self.DataFactory.searchParams;
            self.isCurrentLocation = self.DataFactory.isCurrentLocation;
        }
        else
        {
            self.isCurrentLocation = true;
            self.searchParams.type = 'Default';

        }

        self.clear = function()
        {
            self.searchParams = {};
            self.DataFactory.searchParams= null;
            self.isCurrentLocation = true;
            self.searchParams.type = 'Default';
            
            self.DataFactory.isCurrentLocation = null;
            self.DataFactory.selectedPlace = null;
            self.DataFactory.clearSet = 1;
            document.getElementById("showDiv").innerHTML="";
            //$state.go("main", {}, {reload: true});
        }
        self.getResults = function()
        {
            self.DataFactory.isFavTab = false;
            $state.go('main.results');
        }
        self.search = function()
        {
            
            if(self.isCurrentLocation)
            {
                self.searchParams.location = self.DataFactory.lat+","+self.DataFactory.lon;
            }
            else if(self.address && self.address.lat)
                self.searchParams.location = self.address.lat+","+self.address.lon;
            else
            {
                self.searchParams.location = null;
                self.DataFactory.geocodePromise = self.GoogleService.getGeocode(self.searchParams.address);
            }
            
            
            self.DataFactory.searchParams = self.searchParams;
            self.DataFactory.isCurrentLocation = self.isCurrentLocation ;
            self.DataFactory.selectedPlace = null;

            if (self.DataFactory.searchParams != null)
            {
                $window.tableShown = true;
                //self.DataFactory.startAnimation = null;
                self.DataFactory.startAnimation = false;
                //$state.go('main.results', {}, {reload: true});
                self.DataFactory.clearSet  = 0;
                $state.go('main.results',{},{reload: 'main.results'});
            }
        }
        self.UtilService.getLatLong().then(function (results){
                if(results && results.data && results.data.lat && results.data.lon && self.isCurrentLocation)
                {
                    self.lat = results.data.lat;
                    self.lon = results.data.lon;
                    self.searchParams.location = self.lat+","+self.lon;
                    self.DataFactory.lat = self.lat;
                    self.DataFactory.lon = self.lon;
                }
            },
            function (e)
            {
                self.handleError(e);
            }
        );
        self.getFavorites = function()
        {  
            //self.DataFactory.showResults= true;
            self.DataFactory.isFavTab  = true;
            self.DataFactory.startAnimation = false;
            $state.go('main.favorites');
        }
        self.initAutocomplete = function() {

            if(self.autocomplete == null)
            {
                self.autocomplete = new google.maps.places.Autocomplete((document.getElementById('locationInput')),{types: ['geocode']});
                self.autocomplete.addListener('place_changed', self.fillInAddress);
            }
        }
        self.fillInAddress = function() {
        // Get the place details from the autocomplete object.
            var place = self.autocomplete.getPlace();
            //console.log(place);
            if(place && place.geometry)
            {
                self.address = {};
                self.searchParams.address = place.formatted_address;
                self.address.lat = place.geometry.location.lat();
                self.address.lon = place.geometry.location.lng();
                
            }
            else if(place && place.name)
            {
                self.searchParams.address = place.name;
            
            }
        }
        
        //self.initAutocomplete();
        
    }
})();