window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var webcam = document.querySelector("#webcam");
    var king = document.querySelector("#king");
    var canvas = document.querySelector("canvas");
    var bufferCanvas = document.querySelector("#buffercanvas");

    // Is the video playing ?
    var playing = false;

    var error = document.querySelector(".error");

    var targetColor = {red: 0, green: 255, blue: 0};
    var targetColorDiv = document.querySelector(".target");
    var targetColorText = document.querySelector(".targettext");


    function animationLoop() {

        g.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        bg.drawImage(king, 0, 0, canvas.width, canvas.height);

        var imageData = g.getImageData(0, 0, canvas.width, canvas.height);

        var pixels = imageData.data;

        var kingPixels = bg.getImageData(0, 0, canvas.width, canvas.height).data;


        var numMatchingPixels = 0;

        for (var i = 0; i < pixels.length; i += 4) {

            // Get each color value (0-255)
            var red = pixels[i];
            var green = pixels[i + 1];
            var blue = pixels[i + 2];


            // Calculate the color difference
            var diff = Math.sqrt(Math.pow(targetColor.red - red, 2)
                + Math.pow(targetColor.green - green, 2)
                + Math.pow(targetColor.blue - blue, 2));


            // TODO: Replace matching pixels with corresponding pixels from kingPixels

            // Count this pixel if matching
            numMatchingPixels++;

        }

        g.putImageData(imageData, 0, 0);

        if (numMatchingPixels > 1000) {
            if (!playing) {
                king.play();
                playing = true;
            }
        } else {
            // The post-it was removed
            // TODO: If the video is playing, pause it

        }

        window.requestAnimationFrame(animationLoop);
    }


    updateTargetColor(targetColor);


    var g = canvas.getContext("2d");

    var bg = bufferCanvas.getContext("2d");

    window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(getUserMediaSuccess)
        .catch(userMediaFailed);


    function getUserMediaSuccess(stream) {
        webcam.src = window.URL.createObjectURL(stream);
        webcam.play();
    }

    function userMediaFailed(err) {
        error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
        error.classList.remove("hide")
    }


    canvas.addEventListener("click", function (e) {


        var x = e.layerX;
        var y = e.layerY;

        g.drawImage(webcam, 0, 0, canvas.width, canvas.height);

        var imageData = g.getImageData(x, y, 1, 1);

        var pixels = imageData.data;

        updateTargetColor({red: pixels[0], green: pixels[1], blue: pixels[2]});

    });

    function updateTargetColor(col) {
        targetColor = col;
        var backgroundColor = "rgba(" + col.red + ", " + col.green + ", " + col.blue + ", 255)";
        targetColorDiv.style.backgroundColor = backgroundColor;
        targetColorText.textContent = backgroundColor;
    }

    window.requestAnimationFrame(animationLoop);

});