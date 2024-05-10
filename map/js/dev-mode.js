let devMode = true;

if (devMode) {
  //pop up coordinates when clicking on map
  var popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);

    //copy coordinates to clipboard
    var copyText = e.latlng.toString();
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        // alert("Coordinates copied to clipboard: " + copyText);
      })
      .catch((error) => {
        console.error("Failed to copy coordinates to clipboard: ", error);
      });
  }
  map.on("click", onMapClick);
}
