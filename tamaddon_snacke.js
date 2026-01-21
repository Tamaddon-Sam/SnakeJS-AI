// prendo canvas e contesto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// bottone start
const startBtn = document.getElementById("startBtn");

// grandezza quadrato
const box = 20;

// variabili gioco
let snake = [];
let direction;
let food;
let score = 0;
let game;
let running = false;

// click su bottone avvia gioco
startBtn.addEventListener("click", startGame);

// tasto spazio avvia gioco
document.addEventListener("keydown", function(e){
  if(e.key === " ") startGame();
});

// frecce per direzione
document.addEventListener("keydown", changeDirection);

// funzione per iniziare partita
function startGame(){
  if(running) return; // se già partita esco
  running = true;
  score = 0;
  direction = "RIGHT";

  // snake parte con 2 pezzi
  snake = [
    {x: 200, y: 200},
    {x: 180, y: 200}
  ];

  // creo cibo
  food = randomFood();

  // aggiorno punteggio
  document.getElementById("score").innerText = score;

  // disegno subito serpente e cibo
  draw();

  // avvio loop di gioco ogni 100ms
  game = setInterval(draw, 100);
}

// genera cibo casuale
function randomFood(){
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

// cambia direzione con frecce
function changeDirection(e){
  if(e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if(e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if(e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if(e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// funzione principale del gioco
function draw(){
  // pulisco canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // disegno cibo
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // disegno serpente
  ctx.fillStyle = "lime";
  for(let part of snake){
    ctx.fillRect(part.x, part.y, box, box);
  }

  // nuova testa
  let headX = snake[0].x;
  let headY = snake[0].y;

  if(direction === "LEFT") headX -= box;
  if(direction === "UP") headY -= box;
  if(direction === "RIGHT") headX += box;
  if(direction === "DOWN") headY += box;

  // se mangia cibo
  if(headX === food.x && headY === food.y){
    score++;
    document.getElementById("score").innerText = score;
    food = randomFood();
  } else {
    snake.pop(); // tolgo coda
  }

  // collisione muro
  if(headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height){
    gameOver();
    return;
  }

  // collisione con se stesso
  for(let i=1; i<snake.length; i++){
    if(headX === snake[i].x && headY === snake[i].y){
      gameOver();
      return;
    }
  }

  // aggiungo nuova testa
  snake.unshift({x: headX, y: headY});
}

// fine partita
function gameOver(){
  clearInterval(game);
  alert("Game Over! Punteggio: " + score);
  running = false;
}
