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
            var _this = this;
            $http.post('/getCountries').success(function(data) {
                $scope.countries = data;
                $scope.country = data[0];
                $scope.$watch('country', function(newValue, oldValue) {
                    _this.changeCountry(newValue, oldValue);
                });
            });
        },
        changeCountry: function(newValue, oldValue){
            $http.post('/getCities', {countryId: newValue['_id_en_country']}).success(function(data) {
                $scope.cities = data;
                $scope.city = data[0];
            });
        }
    }).init();
}
