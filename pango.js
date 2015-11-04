//pango.js
//z is up

//INPUT MANAGER ------------------------------------------------------------------------------------
var keysDown=[];
for(var keyCycle=0;keyCycle<222;keyCycle++){
  keysDown[keyCycle]=false;
}
document.onkeydown=function(event){
  //if(keysDown[event.keyCode]==false){console.log("Pressed "+event.keyCode);}
  keysDown[event.keyCode]=true;
};
document.onkeyup=function(event){
  //if(keysDown[event.keyCode]==true){console.log("Released "+event.keyCode);}
  keysDown[event.keyCode]=false;
};
//INPUT MANAGER ------------------------------------------------------------------------------------

//KEEPS GAME FILLING WINDOW ------------------------------------------------------------------------
window.addEventListener('resize', function(){renderer.setSize( window.innerWidth, window.innerHeight );
}, true);
//KEEPS GAME FILLING WINDOW ------------------------------------------------------------------------

var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 2;
camera.position.z = 5;
//TODO: comment this shizzle out once we have working camera system
var mapsLoaded=[];
function pLoad(map){
  if(mapsLoaded.length==0){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    pLoop();
  }
  mapsLoaded=mapsLoaded.concat(map);
  for(var pObj in map.entities){
    console.log(map.entities[pObj]);
    if(map.entities[pObj].threeObj){
      scene.add(map.entities[pObj].threeObj);
      map.entities[pObj].threeSyncTransform();

    }
  }
  map.loadFunction();
};
function pLoop(){
  requestAnimationFrame(pLoop);
  for(var map in mapsLoaded){
    for(var ent in mapsLoaded[map].entities){
      if (mapsLoaded[map].entities[ent].tickFunction){
        mapsLoaded[map].entities[ent].tickFunction();
      }
    }
  }
  renderer.render( scene, camera );
}

function pMap(options){
  var options = options || {};
  this.entities=options.entities||[];
  this.loadFunction=options.loadFunction||function(){}
}

function pObject(options){
  var options = options || {};
  this.name=options.name||"Untitled";
  this.pos=options.pos||[0,0,0];
  //position             x,y,z
  this.rot=options.rot||[0,0,0];
  //rotation
  this.tickFunction=options.tickFunction||undefined;
  this.children=options.children||[];
  this.threeObj=options.threeObj||undefined;
  this.move=function(pos,rot){
    this.pos[0]+=pos[0];
    this.pos[2]+=pos[2];
    this.pos[1]+=pos[1];
    if(rot){
      this.rot[0]+=rot[0];
      this.rot[1]+=rot[1];
      this.rot[2]+=rot[2];
    }
    this.threeSyncTransform();
  }
  this.moveTo=function(pos,rot){
    this.pos=pos;
    if(rot){
      this.rot=rot;
    }
    this.threeSyncTransform();
  }
  this.threeSyncTransform=function(){
    this.threeObj.position.x=this.pos[0];
    this.threeObj.position.y=this.pos[2];
    this.threeObj.position.z=this.pos[1];
    this.threeObj.rotation.x=this.rot[0];
    this.threeObj.rotation.y=this.rot[1];
    this.threeObj.rotation.z=this.rot[2];
  }
}

function pEntity(options){
  var options = options || {};
  pObject.call(this,options);
  //inherits properties of pObject called with same options - MUST BE BEFORE OTHER DECLARATIONS

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

function pPointLight(){
  var options = options || {};
  pObject.call(this,options);
  this.brightness=options.brightness||100;
  this.color=options.color;
  //hexadecimal format '#FFFFFF'
  this.range=options.range||5;
}
