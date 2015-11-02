//pango.js

function GameObj(options){
  this.pos=options.pos||[0,0,0];
  //position             x,y,z
  this.scl=options.scl||[1,1,1];
  //scale                x,y,z
  this.rot=options.rot||[0,0,0];
  
  this.children=options.children||[];

}

function Entity(options){
}
