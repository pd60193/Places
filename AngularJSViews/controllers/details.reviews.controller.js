(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESDetailsReviewsController', ['$q', '$scope', '$state', '$location','DataFactory','CommonFactory','YelpService', TESDetailsReviewsController]);

    function TESDetailsReviewsController($q, $scope, $state, $location,DataFactory,CommonFactory,YelpService)
    {
        var self = this;
        self.DataFactory = DataFactory;
		self.reviewTypes = ['Google Reviews','Yelp Reviews'];
		self.reviewOrders = ['Default Order','Highest Rating','Lowest Rating','Most Recent','Least Recent'];
		self.YelpService = YelpService;
		self.fillColor = "FFFFFF";
		self.DataFactory.prevState ="reviews";
		$('#reviewTab').tab('show');
		self.initReviews = function()
		{
			self.currentReviewType = reviewTypes[0];
			self.currentOrderType = reviewOrders[0];
		}
		
		self.changeReviewType = function(val)
		{
			console.log(val);
			self.currentReviewType = val;
			if(self.currentReviewType == self.reviewTypes[1] && self.DataFactory.reviews.length<2 && self.yelpReviewPromise)
			{
				self.yelpReviewPromise.then(function(response){
					console.log(response);
					if(response && response.status== 200 && response.data && response.data.reviews && response.data.reviews.length >0)
					{
						self.DataFactory.reviews.push(response.data.reviews);
					}
					else
						self.DataFactory.reviews.push([]);
				});
				
			}
				
		}
		self.comparer = function(review)
		{
			console.log(review);
			if(self.reviewTypes == 'Google Reviews')
			{
				if(self.currentOrderType == 'Highest Rating')
				{
					return -review.rating;
				}
				else if(self.currentOrderType == 'Lowest Rating')
				{
					return review.rating;
				}
				else if(self.currentOrderType == 'Most Recent')
				{
					return -review.time;
				}
				else if(self.currentOrderType == 'Least Recent')
				{
					return review.time;
				}
			}
		}
		self.setStar = function(rating,index)
		{
			
			$timeout(function() {
				$("#infoRatings"+index).rateYo({
			    	starWidth: "15px",
					rating:rating,
					numStars:parseInt(rating)+1
			  	});
       		});
		}
		self.changeOrderType = function(val)
		{
			//console.log(val);
			self.currentReviewOrder = val;
			if(val == 'Highest Rating')
			{
				self.currentOrderType= "-rating";
				return;
			}
			else if(val =='Lowest Rating')
			{
				self.currentOrderType="rating";
				return;
			}
			if(self.currentReviewType == 'Google Reviews')
			{
				
				if(val == 'Most Recent')
				{
					self.currentOrderType="-time";
					return;
				}
				else if(val =='Least Recent')
				{
					self.currentOrderType= "time";
					return;
				}
			}
			else
			{
				//console.log(moment("2018-02-21 16:24:07", "YYYY-MM-DD HH:mm:ss").format('x'));
				
				if(val == 'Most Recent')
				{
					self.currentOrderType = function(review)
					{
						//console.log(moment(review.time_created, "YYYY-MM-DD HH:mm:ss").format('x'));
						return -moment(review.time_created, "YYYY-MM-DD HH:mm:ss").format('x');
					}
					return;
				}
				else if(val =='Least Recent')
				{
					self.currentOrderType = function(review)
					{
						//console.log(moment(review.time_created, "YYYY-MM-DD HH:mm:ss").format('x'));
						return moment(review.time_created, "YYYY-MM-DD HH:mm:ss").format('x');
					}
					return;
				}
			}
			self.currentOrderType=null;
			//console.log(self.currentOrderType);
			
		}
		if(self.DataFactory.yelpRequest)
			self.DataFactory.yelpRequest.then(function(response)
	        {
				
	            if (response && response.status == 200 && response.data && response.data.businesses.length>0)
	            {
					
					self.yelpReviewPromise = self.YelpService.getYelpReviews({id:response.data.businesses[0].id});
	            }
	            else
					self.DataFactory.reviews.push([]);
				setTimeout(function () {if(self.DataFactory.startAnimation == false)
					self.DataFactory.startAnimation  = true;});
	        });
		else
		{
			setTimeout(function () {if(self.DataFactory.startAnimation == false)
				self.DataFactory.startAnimation  = true;});
		}
    }
})();

