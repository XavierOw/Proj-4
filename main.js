audio=""
status=""
objects =[];
function preload()
{
    audio=loadSound="James.mp3"
}

function draw()
{
    image(video, 0, 0, 380, 380)
    if(status != "")
    {
        objectDetector.detect(video,gotResult)
        r=random(255)
        g=random(255)
        b=random(225)
        for(i=0; i < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status : object found"
        
        fill(r,g,b)
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + ""+ percent+"%", objects[i].x+15, objects[i].y+15)
        noFill();
        stroke(r,g,b)
        rect(objects[i].x+15,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("number_objects").innerHTML="Baby detected";
                audio.stop()
            }
            else
            {
                document.getElementById("number_objects").innerHTML="Baby is not found";
                audio.play()
            }
        }
    }
    /*fill("blue")
    text(" This is a dog", 45, 75)
    noFill();
    stroke("blue")
    rect(30,60,450,350);

    fill("blue")
    text("Cat", 320, 120)
    noFill()
    stroke("blue")
    rect(300, 90, 270,320);*/
}

function modelLoaded()
{
console.log("modalLoaded");
status=true;

}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video =createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML ="status = Detecting Objects"
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results)
    objects=results;
}
