//pango.js
//z is up
var
function mainLoop(){


}

var GameObject=function(options){
  this.pos=options.pos||[0,0,0];
  //position             x,y,z
  this.rot=options.rot||[0,0,0];
  //rotation
  this.tickFunction=options.tickFunction||undefined;
  this.children=options.children||[];
}

var PangoEntity=function(options){

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
pangoInherit(PangoEntity,GameObject);

var PointLightObject =function(options){
  this.brightness=options.brightness||100;
  this.color=options.color;
  //TODO: find if three.js wants [1,1,1] or '#FFFFFF'

  this.range=options.range||5;
  //i think this is a thing three will want?
}
pangoInherit(PointLightObject,GameObject);

var pangoInherit = function (child, parent) {
  //http://www.sitepoint.com/simple-inheritance-javascript/
    child.prototype = Object.create(parent.prototype);
};
