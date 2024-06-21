status="";
objects=[];
sound="";

function setup(){
canvas=createCanvas(380,380);
canvas.center();
camera=createCapture(VIDEO);
camera.size(380,380);
camera.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("baby_detected").innerHTML="Status: Detecting baby";
}

function preload(){
    sound=loadSound("alarm.mp3");
}

function modelLoaded(){
    console.log("modal loaded");
    status="true";
    
}

function gotResult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects=results;
    console.log(objects.length);
}
}
function draw(){
    image(camera,0,0,380,380);
    sound.play();
      if(status !="")
    {   objectDetector.detect(camera,gotResult);
        for(i=0;i<objects.length; i++){
            
            fill(255);
         percent=floor(objects[i].confidence *100);
         text(objects[i].label+" "+percent+"%",objects[i].x+5,objects[i].y+5);
         noFill();
         stroke("red");

        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if(objects[i].label=="person"){
document.getElementById("baby_detected").innerHTML="Baby Detected";
     sound.stop();

}
else{
    document.getElementById("baby_detected").innerHTML="Baby not detected";
    sound.play();
}
if(objects.length==0){
    document.getElementById("baby_detected").innerHTML="Baby not detected";
    sound.play();
}

       
    
        }
    }
    
}