//Create variables here
var dogImg;
var dogImg1;
var foodStock;
var foodS;
var database;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1000, 650);
  database = firebase.database();
  dog = createSprite(500,450,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  textSize(20);
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
}


function draw() {  
  background(46,139,87);
  //add styles here
  if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
    dog.addImage(dogImg1);
  }

  if(keyWentDown(DOWN_ARROW)){
    dog.addImage(dogImg);
  }

  drawSprites();

  textSize(20);
fill("white");
stroke("pink");
text("Note: Please Press the Up Arrow ", 350,10,300,20);

text("to feed the dog  ", 405,35,300,20);

text("Note: Please Press the Down  ", 350,90,300,20);
text("Arrow to stop feeding", 405,120,300,20);
text("and to bring the dog to", 405,150,300,20);
text(" it's original position ", 405,175,300,20);

text("Food remaining : "+foodS,700,400); 
}



//function to read the values from database
function readStock(data){
foodS = data.val();
}
function writeStock(x){
  if (x <= 0){
    x = 0;
    text("Food is out of stock")
   } else{
    x=x-1;
  }
 
  if (foodS===0 && keyWentDown(UP_ARROW)){
    text("Food is out of Stock")
  }

 database.ref('/').update({Food:x})
};