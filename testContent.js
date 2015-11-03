//testContent.js
blueCube=function(){
}
  blueCube.prototype=new pEntity({
    name:"Blue Cube",
    geometry:new THREE.BoxGeometry( 1, 1, 1 ),
    material:new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
  });

testMap=function(){
}
  testMap.prototype=new pMap({
    entities:[new blueCube]
  });
