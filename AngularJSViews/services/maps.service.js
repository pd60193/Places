(function ()
{
    'use strict';

    angular
        .module('TES.Services')
        .service("MapService", [MapService]);

    function MapService(GoogleService)
    {
        var self = this;
        self.toggle = true;
        
        self.showMap = function(mapDiv,currentLocation,panelDiv,targetLocation)
        {
            
            self.currentLocation = currentLocation; 
            self.map = new google.maps.Map(mapDiv, {
              zoom: 14,
              center: targetLocation,
              streetViewControl: false
              
            });
            if(self.directionsService == null)
                self.directionsService=new google.maps.DirectionsService();
            if(self.directionsDisplay  == null)
            {
                self.directionsDisplay = new google.maps.DirectionsRenderer();
                self.directionsDisplay.setMap(self.map);
                // self.directionsDisplay.setOptions(new google.maps.DirectionsRendererOptions(
                //     {
                //         markerOptions:{
                //             label:{color:"green"}
                //         }
                //     }));
                self.directionsDisplay.setPanel(panelDiv);
                
            }
            else
            {
                self.directionsDisplay.setMap(self.map);
                // self.directionsDisplay.setOptions(new google.maps.DirectionsRendererOptions(
                //     {
                //         markerOptions:{
                //             label:{color:"green"}
                //         }
                //     }));
                self.directionsDisplay.setPanel(panelDiv);
            }
            
            self.fromMarker = new google.maps.Marker({
              position: targetLocation,
              map: self.map
            
            });
            self.panorama=self.map.getStreetView();
            self.panorama.setPosition(targetLocation);
            self.panorama.setPov({
                    heading: 265,
                    pitch: 0
                });
            //self.toggle = self.panorama.getVisible();
        }
        self.getDirections = function(request,scope,timeout) {
            request.provideRouteAlternatives =true;
            
            self.directionsService.route(request, function(response, status) {
                if (status == 'OK') {
                    self.fromMarker.setMap(null);
                    self.directionsResponse = response;
                    self.directionsDisplay.setDirections(self.directionsResponse);
                    
                    console.log(self.directionsResponse);
                    timeout(function() {
                        scope.$apply();
                    });
                    
                 
                }
                
                    
            });
             
        }
        
        self.processSVData = function(data,status)
        {
             if (status === 'OK') {
                var marker = new google.maps.Marker({
                    position: data.location.latLng,
                    map: self.map,
                    title: data.location.description
                });
                self.panorama.setPov({
                    heading: 270,
                    pitch: 0
                });
                self.panorama.setPano(data.location.pano);
                self.map.setStreetView(self.panorama);
                self.panorama.setVisible(true);
            }
        }
        self.setStreetView = function(mapDiv,currentLocation)
        {
            // self.currentLocation = currentLocation; 
            // self.sv =  new google.maps.StreetViewService();
            // self.panorama = new google.maps.StreetViewPanorama(mapDiv);

            // self.sv.getPanorama({location: currentLocation, radius: 50}, self.processSVData)
            self.toggle = self.panorama.getVisible();
            // console.log(self.panorama
            if (self.toggle == false) {
                // if(self.panorama.projection)
                    self.panorama.setVisible(true);
                
                    
            } else {
                self.panorama.setVisible(false);
            }
            //self.map.setStreetView(self.panorama);
        }
        
	}

})();