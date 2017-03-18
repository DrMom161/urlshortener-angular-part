angular.module('urlShortener', [])
    .controller('UrlShortenerController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
        $scope.successMessage = '';
        $scope.errorMessage = '';
        $scope.longUrl = '';
        $scope.shortUrl = '';
        $scope.submitForm = function () {
            //clear messages
            $scope.successMessage = '';
            $scope.errorMessage = '';
            //submit form
            $http({
                method: 'POST',
                url: 'https://obscure-beyond-70161.herokuapp.com/create_short_url',
                data: {
                    longUrl: $scope.longUrl,
                    shortUrl: $scope.shortUrl
                }
            })
            .then(function (response) {
                $scope.successMessage = '';
                $scope.errorMessage = '';
                if (response.data.hasError === false) {
                    $scope.successMessage = response.data.data.shortUrl;
                } else {
                    var errorList = {
                      is_exists_short_url: 'Short url already exists.',
                      empty_long_url: '"Long url" can not be empty.',
                      invalid_long_url: '"Long url" must be valid url.',
                      to_long_short_url:'"Short url" length can not be more then 10 symbols.'
                    },
                    errors = [];
                    response.data.errors.forEach(function(errorCode){
                      if(errorList[errorCode]){
                        errors.push(errorList[errorCode]);
                      }
                    });
                    $scope.errorMessage = $sce.trustAsHtml(errors.join('<br>'));

                }
            }, function (error) {
                $scope.errorMessage = error.statusText;
            });
        };
    }]);
