window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");

    var controls = document.querySelector(".controls");
    var playButton = document.querySelector("#play");
    var pauseButton = document.querySelector("#pause");

    var elapsed = document.querySelector("#elapsed");


    var g = canvas.getContext("2d");

    video.addEventListener("timeupdate", function () {
        elapsed.style.width = Math.ceil(video.currentTime * 320 / video.duration) + "px";
    });

    video.addEventListener("play", function () {
        controls.classList.add("playing");
        controls.classList.remove("paused");
    });

    video.addEventListener("pause", function () {
        controls.classList.remove("playing");
        controls.classList.add("paused");
    });

    playButton.addEventListener("click", function () {
        video.play();
        drawSomething(playButton);
    });


    pauseButton.addEventListener("click", function () {
        video.pause();
        drawSomething(pauseButton);
    });


    function drawSomething(image) {

        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var size = Math.max((canvas.height) * Math.random(), 40);
        g.drawImage(image, x, y, size, size);
    }


    // TODO: Call drawSomething for every frame so the video plays smoothly

});