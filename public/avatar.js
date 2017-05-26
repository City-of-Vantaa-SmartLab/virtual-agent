angular.module('virtualAgentApp', []).controller('AvatarController', function ($scope, $http) {
    var avatarElements = this;
    $scope.speechIn;
    $http.post("/app/").then(function (response) {
        $scope.up = response.data;
    });
    avatarElements.avatarImage = function () {
        
    };
    
    avatarElements.main = function () {
        if ($scope.speechIn == undefined) {
            whiteAnimation();
            responsiveVoice.speak("Hei, kuinka voin auttaa?","Finnish Female");   
        }
        if ($scope.speechIn == "red") {
            responsiveVoice.speak("en ymmärtänyt","Finnish Female");      
            redAnimation();
            $scope.speechIn = "";
        }
        if ($scope.speechIn == "blue") {
            blueAnimation();
            responsiveVoice.speak("tänään ohjelmassa sitä sun tätä","Finnish Female");
            $scope.speechIn = "";
        }
        if ($scope.speechIn == "green") {
            greenAnimation();
            responsiveVoice.speak("ymmärsin, mitä tarkoitat","Finnish Female");
            $scope.speechIn = "";
        }
        if ($scope.speechIn == "white") {
            whiteAnimation();
            responsiveVoice.speak("palasin takaisin alkutilaan","Finnish Female");
            $scope.speechIn = "";
        }
        else {
            console.log($scope.speechIn);
        }
    };
    avatarElements.input = function () {
        return "Input Here";
    };

    function reverse(s) {
        return s.split("").reverse().join("");
    }

    function redAnimation() {
        $('#avatarAnimation').css('background', 'url("./red.gif") no-repeat');
        $('#avatarAnimation').css('background-size', '100% auto');
    }

    function blueAnimation() {
        $('#avatarAnimation').css('background', 'url("./blue.gif") no-repeat center');
        $('#avatarAnimation').css('background-size', '100% auto');
    }

    function greenAnimation() {
        $('#avatarAnimation').css('background', 'url("./green.gif") no-repeat center');
        $('#avatarAnimation').css('background-size', '100% auto');
    }

    function whiteAnimation() {
        $('#avatarAnimation').css('background', 'url("./white.gif") no-repeat center');
        $('#avatarAnimation').css('background-size', '100% auto');
    }
    
});