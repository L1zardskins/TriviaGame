var timer = {

    time: 0,
    lap: 1,

    reset: function () {

        timer.time = 0;

    },

    start: function () {

        //  TODO: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            clearInterval(this.time);
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
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

        timer.time++;
        var converted = timer.timeConverter(timer.time)
        $("#display").html(converted);
        console.log(timer.time);
        //  TODO: increment time by 1, remember we cant use "this" here.

        //  TODO: Get the current time, pass that into the timer.timeConverter function,
        //        and save the result in a variable.

        //  TODO: Use the variable you just created to show the converted time in the "display" div.

    },
}