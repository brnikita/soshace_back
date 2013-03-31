function AddPost($scope, $http){
    $scope.submit = function(){
        var postData = {};
        if(this.plTitle){
            postData.title = this.plTitle;
        }
        if(this.plDescription){
            postData.description = this.plDescription;
        }
        $http.post('/save_post', postData);
    }
}
function Index($scope, $http){
    ({
        init: function(){
            var T = this;
            $http.post('/getCountries').success(function(data) {
                $scope.countries = data;
                $scope.country = data[0];
                $scope.$watch('country', function(newValue, oldValue) {
                    T.changeCountry(newValue, oldValue);
                });
            });
        },
        changeCountry: function(newValue, oldValue){
            var T = this;
            console.log('changeCountry', newValue);
            $http.post('/getCities', {countryId: newValue._id}).success(function(data) {
                $scope.cities = data;
                $scope.city = data[0];
            });
        }
    }).init();
}
