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
        if ($scope.speechIn == ""){
        whiteAnimation();
        }
        if ($scope.speechIn == "red"){
        redAnimation();
        }
        if ($scope.speechIn == "blue"){
        blueAnimation();
        }
        if ($scope.speechIn == "green"){
        greenAnimation();
        }
        if ($scope.speechIn == "white"){
        whiteAnimation();
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
    function redAnimation(){
        $('#avatarAnimation').css('background','url("./red.gif") no-repeat center');
    }
    function blueAnimation(){
        $('#avatarAnimation').css('background','url("./blue.gif") no-repeat center');
    }
    function greenAnimation(){
        $('#avatarAnimation').css('background','url("./green.gif") no-repeat center');
    }
    function whiteAnimation(){
        $('#avatarAnimation').css('background','url("./white.gif") no-repeat center');
    }
});