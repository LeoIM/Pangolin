//load.js
function loadScript(file){
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
  loadScript("pangoEd.js");
}
