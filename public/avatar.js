angular.module('virtualAgentApp', []).controller('AvatarController', function ($scope, $http) {
    function upgrade() {
        alert('Please use Google Chrome for best experience');
    }
    window.onload = function () {
        if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
            upgrade();
        }
        else {
            var recognizing;

            function reset() {
                console.log("Reset Recognizer");
                recognizing = false;
            }
            var speech = new webkitSpeechRecognition() || speechRecognition();
            var final_transcript = '';
            speech.continuous = true;
            speech.interimResults = true;
            speech.lang = 'fi'; // check google web speech example source for more lanuages
            speech.start(); //enables recognition on default
            speech.onstart = function () {
                // When recognition begins
                recognizing = true;
                redAnimation();
            };
            speech.onresult = function (event) {
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript;
                    }
                    else {
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
                if (final_transcript != "") {
                    blueAnimation();
                    speakBack(final_transcript);
                }
            };
            speech.onerror = function (event) {
                // Either 'No-speech' or 'Network connection error'
                console.error(event.error);
            };
            speech.onend = function () {
                // When recognition ends
                reset();
            };
        }
    };
    var avatarElements = this;
    var socket = io.connect('http://localhost');
    avatarElements.main = function () {
        if ($scope.speechIn == undefined) {
            whiteAnimation();
            responsiveVoice.speak("Hei, kuinka voin auttaa?", "Finnish Female");
        }
        if ($scope.speechIn == "red") {
            redAnimation();
            socket.emit($scope.speechIn);
            socket.on("response", function (msg) {
                console.log(msg);
                responsiveVoice.speak(msg, "Finnish Female");
            });
            $scope.speechIn = "";
        }
        if ($scope.speechIn == "blue") {
            blueAnimation();
            responsiveVoice.speak("tänään ohjelmassa sitä sun tätä", "Finnish Female");
            $scope.speechIn = "";
        }
        if ($scope.speechIn == "green") {
            greenAnimation();
            $scope.speechIn = "";
        }
        if ($scope.speechIn == "white") {
            whiteAnimation();
            responsiveVoice.speak("palasin takaisin alkutilaan", "Finnish Female");
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
        responsiveVoice.speak("ymmärsin, mitä tarkoitat", "Finnish Female");
    }

    function whiteAnimation() {
        $('#avatarAnimation').css('background', 'url("./white.gif") no-repeat center');
        $('#avatarAnimation').css('background-size', '100% auto');
    }

    function speakBack(data) {
        redAnimation();
        socket.emit(data);
        socket.on("response", function (msg) {
            console.log(msg);
            responsiveVoice.speak(msg, "Finnish Female");
        });
        $scope.speechIn = "";
    }
});