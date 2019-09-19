let canvas = document.getElementById("game");
let canvasContext=canvas.getContext("2d");
let ballRadius=10;
let ballXPosition=canvas.width/2;
let ballYPosition= canvas.height-30;
let ballXSpeed=2;
let ballYSpeed=-3;
let paddleHeight=10;
let paddleWidth=50;
let paddleSize=(canvas.width-paddleWidth)/2;
var rightKeyPressed=false
let leftKeyPressed=false
let gameLife=3
var interval=""

window.onload=function(){
    document.addEventListener("keydown", keyIsPressed,false )
    document.addEventListener("keyup", keyIsReleased,false )
    interval = setInterval(clearCanvas,10)
}

function drawBall() {
    canvasContext.beginPath();
    canvasContext.fillStyle='#ffffff';
    canvasContext.arc(ballXPosition,ballYPosition, ballRadius, 0, 2 * Math.PI);
    canvasContext.fill();
    canvasContext.closePath();
}

function drawCanvas(){

    canvasContext.beginPath();
    canvasContext.fillStyle='#ffffff';
    canvasContext.fillRect(paddleSize,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    canvasContext.closePath();
}

function clearCanvas(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCanvas();
    
    ballXPosition=ballXPosition+ballXSpeed;
    if((ballXPosition>canvas.width)||(ballXPosition<0)){
        ballXSpeed=-ballXSpeed
    }

    ballYPosition=ballYPosition+ballYSpeed
    if(ballYPosition < 0){
        ballYSpeed=-ballYSpeed
    }
    if(ballYPosition - ballRadius > canvas.height){
        if((ballXPosition > paddleSize) && (ballXPosition < paddleSize + paddleWidth)){
            ballYSpeed = -ballYSpeed
        }
            else{
                gameLife--
                alert("Game Over")   
                document.location.reload();      
                clearInterval(interval);      
            }    
    }
    
    if((rightKeyPressed) && ( paddleSize+paddleWidth <canvas.width)){
        paddleSize =  paddleSize + 3;
     }
 
    if((leftKeyPressed) && (paddleSize >= 0)){
        paddleSize =  paddleSize - 3;
    }
}

function keyIsPressed(evt){
    if(evt.key=="ArrowRight"){
        rightKeyPressed=true
    }
    if(evt.key=="ArrowLeft"){
        leftKeyPressed=true
        console.log("arrow left working")   
    }
}

 function keyIsReleased(evt){
     if(evt.key=="ArrowRight"){
         rightKeyPressed=false
     }
     else if(evt.key=="ArrowLeft"){
        leftKeyPressed=false
    }
 }
 


