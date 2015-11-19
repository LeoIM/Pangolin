//pangoEd.js
var selectedObject;
function updateSceneObjectTable(){
  tableBuffer="<tr><td>Name</td><td>Position</td><td>Rotation</td><td>Parent</td></tr>";
  var currentEnt;
  for(var map in mapsLoaded){
    for(var ent in mapsLoaded[map].entities){
      tableBuffer+=objectTableRow(mapsLoaded[map].entities[ent],mapsLoaded[map]);
    }
  }
  document.getElementById("edTable").innerHTML=tableBuffer;
}
function objectTableRow(ent,map){
  rowBuffer="";
  //rowBuffer+="<tr onClick='selectObject(mapsLoaded["+mapnum+"].entities["+entnum+"])'>";
  rowBuffer+="<tr onClick='selectObject(indexArray["+ent.indexNumber+"])'>";
    if(ent.children&&ent.children.length>0){
      if(ent.sceneGraphChildrenAreShown){
        rowBuffer+="<td><img src='imgsrc/downArrow.png' height='14' width='14' onClick='toggleMinimizeChildren(indexArray["+ent.indexNumber+"])'> "+ent.name+"</td>"
      }
      else{
      rowBuffer+="<td><img src='imgsrc/rightArrow.png' height='14' width='14' onClick='toggleMinimizeChildren(indexArray["+ent.indexNumber+"])'> "+ent.name+"</td>"
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
    rowBuffer+="<tr><table><tbody class='subTable'>"
    for (var child in ent.children){
      rowBuffer+=objectTableRow(ent.children[child],ent);
    }
    rowBuffer+="</tbody></table></tr>"
  }

return rowBuffer;
}

function toggleMinimizeChildren(ent){
  ent.sceneGraphChildrenAreShown=!ent.sceneGraphChildrenAreShown;
  updateSceneObjectTable();
}
function toggleVisibility(id){
  var x = document.getElementById(id);
  if (x.style.display=='block'){
    x.style.display='none';
    return;
  }
  x.style.display='block'
}
function selectObject(obj){
  console.log("selecting "+obj.name);
  selectedObject=obj;
  document.getElementById(input_pos_x).value=obj.pos.x;
  document.getElementById(input_pos_y).value=obj.pos.y;
  document.getElementById(input_pos_z).value=obj.pos.z;
}
function updateSelectedTransform(){
  selectedObject.moveTo([input_pos_x.value,input_pos_y.value,input_pos_z.value]);
  updateSceneObjectTable();
}
function makeIndexString(object){
  alert("Error: "+object.name+" has too many parents.")
}

////<tr><td>object name</td><td>amount</td></tr>
updateSceneObjectTable();
