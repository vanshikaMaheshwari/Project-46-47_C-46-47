var gameState = "start";
var fetching = "no";
var diamond_next;
var Timer = 60;

function preload(){
  DiamondImg = loadAnimation("Diamond/tile000.png","Diamond/tile001.png",
  "Diamond/tile002.png","Diamond/tile003.png","Diamond/tile004.png");
  ChurchImg = loadImage("Church.png");
  FireStationImg = loadImage("Fire Station.png");
  GymImg = loadImage("Gym.png");
  HospitalImg = loadImage("Hospital.png");
  HotelImg = loadImage("Hotel.png");
  HouseImg = loadImage("House.png");
  MallImg = loadImage("Mall.png");
  ParkImg = loadImage("Park.png");
  PoliceImg = loadImage("Police.png");
  PostOfficeImg = loadImage("Post Office.png");
  BgImg = loadImage("Poster.jpg");
  SchoolImg = loadImage("School.png");
  ThiefImg = loadImage("Thief.png");
  PlayImg = loadImage("Play2.png");
  HowImg = loadImage("How.png");
  bg = loadImage("Background 8.jpg");
}

function setup() {
  createCanvas(windowWidth-10,windowHeight-10);
  background(BgImg);

  //Input
  name_input = createInput("Enter Your Name");
  name_input.position(windowWidth/2-110,windowHeight/2);
  name_input.style("height","35px");
  name_input.style("width","160px");
  name_input.style("font-size","20px");
  name_input.style("background",rgb(29, 132, 1));
  name_input.style('color', rgb(250, 236, 95));

  //Blocks Around The Diamond
  Block_2 = createSprite(windowWidth/2+5,windowHeight/2-5,100,100);
  Block_2.shapeColor = rgb(245, 48, 253);
  Block_2.visible = false;

  Block_1 = createSprite(windowWidth/2-5,windowHeight/2-5,100,100);
  Block_1.shapeColor = rgb(248, 150, 253);
  Block_1.visible = false;

  //Sprites
  Play = createSprite(windowWidth/2-30,windowHeight/2+140);
  Play.addImage(PlayImg);
  Play.scale = 0.35;

  How = createSprite(windowWidth/2-208,windowHeight/2+120);
  How.addImage(HowImg);
  How.scale = 0.45;

  Church = createSprite(windowWidth/2,windowHeight/2-225);
  Church.addImage(ChurchImg);
  Church.scale = 0.15;
  Church.visible = false;

  FireStation = createSprite(windowWidth/2+225,windowHeight/2-140);
  FireStation.addImage(FireStationImg);
  FireStation.scale = 0.2;
  FireStation.visible = false;

  Gym = createSprite(windowWidth/2,windowHeight/2+210);
  Gym.addImage(GymImg);
  Gym.scale = 0.3;
  Gym.visible = false;

  Diamond = createSprite(windowWidth/2,windowHeight/2);
  Diamond.addAnimation("diamond rotating",DiamondImg);
  Diamond.scale = 0.5;
  Diamond.visible = false;

  Hospital = createSprite(windowWidth/2-175,windowHeight/2-25);
  Hospital.addImage(HospitalImg);
  Hospital.scale = 0.15;
  Hospital.visible = false;

  Hotel = createSprite(windowWidth/2+350,windowHeight-100);
  Hotel.addImage(HotelImg);
  Hotel.scale = 0.31;
  Hotel.visible = false;

  House = createSprite(windowWidth/2-540,windowHeight/2);
  House.addImage(HouseImg);
  House.scale = 0.11;
  House.visible = false;

  Mall = createSprite(windowWidth/2-450,windowHeight-90);
  Mall.addImage(MallImg);
  Mall.scale = 0.11;
  Mall.visible = false;

  Park = createSprite(windowWidth/2+440,windowHeight/2-15);
  Park.addImage(ParkImg);
  Park.scale = 0.11;
  Park.visible = false;

  Police = createSprite(windowWidth-600,windowHeight-70);
  Police.addImage(PoliceImg);
  Police.scale = 0.48;
  Police.visible = false;
  Police.velocityX = 3;
  Police.velocityY = 5;

  PostOffice = createSprite(windowWidth/2-300,windowHeight/2-175);
  PostOffice.addImage(PostOfficeImg);
  PostOffice.scale = 0.15;
  PostOffice.visible = false;

  School = createSprite(windowWidth-120,windowHeight-540);
  School.addImage(SchoolImg);
  School.scale = 0.15;
  School.visible = false;

  Thief = createSprite(windowWidth/2-620,windowHeight/2-250);
  Thief.addImage(ThiefImg);
  Thief.scale = 0.12;
  Thief.visible = false;

  HomeButton = createSprite(200,200,50,50);
  HomeButton.visible = false;

  //Barrier
  Barrier_1 = createSprite(windowWidth/2-550,windowHeight/2-200,70,10);
  Barrier_1.rotation = -45;
  Barrier_1.shapeColor = "pink";
  Barrier_1.visible = false;

  Edges = createEdgeSprites();

  //Setting Collision Radius
  Thief.debug = true;
  Thief.setCollider("rectangle",-30,0,475,830);

  Hospital.debug = true;
  Hospital.setCollider("rectangle",0,65,700,550);

  Gym.debug = true;
  Gym.setCollider("rectangle",0,0,275,150);

  Hotel.debug = true;
  Hotel.setCollider("rectangle",0,0,225,300);

  Police.debug = true;
  Police.setCollider("rectangle",0,0,100,225);

  Park.debug = true;
  Park.setCollider("rectangle",0,0,1100,1000);

  Church.debug = true;
  Church.setCollider("rectangle",0,0,700,700);

  Mall.debug = true;
  Mall.setCollider("rectangle",0,-75,1100,900);

  House.debug = true;
  House.setCollider("rectangle",0,0,1000,900);

  School.debug = true;
  School.setCollider("rectangle",0,50,1000,700);
  
  FireStation.debug = true;
  FireStation.setCollider("rectangle",0,0,400,500);

  PostOffice.debug = true;
  PostOffice.setCollider("rectangle",0,0,800,460);

  Play.debug = true;
  Play.setCollider("rectangle",0,-150,510,150);

  How.debug = true;
  How.setCollider("rectangle",395,120,380,115);

  diamond_next = createSprite(10,10,120,120);
  diamond_next.visible = false;

  Barrier_1.velocityX = 2
  Barrier_1.velocityY = -2
}

