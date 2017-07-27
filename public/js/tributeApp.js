var app = angular.module('tributeApp', ['ngResource']);


app.factory('postService', function($resource) {
    return $resource('/api/posts/:id');
});

app.controller('mainController', function($scope, postService) {
    $scope.posts = postService.query();
    $scope.newPost = { username: '', message: '', created_at: '' };



    $scope.post = function() {
        $scope.newPost.created_at = Date.now();
        postService.save($scope.newPost, function() {
            $scope.posts = postService.query();
            $scope.newPost = { username: '', message: '', created_at: '' };
        });
    };
});