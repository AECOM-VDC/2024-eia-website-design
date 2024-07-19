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

L.control.layers(baseMaps, overlayMaps).addTo(map);

// let VpIconPixelSize = [280, 279];
// let VpIconScale = 0.18;
// let VpIconSize = [
//   VpIconPixelSize[0] * VpIconScale,
//   VpIconPixelSize[1] * VpIconScale,
// ];
// let VpIconAnchor = [VpIconSize[0] / 2, VpIconSize[1] / 2];
// let VPPopupAnchor = [0, VpIconSize[1] / 2];
// let bottomOffset = [0, 16];

// let VpIcon = L.icon({
//   iconUrl: "./image/vp_marker.png",
//   iconSize: VpIconSize,
//   iconAnchor: VpIconAnchor,
// });

// let VPA1 = L.marker([22.267652, 114.264593], {
//   icon: VpIcon,
//   title: "VP-A1",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A1", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPA2 = L.marker([22.267573, 114.272768], {
//   icon: VpIcon,
//   title: "VP-A2",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A2", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPA3 = L.marker([22.272696, 114.270043], {
//   icon: VpIcon,
//   title: "VP-A3",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A3", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPA4 = L.marker([22.276478, 114.271009], {
//   icon: VpIcon,
//   title: "VP-A4",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A4", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPA5 = L.marker([22.274056, 114.273927], {
//   icon: VpIcon,
//   title: "VP-A5",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A5", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPA6 = L.marker([22.270144, 114.274507], {
//   icon: VpIcon,
//   title: "VP-A6",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A6", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPA7 = L.marker([22.265567, 114.276749], {
//   icon: VpIcon,
//   title: "VP-A7",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-A7", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPB1 = L.marker([22.291519, 114.25704], {
//   icon: VpIcon,
//   title: "VP-B1",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-B1", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPB2 = L.marker([22.297842, 114.256911], {
//   icon: VpIcon,
//   title: "VP-B2",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-B2", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

// let VPB3 = L.marker([22.290248, 114.246011], {
//   icon: VpIcon,
//   title: "VP-B3",
// })
//   .addTo(map)
//   .on("click", onVpClick)
//   .bindTooltip("VP-B3", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: bottomOffset,
//   });

//add text to map
// let text = L.divIcon({
//   className: "divIcon",
//   html: "Uptown",
// });
// L.marker([22.426537, 114.002385], { icon: text }).addTo(map);

//pup-up
let popup = L.popup();

function onMapClick(e) {
  popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
}

// map.on("click", onMapClick);
//

// zoom the map to the rectangle bounds
//delay 0.5s to call fitBounds
// setTimeout(function () {
//   setInitView();
// }, 100);

// function setInitView() {
//   map.invalidateSize();
//   map.fitBounds(siteBounds);
// }
// map.invalidateSize();
// map.fitBounds(siteBounds);

// function setDivSize(params) {
//   //set div height and width when window resize
//   let bodyDiv = document.getElementById("body");
//   let mapDiv = document.getElementById("map");
//   let mapDivWidth = bodyDiv.offsetWidth;
//   let mapDivHeight = bodyDiv.offsetHeight;
//   mapDiv.style.height = mapDivHeight + "px";
//   mapDiv.style.width = mapDivWidth + "px";
// }

//run setDivSize when page onload
// window.onload = function () {
//   setDivSize();
//   setInitView();
//   console.log("onload");
// };

//add a logo to map at bottom right
let logo = L.control({ position: "bottomright" });
logo.onAdd = function (map) {
  let div = L.DomUtil.create("div", "Maplogo");
  div.innerHTML =
    '<img id="map_logo" src="./image/landsdlogo.jpg" alt="logo" />';
  return div;
};
logo.addTo(map);

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