function draw() {
    Police.bounceOff(House);
    Police.bounceOff(FireStation);
    Police.bounceOff(School);
    Police.bounceOff(PostOffice);
    Police.bounceOff(Mall);
    Police.bounceOff(Hotel);
    Police.bounceOff(Hospital);
    Police.bounceOff(Gym);
    Police.bounceOff(Church);
    Police.bounceOff(Park);
    Police.bounceOff(Edges);

    if( Barrier_1.collide(Edges[2])){
      Barrier_1.velocityX = -2
      Barrier_1.velocityY = 2
    }
    if( Barrier_1.collide(Edges[0])){
      Barrier_1.velocityX = 2
      Barrier_1.velocityY = -2
    }

    if(mousePressedOver(Play) && gameState === "start"){
    //background(99, 255, 85);
    name_input.hide();
    //play_button.hide();
    //how_button.hide();
    Church.visible = true;
    FireStation.visible = true;
    Gym.visible = true;
    Thief.visible = true;
    Diamond.visible = true;
    Hospital.visible = true;
    Park.visible = true;
    School.visible = true;
    PostOffice.visible = true;
    Mall.visible = true;
    Police.visible = true;
    Hotel.visible = true;
    House.visible = true;
    Block_1.visible = true;
    Block_2.visible = true;
    Barrier_1.visible = true;
    Police.x = windowWidth-600;
    Police.y = windowHeight-70;
    Play.destroy();
    How.destroy();
    gameState = "play"
  }//How To Play

  if(mousePressedOver(How)){
    gameState = "inform"
    HomeButton.visible = true;
  }
  if(gameState === "inform"){
    background("black");
    Play.visible = false;
    name_input.hide();
    How.visible = false;
    if(mousePressedOver(HomeButton)){
      gameState = "start";
    }
  }

  if(gameState === "play"){
    //background(99, 255, 85);
    background(75, 0, 64);
    if(fetching === "no"){
      Thief.collide(House);
      Thief.collide(FireStation);
      Thief.collide(School);
      Thief.collide(PostOffice);
      Thief.collide(Mall);
      Thief.collide(Hotel);
      Thief.collide(Hospital);
      Thief.collide(Gym);
      Thief.collide(Church);
      Thief.collide(Park);
      Thief.collide(Edges);
    }
    if(Thief.isTouching(Barrier_1)){
      Thief.x = windowWidth/2-620;
      Thief.y = windowHeight/2-250;
    }
    if(Thief.isTouching(Police) && fetching === "no"){
      Thief.x = windowWidth/2-620;
      Thief.y = windowHeight/2-250;
    }
    Thief.velocityX = 0;
    Thief.velocityY = 0;
    if(keyDown("RIGHT_ARROW") && Timer===60){
      Thief.velocityX = 5;
    }
    if(keyDown("LEFT_ARROW")&& Timer===60){
      Thief.velocityX = -5;
    }
    if(keyDown("DOWN_ARROW")&& Timer===60){
      Thief.velocityY = 5;
    }
    if(keyDown("UP_ARROW")&& Timer===60){
      Thief.velocityY = -5;
    }
    if(Thief.isTouching(Diamond)){
      Diamond.destroy();
      Block_1.destroy();
      Block_2.destroy();
      fetching = "yes";
    }
     if(fetching === "yes" && Timer === 60 ){
      stroke(255, 70, 137);
      fill(255, 70, 137);
      textSize(20);
      text("Diamond Captured!!...",windowWidth/2-80,windowHeight/2-20);
      text("Now Hide It Somewhere!!",windowWidth/2-100,windowHeight/2+30);
    }
   if(Thief.isTouching(Police) && fetching === "yes"){
      gameState = "end";
    }
    if(Thief.isTouching(FireStation) && fetching === "yes"){
      diamond_next.x = windowWidth/2+225
      diamond_next.y = windowHeight/2-140
      Thief.collide(FireStation);
      Thief.visible = false;
      Thief.x = windowWidth/2+225;
      Thief.y = windowHeight/2-140;
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(Hospital) && fetching === "yes"){
      diamond_next.x = windowWidth/2-175
      diamond_next.y = windowHeight/2-25
      Thief.collide(Hospital);
      Thief.visible = false;
      Thief.x = windowWidth/2-175
      Thief.y = windowHeight/2-25
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(Hotel) && fetching === "yes"){
      diamond_next.x = windowWidth/2+350
      diamond_next.y = windowHeight-100
      Thief.collide(Hotel);
      Thief.visible = false;
      Thief.x = windowWidth/2+350;
      Thief.y = windowHeight-100;
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(Gym) && fetching === "yes"){
      diamond_next.x = windowWidth/2
      diamond_next.y = windowHeight/2+210
      Thief.collide(Gym);
      Thief.visible = false;
      Thief.x = windowWidth/2;
      Thief.y = windowHeight/2+210;
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(Church) && fetching === "yes"){
      diamond_next.x = windowWidth/2
      diamond_next.y = windowHeight/2-225
      Thief.collide(Church);
      Thief.visible = false;
      Thief.x = windowWidth/2;
      Thief.y = windowHeight/2-225;
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(School) && fetching === "yes"){
      diamond_next.x = windowWidth-120
      diamond_next.y = windowHeight-540
      diamond_next.width = 170;
      diamond_next.height = 130;
      Thief.collide(School);
      Thief.visible = false;
      Thief.x = windowWidth-120
      Thief.y = windowHeight-540
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(House) && fetching === "yes"){
      diamond_next.x = windowWidth/2-540
      diamond_next.y = windowHeight/2
      Thief.collide(House);
      Thief.visible = false;
      Thief.x = windowWidth/2-540;
      Thief.y = windowHeight/2;
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(Mall) && fetching === "yes"){
      diamond_next.x = windowWidth/2-450 
      diamond_next.y = windowHeight-90
      Thief.collide(Mall);
      Thief.visible = false;
      Thief.x = windowWidth/2-450 
      Thief.y = windowHeight-90
      Timer = Timer-0.2;
    }
    if(Thief.isTouching(Park) && fetching === "yes"){
      diamond_next.x = windowWidth/2+440
      diamond_next.y = windowHeight/2-15
      Thief.collide(Park);
      Thief.visible = false;
      Thief.x =  windowWidth/2+440
      Thief.y = windowHeight/2-15
      Timer = Timer-0.2;
      diamond_next.width = 125;
      diamond_next.height = 115;
    }
    if(Thief.isTouching(PostOffice) && fetching === "yes"){
      diamond_next.x = windowWidth/2-300
      diamond_next.y = windowHeight/2-175
      Thief.collide(PostOffice);
      Thief.visible = false;
      Thief.x = windowWidth/2-300;
      Thief.y = windowHeight/2-175;
      Timer = Timer-0.2;
    }
    if(Police.isTouching(diamond_next) && Timer>0 && Timer<60){
      textSize(40);
      fill("white");
      text("Police caught the thief!!",200,200);
      Timer= 0
      Police.velocityX = 0;
      Police.velocityY = 0;
      House.visible = false;
      Hospital.visible = false;
      School.visible = false;
      Gym.visible = false;
      Hotel.visible = false;
      Mall.visible = false;
      Church.visible = false;
      FireStation.visible = false;
      PostOffice.visible = false;
      Park.visible = false;
      Barrier_1.visible = false;
      Police.visible = false;
      gameState = "end"
    }
    if(Timer <= 0){
      Timer = 0;
      background(bg);
      textSize(30);
      fill("white");
      stroke("white");
      text("YOU WIN",200,200);
      House.destroy();
      Hospital.destroy();
      School.destroy();
      Gym.destroy();
      Hotel.destroy();
      Mall.destroy();
      Church.destroy();
      FireStation.destroy();
      PostOffice.destroy();
      Park.destroy();
      Barrier_1.destroy();
      Police.destroy();
      Thief.destroy();
    }
    textSize(40);
    stroke(70, 232, 255);
    fill(70, 232, 255);
    text("Timer = " + Math.round(Timer),windowWidth-300,windowHeight/2-100);
  }
  if(gameState === "end"){
    background(bg);
    textSize(30);
    fill("white");
    stroke("white");
    text("Police Has Caught The Diamond You Stole",200,200);
  }
  if(gameState === "start"){
    stroke(255, 244, 70);
    fill(255, 244, 70);
    textSize(30);
    textFont("Fantasy");
    text("How To Play",windowWidth/2-99,windowHeight/2+185);
    background(BgImg);
    name_input.show();
    How.visible = true;
    Play.visible = true;
    HomeButton.visible = false;
  }
  drawSprites();
}