var ball;
var database;
var position;

function setup(){

    createCanvas(700,700);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    database=firebase.database();

    var posRef= database.ref("Ball/Position");
    posRef.on("value",readPosition,showError);
    
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
   // ball.x = ball.x + x;
   // ball.y = ball.y + y;
   database.ref("Ball/Position").set({
       X:ball.x+x,Y:ball.y+y
   })
}


function readPosition(data){
    position=data.val();
    console.log(position);
    ball.x=position.X;
    ball.y=position.Y;
}

function showError(){
    console.log("there is a error in connecting to the database");
}
