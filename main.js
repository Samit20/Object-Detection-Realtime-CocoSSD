img = "";

status = "";

objects = [];

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function draw() {
    image(video, 0, 0, 400, 400);
    if (status != "") {

        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number").innerHTML = "Number Of Objects:" + objects.length;

            stroke(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model has been loaded ✔");
    status = true;

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}