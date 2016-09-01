window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");

    var error = document.querySelector(".error");


    var g = canvas.getContext("2d");


    function animationLoop() {

        g.drawImage(video, 0, 0, canvas.width, canvas.height);
        var imageData = g.getImageData(0, 0, canvas.width, canvas.height);

        var pixelColors = imageData.data;

        // pixelColors is an array color components: [red, green, blue, alpha, red, green, blue, alpha, ..]
        // So, let's iterate over every 4th component:

        for (var i = 0; i < pixelColors.length; i += 4) {

            // Get each color value (0-255)
            var red = pixelColors[i];
            var green = pixelColors[i + 1];
            var blue = pixelColors[i + 2];


            // Calculate the average value  of the color components
            var avg = (red + green + blue) / 3;


            // Make every second (of 5) stripe black / white
            // TODO: Replace below with your solution!
            var y = Math.floor(i / 4 / canvas.width);

            if (Math.floor(y / canvas.height * 5) % 2 == 0) {
                // Set each color to the average ("black & white")
                pixelColors[i] = avg;
                pixelColors[i + 1] = avg;
                pixelColors[i + 2] = avg;
            }
        }
        g.putImageData(imageData, 0, 0);

        window.requestAnimationFrame(animationLoop);
    }


    window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(getUserMediaSuccess)
        .catch(userMediaFailed);


    function getUserMediaSuccess(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }

    function userMediaFailed(err) {
        error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
        error.classList.remove("hide")
    }


    window.requestAnimationFrame(animationLoop);

});