let canvas = document.getElementById("game");
let canvasContext=canvas.getContext("2d");
let ballRadius=10;
let ballXPosition=canvas.width/2;
let ballYPosition= canvas.height-30;
let ballXSpeed=2;
let ballYSpeed=-3;
let paddleHeight=8;
let paddleWidth=120;
let paddleSize=(canvas.width-paddleWidth)/2;
var rightKeyPressed=false
let leftKeyPressed=false
let gameLife=3
var interval=""
let brickRowCount = 4;
let brickColumnCount = 10;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 45;

let bricks = [];
for(let column=0; column<brickColumnCount; column++) {
    bricks[column] = [];
    for(let row=0; row<brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0 };
    }
}


window.onload=function(){
    document.addEventListener("keydown", keyIsPressed,false )
    document.addEventListener("keyup", keyIsReleased,false )
    interval = setInterval(clearCanvas,10)
}
function drawBricks() {
    for(let column=0; column<brickColumnCount; column++) {
        for(let row=0; row<brickRowCount; row++) {
            let brickX = (column*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[column][row].x = brickX;
            bricks[column][row].y = brickY;
            canvasContext.beginPath();
            canvasContext.fillStyle = "#0095DD";
            canvasContext.rect(brickX, brickY, brickWidth, brickHeight);
            canvasContext.fill();
            canvasContext.closePath();
        }
    }
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
function collisionDetection() {
    for(let column=0; column<brickColumnCount; column++) {
        for(let row=0; row<brickRowCount; row++) {
            let brickPosition = bricks[column][row];
            if(ballXPosition > brickPosition.x && ballXPosition < brickPosition.x + brickWidth && ballYPosition > brickPosition.y && ballYPosition < brickPosition.y+brickHeight) {
                ballYSpeed = -ballYSpeed;
            }
        }
    }
}
function clearCanvas(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawCanvas();
    collisionDetection();
    
    ballXPosition=ballXPosition+ballXSpeed;
    if((ballXPosition>canvas.width)||(ballXPosition<0)){
        ballXSpeed=-ballXSpeed
    }

    ballYPosition=ballYPosition+ballYSpeed
    if(ballYPosition < 0){
        ballYSpeed=-ballYSpeed
    }
    if(ballYPosition> canvas.height){
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
 


