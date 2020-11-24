var tower, tower_image;
var door, door_image, door_group;
var climber, climber_image, climber_group;
var ghost, ghost_standing_image, ghost_jumping_image;
var invisible_block, invisible_block_group;

var spooky_sound;

var gameState = "play";

function preload(){
  tower_image = loadImage("tower.png");
  door_image = loadImage("door.png");
  climber_image = loadImage("climber.png");
  
  ghost_standing_image = loadImage("ghost-standing.png");
  ghost_jumping_image = loadImage("ghost-jumping.png");
  
  spooky_sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300, 20, 20);
  tower.addImage(tower_image);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 450, 20, 20);
  ghost.addImage(ghost_standing_image);
  ghost.scale = 0.5;
  
  spooky_sound.loop();
  
  door_group = new Group();
  climber_group = new Group();
  invisible_block_group = new Group();
}

function draw(){
  background(51);
  
  if(gameState === "play"){
    if(invisible_block_group.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    if(climber_group.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x - 3;
    }
    else if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 3;
    }
    if(keyWentDown("space")){
      ghost.velocityY = -5;
      ghost.addImage(ghost_jumping_image);
    }
    if(keyWentUp("space")){
      ghost.addImage(ghost_standing_image);
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(tower.y > 400){
      tower.y = 300;
    }
    spawnDoor();
    drawSprites();
  }
  else if(gameState === "end"){    
    textSize(30);
    stroke("yellow");
    fill("yellow");
    text("Game Over", 250, 100);
  }
}

function spawnDoor(){
  if(frameCount % 340 === 0){
    door = createSprite(200, 1, 20, 20);
    door.addImage(door_image);
    door.velocityY = 1;
    door.lifetime = 800;
    
    door.x = Math.round(random(120, 400));
    
    door_group.add(door);
    
    climber = createSprite(200, 50, 20, 20);
    climber.addImage(climber_image);
    climber.velocityY = 1;
    climber.lifetime = 800;
    
    climber.x = door.x;
    
    climber_group.add(climber);
    
    invisible_block = createSprite(200, 65, 70, 15);
    invisible_block.velocityY = 1;
    invisible_block.lifetime = 800;
    invisible_block.visible= false;
    
    invisible_block.x = climber.x;
    
    invisible_block_group.add(invisible_block);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  }
}