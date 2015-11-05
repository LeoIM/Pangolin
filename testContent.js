//testContent.js
yellowCube=function(){
}
  yellowCube.prototype= new pEntity({
    name:"Yellow Cube",
    pos:[2,0,0],
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshLambertMaterial( { color: 0xfffff0 } ),
  });

blueCube=function(){
}
  blueCube.prototype=new pEntity({
    name:"Blue Cube",
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshLambertMaterial( { color: 0x0000ff } ),
    children:[new yellowCube()],
    tickFunction:function(){
      var vect=[0,0]

      if(keysDown[87]){
        vect[1]+=0.05;
      }
      if(keysDown[83]){
        vect[1]-=0.05;
      }
      if(keysDown[65]){
        vect[0]-=0.05;
      }
      if(keysDown[68]){
        vect[0]+=0.05;
      }
      this.move([vect[0],vect[1],0]);
    }
  }),
greenCube=function(){
}
greenCube.prototype= new pEntity({
  name:"Green Cube",
  pos:[2,0,0],
  geometry:new THREE.BoxGeometry( 1, 1, 1 ),
  material:new THREE.MeshLambertMaterial( { color: 0x00ff00 } ),
});


testMap=function(){
}
  testMap=new pMap({
    entities:[]
  });
  testMap.entities=testMap.entities.concat(new blueCube());
  testMap.entities=testMap.entities.concat(new greenCube());
  testMap.entities=testMap.entities.concat(new pPointLight({color:0xffffff,brightness:2,range:10,pos:[2,2,2]}));
testMap.loadFunction=function(){
}

testMap2=function(){}
testMap2=new pMap({entities:[]});
testMap.entities=testMap.entities.concat(new pPointLight({color:0xFFE4AD,brightness:2,range:10,pos:[1,1,2]}))
