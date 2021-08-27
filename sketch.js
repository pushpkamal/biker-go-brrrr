var PLAY = 1;
var END = 0;
var gameState = PLAY;
var biker,bikerImg;
var ground,grondImg;
var obstacle,obstacleImg,obstaclesGroup;
var score;
var gameOver,gameOverImg;

function preload(){
bikerImg = loadImage("biker_1.png");
groundImg = loadImage("ground.png");
obstacleImg = loadImage("obstacle1.png");
gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(1000,500);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImg);
  ground.velocityX = -4;
  
  biker = createSprite(80,400,20,50);
  biker.addImage("biker",bikerImg);
  biker.scale=0.2;
  biker.debug = true
  biker.visible = true;

  invisibleGround = createSprite(200,470,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(500,150);
  gameOver.addImage(gameOverImg);

  obstaclesGroup = new Group();

}

function draw() {
  background(0);
  spawnObstacles();
  drawSprites();
 
  text("Score: "+ score, 500,50);
 
  if(gameState === PLAY){
    gameOver.visible = false
    score = 0;
    
    biker.velocityY = biker.velocityY + 0.8;

    if (ground.x <41){
      ground.x = ground.width/2;
     }

     score = score + Math.round(frameCount/40);

    if(keyDown("space")&& biker.y >= 100) {
      biker.velocityY = -13;

      if(obstaclesGroup.isTouching(biker)){
        gameState = END;
      }  
    }
   
    
  }
   else if (gameState === END){
    gameOver.visible = true;
    ground.velocityX = 0;
    obstaclesGroup.setLifetimeEach(0)
    biker.visible = false;
  }



  biker.collide(invisibleGround);

}

function spawnObstacles(){
  if (frameCount % 120 === 0) {
    obstacle = createSprite(1100,440,40,10);
    obstacle.debug = true
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
   
    //assign lifetime to the variable
    obstacle.lifetime = 900;
   
   //adjust the depth
   obstacle.depth = biker.depth;
   biker.depth = biker.depth + 1;
   
   //adding cloud to the group
   obstaclesGroup.add(obstacle);
   }
}





















