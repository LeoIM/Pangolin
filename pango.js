//pango.js
//z is up

var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
console.log(camera);
camera.position.y = 2;
camera.position.z = 5;
//TODO: comment this out once we have working camera system
var mapsLoaded=[];
function pLoad(map){
  if(mapsLoaded.length==0){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer()
    if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="editor.html"){
      renderer.setSize( window.innerWidth, window.innerHeight/2 );
      document.getElementById("renderWindow").appendChild( renderer.domElement );
      camera.aspect = window.innerWidth / (window.innerHeight/2);
      camera.updateProjectionMatrix();
    }
    else{
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild( renderer.domElement );
      camera.aspect = window.innerWidth / (window.innerHeight);
      camera.updateProjectionMatrix();

    }
    pLoop();
  }
  mapsLoaded=mapsLoaded.concat(map);
  for(var pObj in map.entities){
    //console.log(map.entities[pObj]);
    if(map.entities[pObj].threeObj){
      scene.add(map.entities[pObj].threeObj);
      map.entities[pObj].threeSyncTransform();
      loadChildren(map.entities[pObj]);
    }
  }
  map.loadFunction();
};

function loadChildren(pObj){
  if(pObj.children.length>0){
    for(var pChild in pObj.children){
      //console.log(pObj.children[pObj]);
      if(pObj.children[pChild].threeObj){
        pObj.threeObj.add(pObj.children[pChild].threeObj);
        pObj.children[pChild].threeSyncTransform();
      }
      loadChildren(pObj.children[pChild]);
    }
  }
}
function pLoop(){
  requestAnimationFrame(pLoop);
  if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)!="editor.html"){
    for(var map in mapsLoaded){
      for(var ent in mapsLoaded[map].entities){
        if (mapsLoaded[map].entities[ent].tickFunction){
          mapsLoaded[map].entities[ent].tickFunction();
        }
      //if ()
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

function pPointLight(options){
  var options = options || {};
  pObject.call(this,options);
  this.brightness=options.brightness||10;
  this.color=options.color||0xffffff;
  //hexadecimal format '#FFFFFF'
  this.range=options.range||5;
  this.threeObj=new THREE.PointLight(this.color,this.brightness,this.range);
}
function pPerspectiveCamera(options){
  var options = options || {};
  pObject.call(this,options);
  this.fov=options.fov||70;
  this.nearClippingPlane||0.1;
  this.farClippingPlane||1000;

  this.threeObj=new THREE.PerspectiveCamera(this.fov,window.innerWidth/window.innerHeight,this.nearClippingPlane,this.farClippingPlane );
  console.log(this.threeObj);
}
