angular.module('myApp.controllers', [])
.controller('PhotographyController', ['AWSService', '$scope', 'awsConfig',
    function(AWSService, $scope, awsConfig) {
        $scope.photoLibrary = {};
        $scope.test = 0;
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
                for (i=0; i<items.length; ++i) {
                    var item = items[i];
                    var category = self.getParentFolderFromPath(item.Key);

                    if (self.isFolder(item.Key) == false) {
                        if ((category in library) == false) {
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
                $scope.$apply();
            });
        };

        self.init = function() {
            self.loadHeroImage();
            self.loadPhotoLibrary();
        };

        self.init();
    }]);
