const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint;

var engine;
var world;
var ground;
var stand;
var polygon;
var slingShot;
var backgroundImg;
var polygon_img;
var score = 0;


function preload(){
  polygon_img = loadImage("polygon.png");

  getTime()
}


function setup() {
    createCanvas(900,400);
    engine = Engine.create();
    world = engine.world;
  
    ground = new Ground(width/2,height,width,20);
    stand = new Ground(390,300,250,10);

    //level 1
    block1 = new Block(300,275,30,40);
    block2 = new Block(330,275,30,40);
    block3 = new Block(360,275,30,40);
    block4 = new Block(390,275,30,40);
    block5 = new Block(420,275,30,40);
    block6 = new Block(450,275,30,40);
    block7 = new Block(480,275,30,40);

    //level 2
    block8 = new Block(330,235,30,40);
    block9 = new Block(360,235,30,40);
    block10 = new Block(390,235,30,40);
    block11 = new Block(420,235,30,40);
    block12 = new Block(450,235,30,40);

    //level 3
    block13 = new Block(360,195,30,40);
    block14 = new Block(390,195,30,40);
    block15 = new Block(420,195,30,40);

   //level 4 
    block16 = new Block(390,155,30,40);


    polygon = Bodies.circle(50,200,20);
    World.add(world,polygon);

    slingShot = new Slingshot(polygon,{x:100,y:200});
}

function draw() {

    if(backgroundImg)
    background(backgroundImg);
    
    Engine.update(engine);
    
    ground.display();
    stand.display();
    strokeWeight(2);
    stroke(15);

    fill("lightblue");
    block1.display();
    block2.display();
    block3.display();
    block4.display();
    block5.display();
    block6.display();
    block7.display();

    fill("pink");
    block8.display();
    block9.display();
    block10.display();
    block11.display();
    block12.display();

    fill("lightgreen");
    block13.display();
    block14.display();
    block15.display();

    fill("gray");
    block16.display();


    imageMode(CENTER)
    image(polygon_img ,polygon.position.x,polygon.position.y,40,40);
  
    slingShot.display();

    textSize(20);
    fill("white");
    text("Drag the Hexagon Stone and Release it, to launch it towards the blocks",100,30);

    textSize(10);

    block1.score();
    block2.score();
    block3.score();
    block4.score();
    block5.score();
    block6.score();
    block7.score();
    block8.score();
    block9.score();
    block10.score();
    block11.score();
    block12.score();
    block13.score();
    block14.score();
    block15.score();
    block16.score();

    text("SCORE: "+score,500,60);
  }
  function mouseDragged(){
    Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
  }

  function mouseReleased(){
    slingShot.fly();
  }

  function keyPressed(){
    if(keyCode===32){
      slingshot.attach(this.polygon);
    }
  }

  async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata")
    var responsejson = await response.json();
    var dateTime = responsejson.datetime
    var hr = dateTime.slice(11,13);
    console.log(hr);


    if (hr>06 && hr<16){
      bg = "sprites/day-bg.jpg"
    }
    else {
      bg = "sprites/night-bg.jpg"
    }

    backgroundImg=loadImage(bg);
}