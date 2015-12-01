//pangoInput.js
//INPUT MANAGER ------------------------------------------------------------------------------------
var keysDown=[];
for(var keyCycle=0;keyCycle<222;keyCycle++){
  keysDown[keyCycle]=false;
}
//gives us an array with a bool set to false for each keyCode

document.onkeydown=function(event){
  //if(keysDown[event.keyCode]==false){console.log("Pressed "+event.keyCode);}
  keysDown[event.keyCode]=true;
};
document.onkeyup=function(event){
  //if(keysDown[event.keyCode]==true){console.log("Released "+event.keyCode);}
  keysDown[event.keyCode]=false;
};
//updates the array on keypresses. if window loses focus while a key is held, keyup will not register,
//so look out.

//INPUT MANAGER ------------------------------------------------------------------------------------

//KEEPS GAME FILLING WINDOW ------------------------------------------------------------------------
window.addEventListener('resize', function(){
  if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="editor.html"){
    //makes sure that, if in editor, renderwindow is taking up golden ratio on screen
    renderer.setSize( window.innerWidth*0.618, window.innerHeight/2 );
    camera.aspect = (window.innerWidth*0.618) / (window.innerHeight/2);
    camera.updateProjectionMatrix();
    return;
  }
  //makes sure that, if in playmode, rendering takes up whole screen
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}, true);
//KEEPS GAME FILLING WINDOW ------------------------------------------------------------------------
