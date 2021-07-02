    var monkey , monkey_running, monkeyCollided
    var banana ,bananaImage, obstacle,                 obstacleImage
    var FoodGroup, obstacleGroup
    var bg;
    var score = 0;
    var bananaScore = 0;
    var PLAY = 0;
    var END = 1;
    var gameState = PLAY;
    var obstacles;


function preload()
    {
monkey_running =                           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

      bananaImage = loadImage("banana.png");
      obstaceImage = loadImage("obstacle.png");
      monkeyCollided = loadImage("monkey collider.png")
      background=loadImage("background.jpg");
    }    

function setup() 
{
  
      createCanvas(windowWidth,windowHeight);

      obstacleGroup = createGroup();
      bananaGroup = createGroup();
  
      bg=createSprite(650,550,90,90);
      bg.addImage(background);
      bg.scale = 2.5  

     monkey=createSprite(60,500,10,10);
     monkey.addAnimation("monkey",monkey_running);
     monkey.scale=0.15;
     monkey.addAnimation("monkey1",monkeyCollided); 
     //monkey.debug=true;

      ground = createSprite(300,520,650,10);
      ground.scale = 1;
      ground.visible=false;
}

function draw() 
{
  
  if (gameState == PLAY)
  {
    
  // moving ground
  bg.velocityX = -3 
 
  if (bg.x < 0)
{
   bg.x = bg.width/2;
}
        obstacles();
        bananas();


      if(keyDown("space")&&monkey.y >= 235) 
    {
          monkey.velocityY = -13; 
    }

    monkey.velocityY = monkey.velocityY + 0.8


   if (ground.x < 0)
   {
      ground.x = ground.width/2;
   }
    
    if (bananaGroup.isTouching(monkey))
  {
      bananaScore++;  
      bananaGroup.destroyEach();
      monkey.scale=0.2;
      score=score+2;
  }
   if (obstacleGroup.isTouching(monkey))
   {
      score=0;
      gameState = END;
     monkey.scale=0.10;
    }
}
  drawSprites()
  
  monkey.collide(ground);
    fill("black");
    textSize(25);
    text("SURVIVAL TIME: "+score, 400, 20);
    text("Score: "+score,10,20);

 if (gameState == END)
  {
    ground.velocityX = 0;
    bg.velocityX=0;
    
  monkey.changeAnimation("monkey1", monkeyCollided);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);

    
    if (keyDown("r"))
    {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
monkey.changeAnimation("monkey",monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
    
}
 

function obstacles()
{
  if (frameCount%150 == 0)
  {
    
    obstacle = createSprite(620,500,50,50);
obstacle.addAnimation("rock", obstaceImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(3+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
}
  
function bananas()
{
  if (frameCount%80 == 0)
  {
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.2;
    banana.velocityX =-(3+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

  }
}

switch(score){
    case 10: monkey.scale=0.10;
       break;
    case 20: monkey.scale=0.12;
       break;
    case 30: monkey.scale=0.14;
       break;
    case 40:monkey.scale=0.16;
       break; 
    case 50:monkey.scale=0.18;
       break;
    case 60:monkey.scale=0.20;  
       break;
    case 70:monkey.scale=0.22;
       break;
    case 80:monkey.scale=0.24;
       break;
         }

