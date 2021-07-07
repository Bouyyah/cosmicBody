


let num = 733;
let noiseScale=500, noiseStrength=1;
let particles = [num];

let video;
let pics = [];


let videoWidth = 640;
let videoHeight = 360;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;


let hscale = canvasHeight / videoHeight;
let wscale = canvasWidth / videoWidth;

let colors = ["#FECD1A","#FD3A69","#9D0191","#120078","#FFD5E5","#FFFFDD","#A0FFE6","#81F5FF"]

function preload(){
  //picture = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Portrait-bernard-deloupy.jpg/800px-Portrait-bernard-deloupy.jpg");
 
}

function setup() {

  frameRate(30);
  createCanvas(canvasWidth,canvasHeight);
  pixelDensity(1);
 // pixelArray = processImage(picture);
 // console.log(processImage(picture));

    
  let constraints = {
    video: {
      mandatory: {
        maxWidth: videoWidth,
        maxHeight: videoHeight
      }
    },
    audio: false
  };

  video = createCapture( constraints );
  video.hide();

  //particles
  noStroke();
  for (let i=0; i<num; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
    let loc = createVector(random(width*1.2), random(height), 2);
    let angle = 0; //any value to initialize
    let dir = createVector(cos(angle), sin(angle));
    let speed = random(0.5,2);
    let clr = random(colors);
    // let speed = random(5,map(mouseX,0,width,5,20));   // faster
    particles[i]= new Particle(loc, dir, speed,clr);
  }

}

function draw() {
  

  fill(0, 30);
  noStroke();
  rect(0, 0, width, height);
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }

  let img = processImage(video.get( 0, 0, videoWidth, videoHeight ));
  pics.push( img );

  // if there are images saved, show them.
  if ( pics.length > 0 ){
  let pic = pics.shift();
  
  for (let i = 0; i < pic.length; i+=5) {
    fill(random(255));
     noStroke();
     ellipse(floor(pic[i].x * wscale),floor(pic[i].y * hscale),1);
  }
}


 
}


class pixel {
  constructor(_r, _g, _b, _x, _y) {
      this.r = _r;
      this.g = _g;
      this.b = _b;
      this.x = _x;
      this.y = _y;
      const ghsp = 15;
  
      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      // It gives almost the same result as adding the rgb value then dividing them by 3, i just like it more.
      
      let hsp = Math.sqrt(
          0.299 * (this.r * this.r) +
          0.587 * (this.g * this.g) +
          0.114 * (this.b * this.b)
      );
      // Using the HSP value, determine whether the color is light or dark
      if (hsp > ghsp) {

          this.brihtness = 'light';
      }
      else {

          this.brihtness = 'dark';;
      }
  }
}
function processImage(_srcimg)
{
// _srcimg.filter(p5.GRAY);
let pixels = [];
	let k1 = [[-1, 0, 1],
			 [-2, 0, 2],
			 [-1, 0, 1]];
	let k2 = [[-1, -2, -1],
			 [0, 0, 0],
			 [1, 2, 1]];

	_srcimg.loadPixels(); 
	
	let w = _srcimg.width;
	let h = _srcimg.height;
    let result = [];
    
	for (let x = 0; x < w; x++) {
    	for (let y = 0; y < h; y++) {
		
			// INDEX POSITION IN PIXEL LIST
			let ul = ((x-1+w)%w + w*((y-1+h)%h))*4; // location of the UPPER LEFT
			let uc = ((x-0+w)%w + w*((y-1+h)%h))*4; // location of the UPPER MID
			let ur = ((x+1+w)%w + w*((y-1+h)%h))*4; // location of the UPPER RIGHT
			let ml = ((x-1+w)%w + w*((y+0+h)%h))*4; // location of the LEFT
			let mc = ((x-0+w)%w + w*((y+0+h)%h))*4; // location of the CENTER PIXEL
			let mr = ((x+1+w)%w + w*((y+0+h)%h))*4; // location of the RIGHT
			let ll = ((x-1+w)%w + w*((y+1+h)%h))*4; // location of the LOWER LEFT
			let lc = ((x-0+w)%w + w*((y+1+h)%h))*4; // location of the LOWER MID
			let lr = ((x+1+w)%w + w*((y+1+h)%h))*4; // location of the LOWER RIGHT
			
            for (let n = 0; n < 3; n++) {
                
                    // rgb channel 
                let p0 = _srcimg.pixels[ul+n]*k1[0][0]; // upper left
                let p1 = _srcimg.pixels[uc+n]*k1[0][1]; // upper mid
                let p2 = _srcimg.pixels[ur+n]*k1[0][2]; // upper right
                let p3 = _srcimg.pixels[ml+n]*k1[1][0]; // left
                let p4 = _srcimg.pixels[mc+n]*k1[1][1]; // center pixel
                let p5 = _srcimg.pixels[mr+n]*k1[1][2]; // right
                let p6 = _srcimg.pixels[ll+n]*k1[2][0]; // lower left
                let p7 = _srcimg.pixels[lc+n]*k1[2][1]; // lower mid
                let p8 = _srcimg.pixels[lr+n]*k1[2][2]; // lower right
                let r1 = p0+p1+p2+p3+p4+p5+p6+p7+p8; 
                
                 p0 = _srcimg.pixels[ul+n]*k2[0][0]; // upper left
                 p1 = _srcimg.pixels[uc+n]*k2[0][1]; // upper mid
                 p2 = _srcimg.pixels[ur+n]*k2[0][2]; // upper right
                 p3 = _srcimg.pixels[ml+n]*k2[1][0]; // left
                 p4 = _srcimg.pixels[mc+n]*k2[1][1]; // center pixel
                 p5 = _srcimg.pixels[mr+n]*k2[1][2]; // right
                 p6 = _srcimg.pixels[ll+n]*k2[2][0]; // lower left
                 p7 = _srcimg.pixels[lc+n]*k2[2][1]; // lower mid
                 p8 = _srcimg.pixels[lr+n]*k2[2][2]; // lower right
                let r2 = p0+p1+p2+p3+p4+p5+p6+p7+p8; 

                // 0 is the minimum value the sum could result in and 1414 is the maximum

                let gradiant = Math.sqrt(r1*r1+r2*r2);
                result[n] = map(gradiant,0,1414,0,255);
              
            }


            let p = new pixel(Math.floor(result[0]),Math.floor(result[1]),Math.floor(result[2]),x,y);

            
            if(p.brihtness === 'light' && p.x >= 5 && p.y >=5 && p.x <= w-5 && p.y <= h-5){
                pixels.push(p);
            }
			
		}
	}	
	  
    return pixels; 
}



class Particle{
  constructor(_loc,_dir,_speed,_color){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this.color = _color;
  	// let col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    let vel = this.dir.copy();
    let d = 1;  //direction change 
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
  }
  update(){
    fill(this.color);
    ellipse(this.loc.x, this.loc.y, 1);
  }
}





