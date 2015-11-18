//pangoEd.js
var selectedObject=mapsLoaded[0].entities[0];
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
function objectTableRow(ent,map,mapnum,entnum,parentArray){
  rowBuffer="";
  rowBuffer+="<tr onClick='selectObject(mapsLoaded["+mapnum+"].entities["+entnum+"])'>";

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
  selectedObject=obj;
  input_pos_x.value=obj.pos.x;
  input_pos_y.value=obj.pos.y;
  input_pos_z.value=obj.pos.z;
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
