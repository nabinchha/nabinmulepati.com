angular.module('myApp.controllers', [])
.controller('PhotographyController', ['PhotoService', '$scope',
    function(PhotoService, $scope) {
        $scope.categories = [];
        $scope.photoLibrary = {};
        $scope.showProjection = false;
        $scope.currentCategoryIndex = 0;
        $scope.currentIndex = 0;

        $scope.startProjection = function(categoryIndex, imageIndex) {
            $scope.showProjection = true;
            $scope.currentCategoryIndex = categoryIndex;
            $scope.currentIndex = imageIndex;
            self.projectImageWithUrl(self.getCurrentImageUrl());
        };

        $scope.moveImageProjection = function(directionIsForward) {
            $scope.currentIndex = (directionIsForward) ? $scope.currentIndex + 1 : $scope.currentIndex - 1;

            if ($scope.currentIndex < 0) {
                if ($scope.currentCategoryIndex > 0) {
                    $scope.currentCategoryIndex -= 1;
                    $scope.currentIndex = $scope.photoLibrary[$scope.categories[$scope.currentCategoryIndex]].images.length-1
                } else {
                    $scope.currentIndex = 0;
                }
            }

            if ($scope.currentIndex >= $scope.photoLibrary[$scope.categories[$scope.currentCategoryIndex]].images.length) {
                if ($scope.currentCategoryIndex < $scope.categories.length-1) {
                    $scope.currentCategoryIndex += 1;
                    $scope.currentIndex = 0;
                } else {
                    $scope.currentIndex -= 1;
                }
            }
            self.projectImageWithUrl(self.getCurrentImageUrl());
        };

        $scope.onKeyDown = function ($event) {
            var keyCode = (window.event ? $event.keyCode : keyEvent.which);
            if (keyCode == 37) {
                $scope.moveImageProjection(false);
            } else if(keyCode == 39) {
                $scope.moveImageProjection(true);
            }
        };

        self.getCurrentImageUrl = function() {
            return $scope.photoLibrary[$scope.categories[$scope.currentCategoryIndex]].images[$scope.currentIndex];
        };

        self.projectImageWithUrl = function(imageUrl) {
            self.setImageBackground('.projection-container', 'contain', imageUrl);
        };

        self.setImageBackground = function(selector, backgroundSize, imageUrl) {
            $(selector).css({'background': 'url(' + imageUrl + ')'});
            $(selector).css({'background-size': backgroundSize});
            $(selector).css({'background-position': 'center center'});
            $(selector).css({'background-repeat': 'no-repeat'});
        };

        self.loadHeroImage = function() {
            PhotoService.getHeroImageUrl(function(imageUrl) {
                self.setImageBackground('#intro', 'cover', imageUrl);
            });
        };

        self.loadPhotoLibrary = function() {
            PhotoService.getPhotoLibrary(function(categories, library) {
                $scope.categories = categories;
                $scope.photoLibrary = library;
                $scope.$apply();
            });
        };

        self.init = function() {
            self.loadHeroImage();
            self.loadPhotoLibrary();
        };

        self.init();
    }]);
