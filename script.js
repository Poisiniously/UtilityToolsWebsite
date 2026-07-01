const popup = document.getElementById("popup");
const frame = document.getElementById("toolFrame");

function openTool(path){

    frame.src = path;

    popup.style.display = "flex";

}

function closeTool(){

    frame.src = "";

    popup.style.display = "none";

}
