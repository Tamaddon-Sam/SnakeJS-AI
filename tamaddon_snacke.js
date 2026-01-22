// prendo canvas e contesto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// bottone start
const startBtn = document.getElementById("startBtn");

// grandezza quadrato
const box = 20;

// variabili gioco
let snake = [];
let direzione;
let cibo;
let punteggio = 0;
let game;
let running = false;

// click su bottone avvia gioco
startBtn.addEventListener("click", startGame);

// tasto spazio avvia gioco
document.addEventListener("keydown", function(e){
  if(e.key === " ") startGame();
});

// frecce per direzione
document.addEventListener("keydown", changedirezione);

// funzione per iniziare partita
function startGame(){
  if(running) return; // se già partita esco
  running = true;
  punteggio = 0;
  direzione = "RIGHT";

  // snake parte con 2 pezzi
  snake = [
    {x: 200, y: 200},
    {x: 180, y: 200}
  ];

  // creo cibo
  cibo = randomcibo();

  // aggiorno punteggio
  document.getElementById("punteggio").innerText = punteggio;

  // disegno subito serpente e cibo
  draw();

  // avvio loop di gioco ogni 100ms
  gioco= setInterval(draw, 100);
}

// genera cibo casuale
function randomcibo(){
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

// cambia direzione con frecce
function changedirezione(e){
  if(e.key === "ArrowLeft" && direzione !== "RIGHT") direzione = "LEFT";
  if(e.key === "ArrowUp" && direzione !== "DOWN") direzione = "UP";
  if(e.key === "ArrowRight" && direzione !== "LEFT") direzione = "RIGHT";
  if(e.key === "ArrowDown" && direzione !== "UP") direzione = "DOWN";
}

// funzione principale del gioco
function draw(){
  // pulisco canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // disegno cibo
  ctx.fillStyle = "red";
  ctx.fillRect(cibo.x, cibo.y, box, box);

  // disegno serpente
  ctx.fillStyle = "lime";
  for(let part of snake){
    ctx.fillRect(part.x, part.y, box, box);
  }

  // nuova testa
  let headX = snake[0].x;
  let headY = snake[0].y;

  if(direzione === "LEFT") headX -= box;
  if(direzione === "UP") headY -= box;
  if(direzione === "RIGHT") headX += box;
  if(direzione === "DOWN") headY += box;

  // se mangia cibo
  if(headX === cibo.x && headY === cibo.y){
    punteggio++;
    document.getElementById("punteggio").innerText = punteggio;
    cibo = randomcibo();
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
  alert("giocoOver! Punteggio: " + punteggio);
  running = false;
}
