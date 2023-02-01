// bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

// raquete

let xRaquete = 0;
let yRaquete = 150;
let cRaquete = 10;
let hRaquete = 100;

// raquete do oponente

let xRaqueteOponente = 590;
let yRaqueteOponente = 150;

// velocidade da bolinha

let velocidadeX = 7;
let velocidadeY = 7;

// pontos

let meusPontos = 0;
let pontosOponente = 0;

// colisao

let colidiu = false;

// sons

let raquetada;
let ponto;
let trilha;


function preload() {
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}


function bolinha() {
  circle(xBolinha,yBolinha,diametro)
}


function raquete(x,y) {
  rect (x, y, cRaquete, hRaquete);
}


function movimentoBolinha() {
  xBolinha = xBolinha + velocidadeX;
  yBolinha = yBolinha + velocidadeY;
}


function colisaoBorda () {
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeX = velocidadeX*(-1);
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeY = velocidadeY*(-1);
  } 
}


function movimentoRaquete() {
  if (keyIsDown(87)) {
    yRaquete = yRaquete - 7;
  }
  
  if (keyIsDown(83)) {
    yRaquete = yRaquete +7;
  }
  
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente = yRaqueteOponente - 7;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente = yRaqueteOponente +7;
  }
}


function colisaoBiblioteca(x,y) {
  colidiu = collideRectCircle(x, y, cRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeX = velocidadeX * -1;
    raquetada.play();
  }
}


function placar() {
  stroke (255);
  textAlign(CENTER);
  textSize(18);
  fill (color(255,140,0));
  rect (180, 10, 40, 20);
  rect (380, 10, 40, 20);
  fill (255);
  text(meusPontos, 200, 26);
  text(pontosOponente, 400, 26);
}


function marcar() {
    if (xBolinha > 590) {
    meusPontos = meusPontos +1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
  }
  
  if (xBolinha < 10) {
    pontosOponente = pontosOponente +1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
  }
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}


function draw() {
  background(0);
  
  bolinha();
  movimentoBolinha();
  
  raquete (xRaquete, yRaquete);
  raquete (xRaqueteOponente, yRaqueteOponente);
  
  colisaoBorda();
  
  movimentoRaquete();
  
  colisaoBiblioteca(xRaquete, yRaquete);
  colisaoBiblioteca(xRaqueteOponente, yRaqueteOponente);

  placar();
  marcar();
  
}