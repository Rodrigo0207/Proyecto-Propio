var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombieGroup, bulletsGroup;
var gameState = 1;
var bulletsScore = 10;
var zombieScore = 10;
var ammoGroup;
var levels =1;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  zombieGroup = new Group();
  bulletsGroup = new Group();
  ammoGroup = new Group();




  

//creating the player sprite
player = createSprite(50, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(bgImg);
  
  
  if(gameState == 1){
    //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
 }

if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
 }
 //release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space") && bulletsScore>0){

  bulletsScore = bulletsScore-1;
 
  player.addImage(shooter_shooting)
  bulletSpawn();
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

  if(bulletsGroup.isTouching(zombieGroup)){
    for(var i=0; i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletsGroup)){
        zombieGroup[i].destroy();
        zombieScore = zombieScore-1;
      }
    }
  }

  /*if(levels == 2){
    bgImg = loadImage("")
  }*/

  if(zombieScore == 0){
    levels = levels+1
    zombieScore = levels*10;
  }

  if(player.collide(zombieGroup)){
    gameState = 0;
  }

  text("bullets: "+bulletsScore,50,50);
  text("zombies: "+zombieScore,50,60)

  if(player.isTouching(ammoGroup)){
    for(var i=0; i<ammoGroup.length;i++){
      if(ammoGroup[i].isTouching(player)){
        ammoGroup[i].destroy();
        bulletsScore = bulletsScore +1;
      }
    }
  }

zombieSpawn();
ammoSpawn()

}else if(gameState == 0){

    textSize(50)
    text("GAME OVER",windowWidth/2, windowHeight/2);

    player.visible = false;


    bulletsGroup.destroyEach();
    zombieGroup.destroyEach();


}



  



 
edges = createEdgeSprites()
zombieGroup.bounceOff(edges);

drawSprites();

}

function zombieSpawn(){
  if(frameCount%60 == 0){
    var zombie = createSprite(50, 20, 50,50);
    zombie.addImage(zombieImg);
    zombie.lifetime = 500;
    zombieGroup.add(zombie);
    zombie.scale = 0.2
    zombie.velocityX = Math.round(random(-10,10));
    zombie.velocityY = Math.round(random(-10,10));
    zombie.x = Math.round(random(windowWidth/2,windowHeight/2+300))
    zombie.y = Math.round(random(windowWidth/2,windowHeight/2+300))
  }
}

function bulletSpawn(){
  var bullets = createSprite(10,10,10,10)
  bullets.lifetime = 300;
  bulletsGroup.add(bullets);
  bullets.y = player.y -25;
  bullets.x = player.x;
  bullets.velocityX = 5;
}

function ammoSpawn(){
  if(frameCount==200){
    var ammo = createSprite(windowWidth/2, windowHeight/2, 20, 20)
    ammo.lifetime = 500;
    ammoGroup.add(ammo);
  }else if(frameCount > 200 && frameCount%150 == 0){
    var ammo = createSprite(windowWidth/2, windowHeight/2, 20, 20)
    ammo.lifetime = 500;
    ammoGroup.add(ammo);
    ammo.x = Math.round(random(50,windowWidth/2))
    ammo.x = Math.round(random(50,windowHeight/2))
  
  }
}