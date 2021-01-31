//Create variables here
var dog;
var happydog;
var dogImg;
var database;
var foodStock;
var foodS;
var x;
var lastFed;
var feedTime;
var feed,addFood;


function preload(){
dogImg = loadImage("images/dogImg.png");
happydog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
	createCanvas(1000,400);
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale= 0.15;
  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  textSize(20);
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);
  foodObj.display();
  feedTime = database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  });
  fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12 + "PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30);
}else{
  text("last Feed :"+ lastFed + " AM", 350,30);
}
drawSprites();
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

  
