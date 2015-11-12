//pangoInput.js
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
window.addEventListener('resize', function(){
if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="editor.html"){
  renderer.setSize( window.innerWidth, window.innerHeight/2 );
  camera.aspect = window.innerWidth / (window.innerHeight/2);
  camera.updateProjectionMatrix();
return;
}
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}, true);
//KEEPS GAME FILLING WINDOW ------------------------------------------------------------------------
