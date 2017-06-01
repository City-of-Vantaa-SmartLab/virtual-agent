angular.module('virtualAgentApp', []).controller('AvatarController', function ($scope, $http) {
    
    responsiveVoice.speak("Hei, kuinka voin auttaa?", "Finnish Female");
    $scope.textInput = "text input";
    $scope.textOutput = "text output text output text output text output text output text output text output";
    animateDiv();
    $("#textInput").hide();
    $("#textOutput").hide();
    function upgrade() {
        alert('Please use Google Chrome for best experience');
    }
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
    var avatarElements = this;
    var socket = io.connect('http://localhost');
    var socket = io.connect('https://conversation-server.eu-de.mybluemix.net');
    socket.on("fromWatson", function (msg) {
        console.log(msg);
        $scope.textOutput = msg;
    });
    socket.on("connection", function (msg) {
        console.log("connection");
        alert("connection");
    });
    socket.on("disconnect", function (msg) {
        console.log("disconnect");
        alert("disconnect");
    });
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
        redAnimation(data);
        console.log(data);
        socket.emit("speechIn", data);
        socket.on("speechOut", function (msg) {
            console.log(msg);
            responsiveVoice.speak(msg, "Finnish Female");
            $scope.textInput = data;
            $scope.textOutput = msg;
            $("#textOutput").show("slide", {
            direction: "down"
        }, 1000);
            $scope.$apply();
            $("#textInput").show("slide", {
            direction: "right"
        }, 1000);
        });   
        $scope.speechIn = "";
    }
});

function makeNewPosition() {
    // Get viewport dimensions (remove the dimension of the div)
    var h = 150;
    var w = 200;
    var nh = Math.floor(Math.random() * h) + 300;
    var nw = Math.floor(Math.random() * w) + 500;
    return [nh, nw];
}

function animateDiv() {
    var newq = makeNewPosition();
    var oldq = $('#animation').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    $('#animation').animate({
        top: newq[0]
        , left: newq[1]
    }, speed, function () {
        animateDiv();
    });
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = 0.1;
    var speed = Math.ceil(greatest / speedModifier);
    return speed;
}