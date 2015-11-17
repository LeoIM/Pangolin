//pangoEd.js
var selectedObject;
function updateSceneObjectTable(){
  tableBuffer="<tr><td>Name</td><td>Position</td><td>Rotation</td><td>Parent</td></tr>";
  var currentEnt;
  for(var map in mapsLoaded){
    for(var ent in mapsLoaded[map].entities){
      tableBuffer+=objectTableRow(mapsLoaded[map].entities[ent],mapsLoaded[map],map,ent)
    }
  }
  document.getElementById("edTable").innerHTML=tableBuffer;
}
function objectTableRow(ent,map,mapnum,entnum){
  rowBuffer="";
  rowBuffer+="<tr>";

    if(ent.children&&ent.children.length>0){
      if(ent.sceneGraphChildrenAreShown){
        rowBuffer+="<td><img src='imgsrc/downArrow.png' height='14' width='14' onClick='toggleMinimizeChildren(mapsLoaded["+mapnum+"].entities["+entnum+"])'> "+ent.name+"</td>"
      }
      else{
      rowBuffer+="<td><img src='imgsrc/rightArrow.png' height='14' width='14' onClick='toggleMinimizeChildren(mapsLoaded["+mapnum+"].entities["+entnum+"])'> "+ent.name+"</td>"
      }
    }
    else{
      rowBuffer+="<td>"+ent.name+"</td>"
    }

    rowBuffer+="<td>"+ent.pos[0]+", "+ent.pos[1]+", "+ent.pos[2]+"</td>"
    rowBuffer+="<td>"+ent.rot[0]+", "+ent.rot[1]+", "+ent.rot[2]+"</td>"
    rowBuffer+="<td>"+map.name+"</td>"
  rowBuffer+="</tr>"
  if (ent.sceneGraphChildrenAreShown&&ent.children&&ent.children.length>0){
    for (var child in ent.children){
      rowBuffer+=objectTableRow(ent.children[child],ent);
    }
  }
return rowBuffer;
}

function toggleMinimizeChildren(ent){
  ent.sceneGraphChildrenAreShown=!ent.sceneGraphChildrenAreShown;
  updateSceneObjectTable();
}

////<tr><td>object name</td><td>amount</td></tr>
updateSceneObjectTable();
