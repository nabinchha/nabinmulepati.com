angular.module('myApp.services', [])
.service('AWSService', [ 'awsConfig',
function(awsConfig) {
    this.getHeroImageUrl = function(callback) {
        this.getItemsInBucket(awsConfig.awsBucketNameHeroImages, function(items){
            randomIndex = Math.floor((Math.random() * items.length) + 1);
            url = awsConfig.awsS3BaseUrl + '/' + awsConfig.awsBucketNameHeroImages + '/' + items[randomIndex-1].Key
            callback(url)
        });
    };

    this.getItemsInBucket = function(bucketName, callback) {
        var params = {
            Bucket: bucketName,
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
                callback(data.Contents)
            }
        });
    };
}]);
