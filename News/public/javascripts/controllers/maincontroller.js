/**
 * Created by y1275963 on 11/14/16.
 */
app.controller("Controller", [
    '$scope',
    'posts_factory',
    function($scope, posts_factory){
        $scope.posts = posts_factory.posts;

        $scope.addPost = function(){
            if(!$scope.title || $scope.title=== ' '){return};
            posts_factory.create({
                title: $scope.title,
                upvote: 0,
                link: $scope.link,
            });
            $scope.title = "";
            $scope.link ="";
        }
        $scope.incrementUpvotes = function(post) {
            post.upvote += 1;
        }
    }
]);