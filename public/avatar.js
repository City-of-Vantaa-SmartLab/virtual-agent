angular.module('virtualAgentApp', []).controller('AvatarController', function ($scope, $http) {
    var avatarElements = this;
    $scope.speechIn;
    
    $http.post("/app/").then(function(response){
        $scope.up = response.data;
    });
    avatarElements.avatarImage = function () {
        return "Image playing";
    };
    avatarElements.output = function () {
        if ($scope.speechIn == "start"){
        changePicture();
    }
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
    function changePicture(){
        alert("change picture");
        $('#avatarImage').css("color","black");
    }
});