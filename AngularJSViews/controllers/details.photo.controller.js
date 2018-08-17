(function ()
{
    'use strict';

    angular
         .module("TES.Controllers")
          .controller('TESDetailsPhotoController', ['$q', '$scope', '$state', '$location','GoogleService','DataFactory','CommonFactory', TESDetailsPhotoController]);

    function TESDetailsPhotoController($q, $scope, $state, $location,GoogleService,DataFactory,CommonFactory)
    {
        var self = this;
        self.DataFactory = DataFactory;
		self.DataFactory.prevState = "photos";
		$('#photoTab').tab('show');
		setTimeout(function () {
			if(self.DataFactory.startAnimation == false)
				self.DataFactory.startAnimation  = true;
		});
    }
})();

