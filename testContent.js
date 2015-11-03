//testContent.js
blueCube=function(){
}
  blueCube.prototype=new pEntity({
    name:"Blue Cube",
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
    tickFunction:function(){}
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
