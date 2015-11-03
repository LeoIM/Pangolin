//pango.js
//z is up

window.addEventListener('resize', function(){renderer.setSize( window.innerWidth, window.innerHeight );
}, true);

var mapsLoaded=[];
function pLoad(map){
  if(mapsLoaded.length==0){
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
  }
  
  mapsLoaded=mapsLoaded.concat(map);
  map.onLoad();
};

function pLoop(){
  //get pDeltaTime
}
function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
var pMap=function(options){
  this.entities=options.entities||[];
  this.onLoad=options.loadFunction||function(){}

}

var pObject=function(options){
  this.name=options.name||"Untitled";
  this.pos=options.pos||[0,0,0];
  //position             x,y,z
  this.rot=options.rot||[0,0,0];
  //rotation
  this.tickFunction=options.tickFunction||undefined;
  this.children=options.children||[];
  this.threeObj=options.threeObj||undefined;
  this.move=function(pos,rot){
    this.threeObj.position.x+=pos[0];
    this.threeObj.position.y+=pos[2];
    this.threeObj.position.z+=pos[1];
    if(rot){
      this.threeObj.rotation.x+=pos[0];
      this.threeObj.rotation.y+=pos[1];
      this.threeObj.rotation.z+=pos[2];
    }
  }
  this.moveTo=function(pos,rot){
    this.threeObj.position.x=pos[0];
    this.threeObj.position.y=pos[2];
    this.threeObj.position.z=pos[1];
    if(rot){
      this.threeObj.rotation.x=rot[0];
      this.threeObj.rotation.y=rot[1];
      this.threeObj.rotation.z=rot[2];
    }
  }
}

var pEntity=function(options){

  this.scl=options.scl||[1,1,1];
  //scale                x,y,z

  this.doesRender=options.doesRender||true;
  this.geometry=options.geometry||undefined;
  this.material=options.material||undefined;
  //all must return true to render

  this.doesCollide=options.doesCollide||true;
  this.collider=options.collider||undefined;
  //leave undefined for no collision

  this.resize=function(scl){
    this.threeObj.scale.x=scl[0];
    this.threeObj.scale.y=scl[2];
    this.threeObj.scale.z=scl[1];
  }
  this.scale=function(scl){
    this.threeObj.scale.x=this.threeObj.scale.x*scl[0];
    this.threeObj.scale.y=this.threeObj.scale.y*scl[2];
    this.threeObj.scale.z=this.threeObj.scale.z*scl[1];
  }
  this.mesh=new THREE.Mesh(this.geometry,this.material);
  this.threeObj=this.mesh;
}
pInherit(pEntity,pObject);

var pPointLight =function(options){
  this.brightness=options.brightness||100;
  this.color=options.color;
  //hexadecimal format '#FFFFFF'
  this.range=options.range||5;
}
pInherit(pPointLight,pObject);

var pCube =function(size,options){
  this.mesh=new THREE.Mesh( geometry, material );
}
pInherit(pCube,pEntity);

var pInherit = function (child, parent) {
  //http://www.sitepoint.com/simple-inheritance-javascript/
    child.prototype = Object.create(parent.prototype);
};
