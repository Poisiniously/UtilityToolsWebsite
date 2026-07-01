function openTool(path) {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("toolFrame").src = path;
}

function closeTool() {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("toolFrame").src = "";
}
