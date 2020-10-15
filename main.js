var leftX=0;
var leftY=0;
var rightX=0;
var rightY=0;

song="";



function preload(){
    song = loadSound("music_pushya.mp3");
}
 
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftX=results[0].pose.leftWrist.x;
        leftY=results[0].pose.leftWrist.y;
        rightX=results[0].pose.rightWrist.x;
        rightY=results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+leftX);
        console.log("Left Wrist Y = "+leftY);
        console.log("Right Wrist X = "+rightX);
        console.log("Right Wrist Y = "+rightY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#CC00FF");
    stroke("#09FBD3");
    circle(leftX,leftY,20);
    Number_Left_Y=Number(leftY);
    Left_y_without_decimals=floor(Number_Left_Y);
    Left_y_for_volume=Left_y_without_decimals/500;
    song.setVolume(Left_y_for_volume);
    document.getElementById("result_volume").innerHTML=Left_y_for_volume;

    fill("#09FBD3");
    stroke("#CC00FF");
    circle(rightX,rightY,20);
    if(rightY>0 && rightY<=100){
        document.getElementById("speed_result").innerHTML=" 0.5x";
        song.rate(0.5);
    }
    if(rightY>100 && rightY<=200){
        document.getElementById("speed_result").innerHTML=" 1.0x";
        song.rate(1.0);
    }
    if(rightY>200 && rightY<=300){
        document.getElementById("speed_result").innerHTML=" 1.5x";
        song.rate(1.5);
    }
    if(rightY>300 && rightY<=400){
        document.getElementById("speed_result").innerHTML=" 2.0x";
        song.rate(2.0);
    }
    if(rightY>400 && rightY<=500){
        document.getElementById("speed_result").innerHTML=" 2.5";
        song.rate(2.5);
    }
}

function P_dj(){
     song.play();
     song.setVolume(Left_y_for_volume);
     song.rate(1);
}

function Ss_dj(){
    song.stop();
}

function modelLoaded(){
    console.log("YaY ! your first DJ App's model is loaded.....")
}
