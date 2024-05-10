var legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.style.display = "none";
  var divCon = L.DomUtil.create("div", "container");
  //append a child div to div
  divCon.appendChild(div);

  // Add close button to the top-right corner of the container div
  var closeButton = L.DomUtil.create("button", "close-button");
  closeButton.style.display = "none";
  closeButton.innerHTML = "╳";
  closeButton.onclick = function () {
    closeButton.style.display = "none";
    div.style.display = "none";
    toggleButton.style.display = "block";
  };
  divCon.appendChild(closeButton);

  div.innerHTML += "<div><h4>Legend</h4></div>";
  div.innerHTML +=
    '<i class="legend-boundary" style="border: 3px solid #fc0303"></i><span>Project Boundary</span><br>';
  //   div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';

  div.innerHTML +=
    '<img class="legend-icon legend-marker" src="./image/vp_marker.png" alt="View Point"/><span>View Points</span><br>';
  div.innerHTML +=
    '<img class="legend-icon" src="./image/marker-icon-green.png" alt="View Point"/><span>Sensitive Receiver Locations</span><br>';
  // Add button to toggle legend visibility
  var toggleButton = L.DomUtil.create("button", "toggle-button");
  toggleButton.innerHTML = "Display Legend";
  toggleButton.onclick = function () {
    if (div.style.display == "none") {
    console.log("show");

      div.style.display = "block";
      closeButton.style.display = "block";
      toggleButton.style.display = "none";
    } else {
    console.log("hide");

      div.style.display = "none";
    }
  };
  divCon.appendChild(toggleButton);

  return divCon;
};

legend.addTo(map);
