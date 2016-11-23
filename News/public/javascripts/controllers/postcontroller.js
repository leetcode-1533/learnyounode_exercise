/**
 * Created by y1275963 on 11/14/16.
 */
app.controller('PostCtrl', [
    '$scope',
    '$stateParams',
    'posts_factory',
    function($scope, $stateParams, posts_factory){
        $scope.post = posts_factory.posts[$stateParams.id];
        
        $scope.addComment = function(){
            if(!$scope.body) {
                return;
            }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }
]);