(function ()
{
    'use strict';

    angular
        .module('TES.Factories')
            .factory('CommonFactory', ['$rootScope', CommonFactory]);

    function CommonFactory($rootScope)
    {
        return {
            showProgressBar: function (promise, message)
            {
                if (promise.then && promise.$$state.status == 0)
                {
                    $rootScope.displayLoader = true;
                    $rootScope.valuenow = 50;
                    return promise
                          .then(function (success)
                          {
                            $rootScope.valuenow = 100;
                            $rootScope.displayLoader = false;
                          }, function (error)
                          {
                            $rootScope.valuenow = 100;
                            $rootScope.displayLoader = false;
                          });
                }
            },
            showProgressBarCallback: function()
            {
              $rootScope.valuenow = 50;
              $rootScope.displayLoader = true;
              
            },
            hideProgressBarCallback: function()
            {
              $rootScope.valuenow = 100;
              $rootScope.displayLoader = false;
              
            }
        };
    }
})();