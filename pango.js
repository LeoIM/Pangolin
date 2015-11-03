//pango.js

//z is up

var GameObj=function(options){
  this.pos=options.pos||[0,0,0];
  //position             x,y,z
  this.rot=options.rot||[0,0,0];
  //rotation
  this.children=options.children||[];
}

var Entity=function(options){

  this.scl=options.scl||[1,1,1];
  //scale                x,y,z

  this.doesRender=options.doesRender||true;
  this.mesh=options.mesh||undefined;
  this.material=options.material||undefined;
  //all must return true to render

  this.doesCollide=options.doesCollide||true;
  this.collider=options.collider||undefined;
  //leave undefined for no collision
}
inherit(Entity,GameObj);

var PointLight=function(options){
  this.brightness=options.brightness||100;
  this.color=options.color;
  //TODO: find if three.js wants [1,1,1] or '#FFFFFF'

  this.range=options.range||5;
  //i think this is a thing three will want?
}
inherit(PointLight,GameObj);

var SpotLight=function(options){
  this.brightness=options.brightness||100;
  this.color=options.color;
  //TODO: find if three.js wants [1,1,1] or '#FFFFFF'
  this.fov=options.fov||30;
  this.range=options.range||5;
  //i think this is a thing three will want?
}
inherit(SpotLight,GameObj);


var inherit = function (child, parent) {
  //http://www.sitepoint.com/simple-inheritance-javascript/
    child.prototype = Object.create(parent.prototype);
};
