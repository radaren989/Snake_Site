// board
var cellSize = 20;
var row = 30;
var col = 30;
var board;
var context;

const GAME_SPEED = 100;
// snake
var snakeX = cellSize * 5;
var snakeY = cellSize * 5;
var snakeBody = [];
var score = 0;
var velocityX = 0;
var velocityY = 0;

// food
var foodX;
var foodY;

var gameOver = false;

window.onload = function(){
    board = document.getElementById("gameCanvas");
    board.heigth = row * cellSize;
    board.width = col * cellSize;
    context = board.getContext("2d");
    
    document.addEventListener("keyup", changeDirection);
    placeFood();
    
    setInterval(update, GAME_SPEED)
}
function drawBoard(){
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.heigth);
}
function drawSnake(){
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push({x: foodX, y: foodY});
        placeFood();
        score += 100;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].x = snakeBody[i-1].x;
        snakeBody[i].y = snakeBody[i-1].y; 
    }
    if(snakeBody.length){
        snakeBody[0].x = snakeX;
        snakeBody[0].y = snakeY;
    }

    context.fillStyle = "lime";
    snakeX += velocityX * cellSize;
    snakeY += velocityY * cellSize;
    context.fillRect(snakeX,snakeY, cellSize, cellSize);
    for(var i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i].x, snakeBody[i].y, cellSize, cellSize);
    }
}
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,cellSize,cellSize);
}
function drawScore(){
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.fillText(score, 0,0);
}
function checkGameOver(){
    if(snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.heigth){
        gameOver = true;
        alert("Game Over\nScore: " + score);
    }
    for(var i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i].x && snakeY == snakeBody[i].y){
            gameOver = true;
            alert("Game Over\nScore: " + score);
        }
    }
}


function update(){
    if(gameOver) return;
    drawBoard();
    drawFood();
    drawSnake();
    drawScore();
    checkGameOver();
}

function changeDirection(e){
    console.log("as");
    switch (e.code) {
        case "ArrowUp":
            if(velocityY == 1) break;
            velocityX = 0; 
            velocityY = -1;
            break;
        case "ArrowDown":
            if(velocityY == -1) break;
            velocityX = 0;
            velocityY = 1;
            break;
        case "ArrowLeft":
            if(velocityX == 1) break;
            velocityX = -1;
            velocityY = 0;
            break;
        case "ArrowRight":
            if(velocityX == -1) break;
            velocityX = 1;
            velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * col) * cellSize; 
    foodY = Math.floor(Math.random() * row) * cellSize; 
}