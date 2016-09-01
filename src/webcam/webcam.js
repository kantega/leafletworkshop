window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");

    var error = document.querySelector(".error");

    var snapshots = document.querySelector("#snapshots")

    var stick_down = new Image();
    stick_down.src = "stick.png";

    var stick_up = new Image();
    stick_up.src = "stick_up.png";

    var stick = stick_down;

    var g = canvas.getContext("2d");


    // See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function (stream) {

            // TODO: Attach the stream to the video, start playing


        })
        .catch(function (err) {
            error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
            error.classList.remove("hide")
        });


    function animationLoop() {
        // Clear the canvas
        g.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the selfie stick image
        g.drawImage(stick, 0, 0, canvas.width, canvas.width);
        g.save()

        // Translate, scale and rotate the graphics context
        // TODO: Change this to draw on the phone's screen
        g.translate(canvas.width * 2 / 3, canvas.height / 4);
        g.scale(0.3, 0.3);
        g.rotate(-Math.PI / 10);

        // Draw the video onto the canvas
        g.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw a rect outlining the video
        g.strokeStyle = "darkmagenta";
        g.strokeWidth = 3;
        g.rect(0, 0, canvas.width, canvas.height);
        g.stroke();
        g.restore();
        window.requestAnimationFrame(animationLoop);
    }


    window.requestAnimationFrame(animationLoop);


    canvas.addEventListener("mouseenter", function () {
        stick = stick_up;
    });

    canvas.addEventListener("mousemove", function () {
        stick = stick_up;
    });

    canvas.addEventListener("mouseleave", function () {
        stick = stick_down;
    });

    canvas.addEventListener("mousedown", function (e) {

        e.preventDefault()
        g.clearRect(0, 0, canvas.width, canvas.height);
        g.drawImage(video, 0, 0, canvas.width, canvas.height);

        var image = document.createElement("img");
        image.src = canvas.toDataURL();
        image.width = canvas.width / 3;
        image.height = canvas.height / 3;

        snapshots.insertBefore(image, snapshots.firstChild);

        stick = stick_down;
        setTimeout(function () {
            stick = stick_up;
        }, 200)
    });

});