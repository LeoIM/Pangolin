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
window.addEventListener('resize', function(){renderer.setSize( window.innerWidth, window.innerHeight );
}, true);
//KEEPS GAME FILLING WINDOW ------------------------------------------------------------------------
