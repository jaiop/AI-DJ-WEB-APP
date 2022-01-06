song = " ";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.position(350,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modeLoaded);
    poseNet.on("pose",gotPoses);
}
function modeLoaded()
{
    console.log("poseNet is initialized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist = " + scoreLeftWrist + "score right wrist = " + scoreRightWrist);
        console.log(results)
    }

}
function draw()
{
   image(video,0,0,600,500);
   fill("#FF0000");
   stroke("#FF0000");
   
   if(scoreLeftWrist > 0.1)
   {
       circle(leftWristX,leftWristY,20);
       inNumberLeftWristY = Number(leftWristY);
       removeDecimal = floor(inNumberLeftWristY)
       volume = removeDecimal/500;
       document.getElementById("volume").innerHTML = "volume"+volume;
       song.setVolume(volume);
   }
   if(scoreRightWrist > 0.1)
   {
       circle(rightWristX,rightWristY,20);

       if(rightWristY > 0 && rightWristY <= 100)
       {
           document.getElementById("speed").innerHTML = "song speed = 0.5x";
           song.rate(0.5);
       }
       else if(rightWristY > 100 && rightWristY <= 200)
       {
           document.getElementById("speed").innerHTML = "song speed = 1x";
           song.rate(1);
       }
       else if(rightWristY > 200 && rightWristY <= 300)
       {
           document.getElementById("speed").innerHTML = "song speed = 1.5x";
           song.rate(1.5);
       }
       else if(rightWristY > 300 && rightWristY <= 400)
       {
           document.getElementById("speed").innerHTML = "song speed = 2x";
           song.rate(2);
       }
       else if(rightWristY > 400)
       {
           document.getElementById("speed").innerHTML = "song speed = 2.5x";
           song.rate(2.5);
       }
   }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
