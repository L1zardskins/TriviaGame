

var questionNumber = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var missedAnswers = 0;
var gameOver = false;
var rightAnswer = -1;
var selectedAnswer = "";
var intervalId;
var clockRunning = false;
var timerFlag = true;
var answerEval = "";
var timeUp = ""

var timer = {

    time: 0,
    lap: 1,

    reset: function (setTime) {

        timer.time = setTime;
        $(".timer").text(timeUp + setTime);

    },

    start: function () {

        //  TODO: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            clearInterval(this.time);
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
            $(".timer").html(timeUp + timer.time);
        }

    },
    stop: function () {

        if (clockRunning) {
            clockRunning = false;
            clearInterval(intervalId)
        }
        //  TODO: Use clearInterval to stop the count here and set the clock to not be running.

    },

    count: function () {

        timer.time--;
        //var converted = timer.timeConverter(timer.time)
        $(".timer").text(timeUp + timer.time);
        console.log(timer.time);
        // console.log(questionNumber)


        if (timer.time === 0) {
            console.log("ZERO!!!");
            timer.stop();
            if (timerFlag) {
                // questionNumber++;
                answerEval = "Time's Up!"
                timeUp = "Next Question: "
                checkAnswer();
                timerFlag = false;
            } else {
                timerFlag = true;
                questionNumber++;
                timeUp = "Time's Up In: "
                questionSetup();
            }


        }
        //  TODO: increment time by 1, remember we cant use "this" here.

        //  TODO: Get the current time, pass that into the timer.timeConverter function,
        //        and save the result in a variable.

        //  TODO: Use the variable you just created to show the converted time in the "display" div.

    },
}

//questions

var questions = [{
    question: "Where was the first known use of the beer 'IPA' (India pale ale)?",
    answer: "Sydney, Austrailia",
    answerChoices: ["London, England", "Salt Lake City, Utah", "Sydney, Austrailia", "Mumbai, India"],
}, {
    question: "What is the typical alcohol content of the Double IPAs (also referred to as Imperial IPAs)?",
    answer: "7.5%",
    answerChoices: ["3.5%", "7.5%", "5%", "9.5%"],
}, {
    question: "True or False, IPAs have a higher alcahol content to survive the journey from England to India?",
    answer: "False",
    answerChoices: ["True", "False"],
}, {
    question: "During the brewing process is the Male or Female part of the plant used?",
    answer: "Female",
    answerChoices: ["Male", "Female"],
}, {
    question: "How many carbs are in IPAs?",
    answer: "Who the eff cares?! Get me a beer!",
    answerChoices: ["8", "10", "Who the eff cares?! Get me a beer!", "32"],
}, {
    question: "What is Riley's Favorite IPA???",
    answer: "Hop Rising",
    answerChoices: ["Elephino", "Hop Rising", "Hop Nosh", "Dubhe Imperial Black"],
}
];

$(document).ready(function () {

    //click answer
    $("#ans").on("click", function () {
        selectedAnswer = $("input:radio[name=answer]:checked").val()
        console.log(selectedAnswer);
        timerFlag = false;
        checkAnswer();
        timeUp = "Next Question: "
        $(".timer").html(timeUp + timer.time);
    });

});

function setUpGame() {

    var a = $("<h1>");
    a.text("Get Ready To Play!!");

    var b = $("<button>");
    b.attr("type", "button");
    b.attr("class", "btn btn-success start");
    b.text("START");

    $(".startGame").append(a);
    $(".startGame").append(b);


}

function startGame() {
    correctAnswers = 0;
    wrongAnswers = 0;
    missedAnswers = 0;
    gameOver = false;
    $(".startGame").empty();
    timeUp = "Time's Up In: "
    timer.reset(10);
    timer.start();
    $(".timer").text("Time's Up In: 10");
    console.log(timer.time)
    questionSetup();
};

function questionSetup() {
    if (questionNumber === questions.length) {
        console.log(questionNumber);
        endGame();
    } else {
        timer.reset(10);
        timer.start();
        selectedAnswer = ""

        $(".answerCheck").empty();
        $(".question").empty();
        $("#ans").empty();

        $(".question").append("<h1>Question:</h1>");

        var b = $("<h3>");
        b.attr("id", "questionText");
        b.text(questions[questionNumber].question);
        $(".question").append(b);
        console.log(questions[questionNumber].question)

        var t = $("<h1>")
        t.attr("class", "timer")
        //$(".timer").html(converted);
        $(".question").append(t);
        $(".timer").text("Time's Up In: 10");

        for (let i = 0; i < questions[questionNumber].answerChoices.length; i++) {
            var a = $("<input>");
            a.attr("type", "radio");
            a.attr("name", "answer");
            // a.attr("id", "answer");
            a.attr("value", questions[questionNumber].answerChoices[i]);
            // a.text(questions[questionNumber].answerChoices[i]);
            console.log(a)
            $("#ans").append(a);
            $("#ans").append(" " + questions[questionNumber].answerChoices[i]);
            $("#ans").append("<br>");
        }
    }
};

function displayAnswer() {
    // checkAnswer();

};

function checkAnswer() {

    if (selectedAnswer === questions[questionNumber].answer) {
        $("#ans").empty();
        answerEval = "Correct!!"
        $(".answerCheck").append("<h1>" + answerEval + "</h1>");
        console.log("correct")
        timer.reset(5);
        timer.start();
        correctAnswers++;
    } else if (selectedAnswer != "") {
        $("#ans").empty();
        answerEval = "INCORRECT!!"
        $(".answerCheck").append("<h1>" + answerEval + "</h1>");
        $(".answerCheck").append("<h3>The Correct Answer Is: " + questions[questionNumber].answer + "</h3>");

        timer.reset(5);
        timer.start();
        wrongAnswers++;
        // console.log("wrong");
        // console.log("<h3>The Correct Answer Is: " + questions[questionNumber].answer + "</h3>");
    } else {
        $("#ans").empty();
        answerEval = "TIME'S UP!!"
        $(".answerCheck").append("<h1>" + answerEval + "</h1>");
        $(".answerCheck").append("<h3>The Correct Answer Is: " + questions[questionNumber].answer + "</h3>");
        timer.reset(5);
        timer.start();
        missedAnswers++;
    }
    var img = $("<img>");
    img.attr("src", "assets/images/" + questionNumber + ".png");
    img.attr("alt", "BEER!");
    $(".answerCheck").append(img)
    console.log(img)

};

function endGame() {
    $(".answerCheck").empty();
    $(".question").empty();
    $("#ans").empty();
    console.log("cleared Out!")
    var a = $("<h1>");
    a.text("Good Job!!");



    var b = $("<button>");
    b.attr("type", "button");
    b.attr("class", "btn btn-success start");
    b.text("Go Again!");

    $(".startGame").append(a);
    $(".startGame").append(b);
    $(a).append("<p>Correct: " + correctAnswers + "</p>")
    $(a).append("<p>Incorrect: " + wrongAnswers + "</p>")
    $(a).append("<p>Missed: " + missedAnswers + "</p>")
    questionNumber = 0;

    console.log("missed: " + missedAnswers);
    console.log("correct: " + correctAnswers);
    console.log("wrong: " + wrongAnswers);
}

// window.onload = function () {

//     //  Click events are done for us:
//     $("#lap").click(timer.recordLap);
//     $("#stop").click(timer.stop);
//     $("#reset").click(timer.reset);
//     $("#start").click(timer.start);
// };

$(document).on("click", ".start", startGame)