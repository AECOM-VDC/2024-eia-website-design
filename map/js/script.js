//>>get SRArray from data/SRs.js
SrArray.forEach((element) => {
  element.on("click", onVpClick);
});

// let imageOverlay = L.imageOverlay(imageUrl, siteBounds, {
//   opacity: 0.8,
//   errorOverlayUrl: errorOverlayUrl,
//   alt: altText,
//   interactive: true,
// });

//>> Image Filter

let myFilter = [
  // "blur:500px",
  "brightness:500%",
  // "contrast:130%",
  "saturate:50%",
];

//>> esri image layer
//Tiles
// let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// });

// let Esri_WorldImagery = L.tileLayer(
//   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//   {
//     attribution:
//       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
//   }
// );

//add hongkong topography
let HkBase = L.layerGroup.hongKong("topography.tc");
let HkSate = L.tileLayer.hongKong("basemap.imagery");

//>> set map
let map = L.map("map", {
  attributionControl: false,
  //>> zoom
  minZoom: 13,
  maxZoom: 17,
  // zoomDelta: 1,
  zoomSnap: 0,
  // wheelPxPerZoomLevel: 120,
  scrollWheelZoom: false, // disable original zoom function
  smoothWheelZoom: true, // enable smooth zoom
  smoothSensitivity: 1, // zoom speed. default is 1
});

//group
let sr = L.layerGroup(SrArray);
let vp = L.layerGroup(VPArray);
let Lvi_Clickable = L.layerGroup(LVIArrayClickable);

// let lvi = L.layerGroup(LVIArray);

map.addLayer(HkSate);
map.addLayer(sr);
map.addLayer(vp);
// map.addLayer(Lvi_Clickable);

//LVI on off
window.addEventListener("message", (event) => {
  if (event.data === "LVIon") {
    map.addLayer(markerCluster);
  } else if (event.data === "LVIoff") {
    map.removeLayer(markerCluster);
  }
});

map.addLayer(markerCluster);

// map.addLayer(lvi);

//>> map coordinate
// map.setView([22.28036, 114.255152], 14);

//>> Image Overlay
let imageUrl = "./image/map_20240612_2_5k.webp";
let errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let altText = "image";
let siteBounds = L.latLngBounds([
  [22.250762, 114.224521],
  [22.317078, 114.295996],
]);

let viewBounds = L.latLngBounds([
  [22.262727, 114.243908],
  [22.299261, 114.276094],
]);

//set view to fit the site bounds
map.fitBounds(viewBounds);

let imageOverlay = L.imageOverlay(imageUrl, siteBounds, {
  opacity: 1,
  errorOverlayUrl: errorOverlayUrl,
  alt: altText,
  interactive: true,
}).addTo(map);

//>> Overlay Rectangle
// L.rectangle(siteBounds, { color: "#ffd96c", weight: 1 }).addTo(map);

L.control
  .attribution({
    prefix:
      'Map base tiles from <a href="https://geodata.gov.hk/gs/imagery-map-api" target="_blank">Lands Department</a>',
  })
  .addTo(map);

map.attributionControl
  .addAttribution
  //add image tag
  // '<a href="https://geodata.gov.hk/gs/imagery-map-api">Imagery Map API</a>'
  ();

// define rectangle geographical bounds
// let bounds = [
//   [54.559322, -5.767822],
//   [56.1210604, -3.02124],
// ];

// create an orange rectangle
// L.rectangle(latLngBounds, { color: "#ff7800", weight: 1 }).addTo(map);

// >> Add legend

let legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "legend");
  div.style.display = "none";
  let divCon = L.DomUtil.create("div", "container");
  //append a child div to div
  divCon.appendChild(div);

  // Add close button to the top-right corner of the container div
  let closeButton = L.DomUtil.create("button", "close-button");
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
  let toggleButton = L.DomUtil.create("button", "toggle-button");
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

let baseMaps = {
  "Satellite Map": HkSate,
  "Base Map": HkBase,
};
let overlayMaps = {
  // "Sensitive Receivers": sr,
  "Image Overlay": imageOverlay,
  "View Points": vp,
  "Visual Impacts": markerCluster,
};
let imageOverlayMaps = {
  "Image Overlay": imageOverlay,
};

L.control.layers(baseMaps, overlayMaps, { position: "bottomleft" }).addTo(map);

//pup-up
let popup = L.popup();

function onMapClick(e) {
  popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
}

//add a logo to map at bottom right
let logo = L.control({ position: "bottomright" });
logo.onAdd = function (map) {
  let div = L.DomUtil.create("div", "Maplogo");
  div.innerHTML =
    '<img id="map_logo" src="./image/landsdlogo.jpg" alt="logo" />';
  return div;
};
logo.addTo(map);

//>> Dev Mode Toggle
let devMode = false;

let devPopup = L.popup();

function onMapClick(e) {
  devPopup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);

  // Copy coordinates to clipboard
  let copyText = e.latlng.toString().replace("LatLng(", "").replace(")", "");
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      // Optional: alert or console.log on success
    })
    .catch((error) => {
      console.error("Failed to copy coordinates to clipboard: ", error);
    });
}

function toggleDevMode() {
  if (devMode) {
    map.on("click", onMapClick);
  } else {
    map.off("click", onMapClick);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "I" || event.key === "i") {
    // Assuming devMode is a global variable; toggle its value
    devMode = !devMode;
    toggleDevMode(); // Apply changes immediately
    console.log("devMode: " + devMode);
  }
});
