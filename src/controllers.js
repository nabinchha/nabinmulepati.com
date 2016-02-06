angular.module('myApp.controllers', [])
.controller('PhotographyController', ['AWSService', '$scope', 'awsConfig',
    function(AWSService, $scope, awsConfig) {
        $scope.categories = [];
        $scope.photoLibrary = {};
        $scope.showProjection = false;
        $scope.currentCategoryIndex = 0;
        $scope.currentIndex = 0;

        $scope.startProjection = function(categoryIndex, imageIndex) {
            $scope.showProjection = true;
            $scope.currentCategoryIndex = categoryIndex;
            $scope.currentIndex = imageIndex;
            self.setImageProjection();
        };

        $scope.moveImageProjection = function(directionIsForward) {
            if (directionIsForward) {
                $scope.currentIndex += 1;
            } else {
                $scope.currentIndex -= 1;
            }

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
            self.setImageProjection();
        }

        self.setImageProjection = function() {
            url = $scope.photoLibrary[$scope.categories[$scope.currentCategoryIndex]].images[$scope.currentIndex];
            $('.projection-container').css({'background': 'url(' + url + ')'});
            $('.projection-container').css({'background-size':'contain'});
            $('.projection-container').css({'background-attachment':'scroll'});
            $('.projection-container').css({'background-position':'center center'});
            $('.projection-container').css({'background-repeat':'no-repeat'});
        };

        self.getFullImageUrl = function(category, key) {
            return awsConfig.awsS3BaseUrl + '/' + category + '/' + key;
        };

        self.getParentFolderFromPath = function(key) {
            parts = key.split('/')
            return parts[0];
        };

        self.isFolder = function(key) {
            if (key.slice(-1) == '/') {
                return true;
            } else {
                return false;
            }
        };

        self.isThumbPath = function(key) {
            if (key.indexOf(awsConfig.awsBucketThumbFolderName) > -1) {
                return true;
            } else {
                return false;
            }
        };

        self.loadHeroImage = function() {
            AWSService.getHeroImageUrl(function(urlResponse) {
                $('#intro').css({'background': 'url(' + urlResponse + ')'});
                $('#intro').css({'background-size':'cover'});
                $('#intro').css({'background-attachment':'fixed'});
                $('#intro').css({'background-position':'bottom center'});
                $('#intro').css({'background-repeat':'no-repeat'});
            });
        };

        self.loadPhotoLibrary = function() {
            AWSService.getItemsInBucket(awsConfig.awsBucketNamePhotography, function(items) {
                var library = {};
                var categories = [];
                for (i=0; i<items.length; ++i) {
                    var item = items[i];
                    var category = self.getParentFolderFromPath(item.Key);

                    if (self.isFolder(item.Key) == false) {
                        if ((category in library) == false) {
                            categories.push(category);
                            library[category] = {
                                images: [],
                                thumbnails: []
                            };
                        }

                        var imageUrl = self.getFullImageUrl(awsConfig.awsBucketNamePhotography, item.Key);
                        if (self.isThumbPath(item.Key)) {
                            library[category].thumbnails.push(imageUrl)
                        } else {
                            library[category].images.push(imageUrl)
                        }
                    }
                }
                $scope.photoLibrary = library;
                $scope.categories = categories;
                $scope.$apply();
            });
        };

        self.init = function() {
            self.loadHeroImage();
            self.loadPhotoLibrary();
        };

        self.init();
    }]);
