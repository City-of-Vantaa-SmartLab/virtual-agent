angular.module('todoApp', []).controller('AvatarController', function ($scope) {
    var avatarElements = this;
    $scope.speechIn;
    avatarElements.avatarImage = function () {
        return "Image playing";
    };
    avatarElements.output = function () {
        var input = $scope.speechIn + "";
        var output;
        output = reverse(input);
        return output;
    };
    avatarElements.input = function () {
        return "Input Here";
    };

    function reverse(s) {
        return s.split("").reverse().join("");
    }
});