(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESDetailsInfoController', ['$q', '$scope', '$state', '$location','DataFactory','CommonFactory','YelpService', TESDetailsInfoController]);

    function TESDetailsInfoController($q, $scope, $state, $location,DataFactory,CommonFactory,YelpService)
    {
        var self = this;
        self.DataFactory = DataFactory;
		self.fillColor = "f1f1f1";
		self.CommonFactory = CommonFactory;
		self.daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        self.YelpService = YelpService;
		self.DataFactory.prevState = "info";
		$('#infoTab').tab('show');
		
		self.prepareYelpQuery = function()
        {
            
            var request = {};
            if(!self.DataFactory.placeDetails)
                return request;
            if(self.DataFactory.placeDetails.name)
                request.name = self.DataFactory.placeDetails.name;
            var address_components = self.DataFactory.placeDetails.address_components;
            for(var i=0 ;i <address_components.length;i++)
            {
                for(var j = 0;j<address_components[i].types.length;j++)
                {
                    if(address_components[i].types[j] === 'locality')
                    {
                        request.city = address_components[i].long_name;
                        break;
                    }
                    if(address_components[i].types[j] === 'administrative_area_level_1')
                    {
                        request.state = address_components[i].short_name;
                        break;
                    }
                    if(address_components[i].types[j] === 'country')
                    {
                        request.country = address_components[i].short_name;
                        break;
                    }
                    if(address_components[i].types[j] === 'postal_code')
                    {
                        request.postal_code = address_components[i].long_name;
                        break;
                    }
                    if(address_components[i].types[j] === 'route')
                    {
                        if(address_components[i].long_name.length >64)
                            request.address1 = address_components[i].short_name;
                        else
                            request.address1 = address_components[i].long_name;
                        break;
                    }
                    if(address_components[i].types[j] === 'neighbourhood')
                    {
                        if(address_components[i].long_name.length >64)
                            request.address2 = address_components[i].short_name;
                        else
                            request.address2 = address_components[i].long_name;
                        break;
                    }
                }
            }
            request.latitude = self.DataFactory.placeDetails.geometry.location.lat();
            request.longitude = self.DataFactory.placeDetails.geometry.location.lng();
            return request;
        }
		self.applyfunc = function(scope,results)
		{
					scope.dic.CommonFactory.hideProgressBarCallback();
				    scope.dic.DataFactory.placeDetails = results;
					$("#infoRatings").rateYo({
			    	starWidth: "15px",
					rating: parseFloat(scope.dic.DataFactory.placeDetails.rating),
					numStars:parseInt( scope.dic.DataFactory.placeDetails.rating)+1
			  	});
				  
		}
		
		self.loadHours = function(dayIndex,displayModal)
		{
			if((displayModal && self.DataFactory.placeDetails.opening_hours) || (!displayModal && self.DataFactory.placeDetails.opening_hours.open_now))
			{
				var index = self.DataFactory.placeDetails.opening_hours.weekday_text[dayIndex].indexOf(":");
				var displayString = self.DataFactory.placeDetails.opening_hours.weekday_text[dayIndex].slice(index+1);
				if(!displayModal)
					return 'Open Now:' + displayString;
				else
					return displayString;
			}
			else
			{
				return 'Closed';
			}
		}
		self.detailsSearchCallback = function(results, status) {
            
            if(status == google.maps.places.PlacesServiceStatus.OK)
            {
                console.log(results);
                self.DataFactory.placeDetails = results;
				self.DataFactory.startAnimation = true;
                self.DataFactory.reviews = [];
				if(self.DataFactory.placeDetails.opening_hours)
				{
					self.DataFactory.today = moment.utc().utcOffset(self.DataFactory.placeDetails.utc_offset).format('e');
				}
				else
					self.DataFactory.today = null;
                // setTimeout(function () {
				
				$scope.$apply(self.applyfunc($scope,results));
				
				// });
                self.DataFactory.yelpRequest = self.YelpService.getMatch(self.prepareYelpQuery());
                
                self.DataFactory.photos = [];
                
                if(results.reviews)
                {
                    self.DataFactory.reviews.push(results.reviews);
                }
                if(results.photos)
                {
                    var k = -1;
                    
                    for(var i = 0 ;i< 4 && i<results.photos.length ;i++)
                    {
                        self.DataFactory.photos.push([]);
                        k = k+1;
                        for(var j = i ;j<results.photos.length;j=j+4)
                        {
                            self.DataFactory.photos[k].push({url:results.photos[j].getUrl({'maxWidth': 262}), fullSizeUrl:results.photos[j].getUrl({'maxWidth': results.photos[j].width})});
                            
                        }
                    }
                }
                console.log(self.DataFactory.photos);
                if(self.DataFactory.placeDetails.price_level !==undefined) 
                    self.DataFactory.placeDetails.price_level = Array(self.DataFactory.placeDetails.price_level+1).join("$")
                
            }
			
            
        }
        if (self.DataFactory.selectedPlace)
        {
            
           
            
            self.DataFactory.placeDetails = null;
            var request = {
                placeId: self.DataFactory.selectedPlace.place_id
            };
			console.log("Reached Here Too"+self.DataFactory.startAnimation);
            self.detailsService = new google.maps.places.PlacesService(document.getElementById("randomDiv"));
			self.CommonFactory.showProgressBarCallback();
            setTimeout(function () {
                
                console.log("Reached Here "+self.DataFactory.startAnimation);
                
            
                self.DataFactory.startAnimation = true;
                self.detailsService.getDetails(request, self.detailsSearchCallback);
			 });
            
        }
		
    }
})();

