//load.js
function loadScript(file){
  //allows us to load in big files like three.js without worrying about smaller files that should
  //load after, such as pango.js, but are dependent on the larger files, not being able to execute
  //correctly upon launch
  var load=document.createElement('script');
  load.src=file;
  load.async = false;
  document.head.appendChild(load);
}

loadScript("libraries/three.js");
loadScript("pango.js");
loadScript("pangoInput.js");
loadScript("testContent.js");

if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=="editor.html"){
  //for editor specific js
  loadScript("pangoEd.js");
}
