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
                    $scope.errorMessage = $sce.trustAsHtml(response.data.errors.join('<br>'));
                }
            }, function (error) {
                $scope.errorMessage = error.statusText;
            });
        };
    }]);