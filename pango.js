//pango.js
//z is up

var indexArray=[];

var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
//console.log(camera);
camera.position.y = 2;
camera.position.z = 5;
//TODO: comment this out once we have working camera system
var mapsLoaded=[];
function pNew(object){
  //returns a new object with all the properties of arg object
  return Object.assign({},object);
}
function pLoad(map){
  if(mapsLoaded.length==0){
    //if this is the first level to be loaded, intialize three.js rendering
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer()
    if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="editor.html"){
    //if is in editor
      renderer.setSize( window.innerWidth, window.innerHeight/2 );
      document.getElementById("renderWindow").appendChild( renderer.domElement );
      camera.aspect = window.innerWidth / (window.innerHeight/2);
      camera.updateProjectionMatrix();
    }
    else{
    //elif is in product
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild( renderer.domElement );
      camera.aspect = window.innerWidth / (window.innerHeight);
      camera.updateProjectionMatrix();
    }
    pLoop();
    //activates core logic loop
  }
  mapsLoaded.push(map);
  for(var pObj in map.entities){
    //console.log(map.entities[pObj]);
    if(map.entities[pObj].threeObj){

      //adds to three.js scene
      scene.add(map.entities[pObj].threeObj);
      map.entities[pObj].threeSyncTransform();
      //recurses through object's children
      loadChildren(map.entities[pObj]);
    }
  }
  //executes a function specific to the map object, by default does nothing
  map.loadFunction();
};

function loadChildren(pObj){
  //for recursing through children of objects upon load to add them to three.js scene
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
function loadObj(pObj){
  if(pObj.threeObj){
    pObj.threeSyncTransform();
  }
  if(pObj.tickFunctionString){
    eval("pObj.tickFunction=function(){"+tickFunctionString+"};");
  }
  loadChildren(pObj);
}

function pLoop(){

  requestAnimationFrame(pLoop);
  // repeats itself, better than scheduled loop because it will stop in event of the window losing focus

  if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)!="editor.html"){
    for(var map in mapsLoaded){
      for(var ent in mapsLoaded[map].entities){
        if (mapsLoaded[map].entities[ent].tickFunction){
          mapsLoaded[map].entities[ent].tickFunction();
        }
        //TODO: implement tick functions for children
        //if ()
      }
    }
  }

  //gets the frame to appear all pretty like
  renderer.render( scene, camera );
}

function pMap(options){
  var options = options || {};

  this.entities=options.entities||[];
  //one dimensional array of objects within scene, does not include children of objects
  this.loadFunction=options.loadFunction||function(){}
  this.name=options.name||"Untitled"
}

function pObject(options){
  var options = options || {};
  this.name=options.name||"Untitled";
  this.pos=options.pos||[0,0,0];
  //position             x,y,z
  this.rot=options.rot||[0,0,0];
  //rotation
  this.tickFunction=options.tickFunction||undefined;
  //function to execute every frame
  this.children=options.children||[];
  this.sceneGraphChildrenAreShown=true;
  //in editor, are children not minimized on scene graph
  this.threeObj=options.threeObj||undefined;
  //object in three.js
  this.translate=function(pos,rot){
    this.threeObj.translateX( pos[0] );
    this.threeObj.translateY( pos[2] );
    this.threeObj.translateZ( pos[1] );

    this.pos[0]=this.threeObj.position.x;
    this.pos[2]=this.threeObj.position.y;
    this.pos[1]=this.threeObj.position.z;

    if(rot){
        this.rot[0]+=rot[0];
        this.rot[1]+=rot[1];
        this.rot[2]+=rot[2];
        this.threeSyncTransform();
    }
  }
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
    //makes sure object in engine has same coords. and rot. as object in three.js scene
    this.threeObj.position.x=this.pos[0];
    this.threeObj.position.y=this.pos[2];
    this.threeObj.position.z=this.pos[1];
    this.threeObj.rotation.x=this.rot[0];
    this.threeObj.rotation.y=this.rot[1];
    this.threeObj.rotation.z=this.rot[2];
  }
  this.removeThreeObj=function(){
    scene.remove(this.threeObj)
  }
  //upon object creation, adds to indexarray and sets own indexnumber property as position in array
  indexArray.push(this);
  this.indexNumber=indexArray.indexOf(this);
}


function pEntity(options){
  var options = options || {};
  pObject.call(this,options);
  //inherits properties of pObject called with same options - MUST BE BEFORE OTHER DECLARATIONS

  this.scl=options.scl||[1,1,1];
  //scale                x,y,z
  this.geometry=options.geometry||undefined;
  this.material=options.material||undefined;
  //these must return truthy to render

  this.doesCollide=options.doesCollide||true;
  this.collider=options.collider||undefined;
  //leave undefined for no collision
    //doesn't work even if you don't leave it undefined

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
  //in world units
  this.threeObj=new THREE.PointLight(this.color,this.brightness,this.range);
  this.name=options.name||"Point Light";
}
function pPerspectiveCamera(options){
  var options = options || {};
  pObject.call(this,options);
  this.fov=options.fov||70;
  //field of view for camera, in degrees
  this.nearClippingPlane||0.1;
  //how close something needs to be before it will not render
  this.farClippingPlane||1000;
  //how far something needs to be before it will not render
  this.name=options.name||"Perspective Camera";
  this.threeObj=new THREE.PerspectiveCamera(this.fov,window.innerWidth/window.innerHeight,this.nearClippingPlane,this.farClippingPlane );
  //console.log(this.threeObj);
}
