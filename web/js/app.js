// CSV Reader
var reader = new FileReader();
var fnialSearches;
reader.onload = function(e) {
	finalSearches = reader.result.replace(/\n/g, ",");
	$("#mainText").val(finalSearches).trigger("change");
}

//Angulr Module
angular.module("api-ui", []).controller("ajaxResults", function($scope, $http) {
	   $scope.search = {
				seperateTerms : function(terms) {
					return terms.split(",");
				}
	  	}

	  	$scope.myData = {
				responses: 0,
				fromServer:{},
				url:{
					queryParam: ""
				}
			}

		$scope.update = function() {
			console.log("Updated");
		}

		$scope.myData.getData = function(item, event) {
			$scope.myData.fromServer = {};
			t = $scope.search.term ? $scope.search.term : finalSearches;
			if(t.length > 0){
				
				var searchTerms = $scope.search.seperateTerms(t);
				var responsePromise = {};
					
				for (var i = 0; i < searchTerms.length; i++) {
					$scope.myData.url.queryParam = "?q="+searchTerms[i].trim();
					console.log($scope.myData.url.queryParam);
					
					responsePromise[i] = $http.get("/api/earthlink/"+$scope.myData.url.queryParam);

					  responsePromise[i].success(function(data, status, headers, config) {
						$scope.myData.fromServer[$scope.myData.responses] = data.results;
						$scope.myData.responses++;
					   });

					  responsePromise[i].error(function(data, status, headers, config) {
						alert("AJAX failed!");
					  });

					  console.log($scope.myData.fromServer);
				}
  
			  }
		}
});