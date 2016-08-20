angular.module('myApp.services', [])
.service('AWSService', ['awsConfig', function(awsConfig) {
    this.getItemsInBucket = function(bucketName, callback) {
        var params = {
            Bucket: bucketName
        };
        var s3 = new AWS.S3({
            region: awsConfig.awsRegion,
            accessKeyId: awsConfig.awsReadOnlyAccessId,
            secretAccessKey: awsConfig.awsReadOnlyAccessSecret
        });

        s3.listObjects(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                callback(data.Contents);
            }
        });
    };
}])
.service('PhotoService', ['awsConfig', 'AWSService', function(awsConfig, AWSService) {
    this.getHeroImageUrl = function(callback) {
        AWSService.getItemsInBucket(awsConfig.awsBucketNameHeroImages, function(items){
            var randomIndex = Math.floor((Math.random() * items.length) + 1);
            var url = awsConfig.awsS3BaseUrl + '/' + awsConfig.awsBucketNameHeroImages + '/' + items[randomIndex-1].Key;
            callback(url);
        });
    };

    this.getPhotoLibrary = function(callback) {
        AWSService.getItemsInBucket(awsConfig.awsBucketNamePhotography, function(items) {
            var library = {};
            var categories = [];
            for (i=0; i<items.length; ++i) {
                var item = items[i];
                var category = getParentFolderFromPath(item.Key);

                if (isFolder(item.Key) == false) {
                    if ((category in library) == false) {
                        categories.push(category);
                        library[category] = {
                            images: [],
                            thumbnails: []
                        };
                    }

                    var imageUrl = getFullImageUrl(awsConfig.awsBucketNamePhotography, item.Key);
                    if (isThumbPath(item.Key)) {
                        library[category].thumbnails.push(imageUrl)
                    } else {
                        library[category].images.push(imageUrl)
                    }
                }
            }
            callback(categories, library);
        });
    };

    function getFullImageUrl(category, key) {
        return awsConfig.awsS3BaseUrl + '/' + category + '/' + key;
    }

    function getParentFolderFromPath(key) {
        var parts = key.split('/');
        return parts[0];
    }

    function isFolder(key) {
        return (key.slice(-1) == '/');
    }

    function isThumbPath(key) {
        return (key.indexOf(awsConfig.awsBucketThumbFolderName) > -1);
    }
}]);
