let canvas = document.getElementById("game");
let canvasContext=canvas.getContext("2d");
let ballRadius=10;
let ballXPosition=canvas.width/2;
let ballYPosition= canvas.height-30;
let ballXSpeed=2;
let ballYSpeed=-3;

window.onload=function(){
    setInterval(clearCanvas,10)
}

function drawBall() {
    canvasContext.beginPath();
    canvasContext.fillStyle='#ffffff';
    canvasContext.arc(ballXPosition,ballYPosition, ballRadius, 0, 2 * Math.PI);
    canvasContext.fill();
    canvasContext.closePath();
   
}

function clearCanvas(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    
    ballXPosition=ballXPosition+ballXSpeed;
    if((ballXPosition>canvas.width)||(ballXPosition<0)){
        ballXSpeed=-ballXSpeed
    }

    ballYPosition=ballYPosition+ballYSpeed;
    if((ballYPosition>canvas.height)||(ballYPosition<0)){
        ballYSpeed=-ballYSpeed
    }
    
}

