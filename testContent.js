//testContent.js
blueCube=function(){
}
  blueCube.prototype=new pEntity({
    name:"Blue Cube",
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
    tickFunction:function(){
      var vect=[0,0]

      if(keysDown[87]){
        vect[1]+=0.5;
      }
      if(keysDown[83]){
        vect[1]-=0.5;
      }
      if(keysDown[65]){
        vect[0]-=0.5;
      }
      if(keysDown[68]){
        vect[0]+=0.5;
      }
      console.log(vect);
      this.move([vect[0],vect[1],0])
    }
  });

greenCube=function(){
}
  greenCube.prototype= new pEntity({
    name:"Green Cube",
    pos:[2,0,0],
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
  });

testMap=function(){
}
  testMap=new pMap({
    entities:[]
  });
  testMap.entities=testMap.entities.concat(new blueCube());
  testMap.entities=testMap.entities.concat(new greenCube());

testMap.loadFunction=function(){
}
