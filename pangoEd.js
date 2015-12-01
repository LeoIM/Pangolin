//pangoEd.js

var selectedObject;
//object selected in editor

var selectedHighlight=undefined;
//yellow outline around object currently selected
//TODO: get this to delete upon deselection

function updateSceneObjectTable(){
  //makes a table showing every object in the scene, for the UI
  tableBuffer="<tr><td>Name</td><td>Position</td><td>Rotation</td><td>Parent</td></tr>";
  var currentEnt;
  for(var map in mapsLoaded){
    for(var ent in mapsLoaded[map].entities){
      tableBuffer+=objectTableRow(mapsLoaded[map].entities[ent],mapsLoaded[map]);
      //generates a row on the table for the object
    }
  }
  document.getElementById("edTable").innerHTML=tableBuffer;
  // print table
}
function objectTableRow(ent,map){
  rowBuffer="";
  //rowBuffer+="<tr onClick='selectObject(mapsLoaded["+mapnum+"].entities["+entnum+"])'>";
  rowBuffer+="<tr onClick='selectObject(indexArray["+ent.indexNumber+"])'>";
  //sets it up so that clicking on the row for the object in the sccene graph selects it
    if(ent.children&&ent.children.length>0){
      //prints out a > or \/ icon when an object has children to depending on whether those children are minimized in the editor
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
    //prints transform in scene graph
    rowBuffer+="<td>"+map.name+"</td>"
    //prints name of map if a top level object, prints parent object if a child
  rowBuffer+="</tr>"

  if (ent.sceneGraphChildrenAreShown&&ent.children&&ent.children.length>0){
    rowBuffer+="<tr><table><tbody class='subTable'>"
    for (var child in ent.children){
      rowBuffer+=objectTableRow(ent.children[child],ent);
      //prints children of object recursively
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
  //used to minimize div of object properties
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

  document.getElementById("input_pos_x").value=obj.pos[0];
  document.getElementById("input_pos_y").value=obj.pos[1];
  document.getElementById("input_pos_z").value=obj.pos[2];
  document.getElementById("input_rot_x").value=obj.rot[0];
  document.getElementById("input_rot_y").value=obj.rot[1];
  document.getElementById("input_rot_z").value=obj.rot[2];
  //fills the input boxes for transform with transofrm values for newly selected object

  if(selectedHighlight!=undefined){scene.remove(selectedHighlight);}
  //this doesn't work
  //TODO: make this work

  if(selectedObject.mesh){
    //selectedHighlight=new THREE.EdgesHelper( selectedObject.threeObj, 0xffcc00 )
    scene.add(new THREE.EdgesHelper( selectedObject.threeObj, 0xffcc00 ));
    //gives newly selected object a snazzy-looking yellow outline
  }
}
function updateSelectedTransform(){
  //used upon change in transform inputs
  selectedObject.moveTo([input_pos_x.value,input_pos_y.value,input_pos_z.value],[input_rot_x.value,input_rot_y.value,input_rot_z.value]);
  updateSceneObjectTable();
}
////<tr><td>object name</td><td>amount</td></tr>
updateSceneObjectTable();
