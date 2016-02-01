angular.module('myApp', ['ngRoute', 'myApp.services', 'myApp.controllers'])
.value('awsConfig', {
    awsRegion: 'us-east-1',
    awsBucketNamePhotography: 'nabinmulepatidotcom-photography',
    awsBucketNameHeroImages: 'nabinmulepatidotcom-cover',
    awsBucketThumbFolderName: 'thumb',
    awsS3BaseUrl: 'http://s3.amazonaws.com',
    awsReadOnlyAccessId: 'AKIAIGW6A4ERBHEHL4YQ',
    awsReadOnlyAccessSecret: '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'
})
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller:'PhotographyController',
        templateUrl:'photography.html'
    })
    .otherwise({
        redirectTo:'/'
    });
});
