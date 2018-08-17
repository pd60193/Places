(function ()
{
    'use strict';

    angular.module("TES.Controllers", []);
    angular.module("TES.Services", []);
    angular.module("TES.Factories", []);

    var app = angular.module('TES', ['ui.router','ngAnimate', 'TES.Controllers', 'TES.Services', 'TES.Factories']);
  	app.filter('nospace', function () {
  	    return function (value) {
  	        return (!value) ? '' : value.replace(/ /g, '');
  	    };
  	});
   
    app.directive('selectedDir', function () {
    return {
          restrict: 'A',
          scope: {
              'selected': '='
          },
          link: function (scope, element, attrs) {
              scope.$watch('selected', function(condition){
                  if(scope.selected){
                      element.css('background-color', '#FDDE9B');
                  }
              });
          }
      }
    });
    app.directive("rateYo", function() {
    return {
        restrict: "E",
        scope: {
            rating: "=",
            normalcolor: "="
        },
        template: "<span id='rateYo'></span>",
        link: function( scope, ele, attrs ) {
            
            var numStars = parseInt(scope.rating);
            if(scope.rating != parseFloat(numStars))
              numStars = numStars+1;
            $(ele).rateYo({
                rating: scope.rating*5/numStars,
                starWidth: "15px", 
                readOnly: true  ,
                normalFill: "#"+scope.normalcolor,
                numStars:  numStars    
            });
        }
      };
    });

    app.directive("favStar", function() {
    return {
        restrict: "E",
        scope: {
            setfav: "=",
            displayif: "="
        },
        template: "<i  class='fas fa-star'></i>",
// "<span id='favStar'></span>",
        link: function( scope, ele, attrs ) {
            scope.$watch('displayif', function(value) {
               
                  if(scope.displayif == null || scope.displayif==true)
                  {
                    ele.css("display","inline-block");
                    ele.css("display","0px");
                  }
                  else 
                  {
                    
                    ele.css("display","none");
                    ele.css("display","0px");
                  }
              
            });
            scope.$watch('setfav', function(value) {
               
                  if(scope.setfav == null || scope.setfav==false)
                  {
                    ele.css("-webkit-text-stroke", "black");
                    ele.css("-webkit-text-stroke-width","1px");
                    ele.css("color","white");
                  }
                  else 
                  {
                    ele.css("-webkit-text-stroke", "black");
                    ele.css("-webkit-text-stroke-width","0px");
                    ele.css("color","#ffc107");
                  }
              
            });
            if(scope.displayif == null || scope.displayif==true)
            {
              ele.css("display","inline-block");
              ele.css("display","0px");
            }
            else 
            {
              
              ele.css("display","none");
              ele.css("display","0px");
            }
            // var numStars = parseInt(scope.rating);
            // if(scope.rating != parseFloat(numStars))
            //   numStars = numStars+1;
            // $(ele).rateYo({
            //     rating: ((scope.setfav == true)?5:0),
            //     starWidth: "18px", 
            //     numStars:  1,
            //     fullStar: true,
            //     normalFill: "#FFFFFF"
              
            // });
            
        }
      };
    });
	
	
})();
