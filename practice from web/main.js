// JavaScript Document

// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//define ball
function Ball(){
	this.x=random(0,width);
	this.y=random(0,height);
	this.velX=random(-0.7,0.7);
	this.velY=random(-0.7,0.7);
	this.color='rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
	this.size=random(10,25);
	
}
Ball.prototype.draw=function(){
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.size,0,360,false);
	ctx.fillStyle=this.color;//填充颜色,默认是黑色
	ctx.fill();//画实心圆
	ctx.closePath();
}

Ball.prototype.move=function(){
	ctx.beginPath();
	if(this.x-this.size<=0||this.x+this.size>=width)this.velX=-this.velX; 
	if(this.y-this.size<=0||this.y+this.size>=height)this.velY=-this.velY;
	this.x+=this.velX;
	this.y+=this.velY;
}

Ball.prototype.cllision=function(){
	for(var i=0;i<15;i++){
		if(balls[i]===this)continue;
		dx=balls[i].x-this.x;
		dy=balls[i].y-this.y;
		dSize=this.size+balls[i].size;
		if(Math.sqrt(dx*dx+dy*dy)<=dSize){
			this.velX=-this.velX;
			this.velY=-this.velY;
			balls[i].velX=-balls[i].velX;
			balls[i].velY=-balls[i].velY;
			this.color=balls[i].color='rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
		}
	}
}


//
var balls=[];

function loop(){
	ctx.fillStyle = 'rgb(50,50,50)';
  	ctx.fillRect(0,0,width,height);
	
	for(var i=0;i<15;i++){
		var temp=new Ball();
		balls.push(temp);
	}
	
	for(i=0; i<15; i++){
		//alert(balls[i].x);
		balls[i].draw();
		balls[i].move();
		balls[i].cllision();
	}
	
	requestAnimationFrame(loop);
}

loop();