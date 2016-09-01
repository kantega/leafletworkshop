window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");

    var error = document.querySelector(".error");

    var targetColor = {red: 0, green: 255, blue: 0};
    var targetColorDiv = document.querySelector(".target");
    var targetColorText = document.querySelector(".targettext");

    updateTargetColor(targetColor);


    var g = canvas.getContext("2d");

    var constraints = {video: true, audio: false};

    window.navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        })
        .catch(function (err) {
            error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
            error.classList.remove("hide")
        });


    function animationLoop() {

        g.clearRect(0, 0, canvas.width, canvas.height);
        g.drawImage(video, 0, 0, canvas.width, canvas.height);

        var imageData = g.getImageData(0, 0, canvas.width, canvas.height);


        var pixels = imageData.data;

        // pixels is an array color components: [red, green, blue, alpha, red, green, blue, alpha, ..]
        // So, let's iterate over every 4th component:

        var leftMost = canvas.width;
        var topMost = canvas.height;
        var rightMost = 0;
        var bottomMost = 0;


        for (var i = 0; i < pixels.length; i += 4) {

            // Pixel index
            var p = i / 4;

            // Calculate X and Y positions
            var x = p % canvas.width;
            var y = Math.floor(p / canvas.width);

            // Get each color value (0-255)
            var red = pixels[i];
            var green = pixels[i + 1];
            var blue = pixels[i + 2];


            // Calculate the difference between actual and target color in 3D vector space
            var diff = Math.sqrt(Math.pow(targetColor.red - red, 2)
                + Math.pow(targetColor.green - green, 2)
                + Math.pow(targetColor.blue - blue, 2));

            // TODO: Find a better threshold to give a tighter match?
            var threshold = 70;

            if (diff < threshold) {
                // TODO: Replace the pixel values to create a different color


                // Update the leftmost, topmost, rightmost and bottommost locations
                leftMost = Math.min(leftMost, x);
                topMost = Math.min(topMost, y);
                rightMost = Math.max(rightMost, x);
                bottomMost = Math.max(bottomMost, y);
            }
        }

        g.putImageData(imageData, 0, 0);


        // TODO: Use leftMost, rightMost, topMost, bottomMost, to draw a bounding box around the Post-it

        window.requestAnimationFrame(animationLoop);
    }


    window.requestAnimationFrame(animationLoop);


    video.addEventListener("click", function (e) {


        var x = e.layerX;
        var y = e.layerY;

        g.drawImage(video, 0, 0, canvas.width, canvas.height);

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
});