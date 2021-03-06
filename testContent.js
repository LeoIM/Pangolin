//testContent.js
//content for demo scene, showing the ease of use in creating quick games in the pangolin engine
  yellowCube= new pEntity({
    name:"Yellow Cube",
    pos:[2,0,0],
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshLambertMaterial( { color: 0xffff00 } ),
  });
  topCamera=new pPerspectiveCamera({
    pos:[0,2,5],
    rot:[-0.8,0,0]
  })

  floor= new pEntity({
    name:"Floor Cube",
    pos:[0,0,-1],
    geometry:new THREE.BoxGeometry( 10, 1, 10 ),
    material:new THREE.MeshLambertMaterial( { color: 0xffffff } ),
  });


  blueCube=new pEntity({
    name:"Blue Cube",
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshLambertMaterial( { color: 0x0000ff } ),
    children:[pNew(yellowCube),pNew(topCamera)],
    tickFunction:function(){
      var vect=[0,0]

      if(keysDown[87]){
        vect[1]-=0.05;
      }
      if(keysDown[83]){
        vect[1]+=0.05;
      }
      if(keysDown[65]){
        vect[0]+=0.02;
      }
      if(keysDown[68]){
        vect[0]-=0.02;
      }
      this.translate([0,vect[1],0],[0,vect[0],0]);
    }
  });
greenCube= new pEntity({
  name:"Green Cube",
  pos:[2,0,0],
  geometry:new THREE.BoxGeometry( 1, 1, 1 ),
  material:new THREE.MeshLambertMaterial( { color: 0x00ff00 } ),
});


testMap=function(){
}
  testMap=new pMap({
    entities:[],
    name:"Test Map 1"
  });
  testMap.entities.push(pNew(blueCube),pNew(floor));
  camera=testMap.entities[0].children[1].threeObj;

  testMap.entities.push(new pPointLight({color:0x000000,brightness:2,range:10,pos:[2,2,2]}));
  testMap.entities.push(new pPointLight({color:0xff00cc,brightness:2,range:10,pos:[0,-4,2]}));
  testMap.entities.push(new pPointLight({color:0x00ccff,brightness:2,range:10,pos:[-4,-2,2]}));

testMap.loadFunction=function(){
  pLoad(testMap2);
}

testMap2=function(){}
testMap2=new pMap({name:"Test Map 2",entities:[]});
testMap2.entities.push(pNew(greenCube))


redCube= new pEntity({
  name:"Red Cube",
  pos:[2,0,0],
  geometry:new THREE.BoxGeometry( 1, 1, 1 ),
  material:new THREE.MeshLambertMaterial( { color: 0x00ff00 } ),
});
