//pangoEd.js

function updateSceneObjectTable(){
  tableBuffer="";
  var currentEnt;
  for(var map in mapsLoaded){
    for(var ent in mapsLoaded[map].entities){
      currentEnt=mapsLoaded[map].entities[ent];
      tableBuffer+="<tr>";
        tableBuffer+="<td>"+currentEnt.name+"</td>"
      tableBuffer+="</tr>"
    }
  }
  document.getElementById("edTable").innerHTML=tableBuffer;
}

////<tr><td>object name</td><td>amount</td></tr>
updateSceneObjectTable();
