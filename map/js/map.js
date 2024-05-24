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

//group
let sr = L.layerGroup(SrArray);

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
  layers: [HkSate, sr],
  minZoom: 14,
  maxZoom: 16,
  zoomDelta: 1,
  zoomSnap: 0.22,
  wheelPxPerZoomLevel: 120,
});

//>> map coordinate
map.setView([22.346345, 114.068255], 15);

//>> Image Overlay
let imageUrl = "./image/TYLL-map-compressed_20240523.png";
let errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let altText = "image";
let siteBounds = L.latLngBounds([
  [22.328243, 114.043917],
  [22.363491, 114.094155],
]);

// zoom the map to the rectangle bounds

let imageOverlay = L.imageOverlay(imageUrl, siteBounds, {
  opacity: 1,
  errorOverlayUrl: errorOverlayUrl,
  alt: altText,
  interactive: true,
}).addTo(map);

//>> Overlay Rectangle
// L.rectangle(siteBounds, { color: "#0a0800", weight: 0 }).addTo(map);

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
  SRs: sr,
  "Image Overlay": imageOverlay,
};
let imageOverlayMaps = {
  "Image Overlay": imageOverlay,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

//custom marker
let VpIcon = L.icon({
  iconUrl: "./image/vp_marker.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [60, 60], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [30, 30], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

//>> View Points

let vp1 = L.marker([22.355136, 114.083877], {
  icon: VpIcon,
  title: "vp1",
}).addTo(map);
vp1.on("click", onVpClick);
vp1.bindTooltip("View Point 1", {
  permanent: true,
  direction: "right",
  className: "vp-tooltip",
  offset: [12, 0],
});

let vp2 = L.marker([22.347218, 114.064125], {
  icon: VpIcon,
  title: "vp2",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("View Point 2", {
    permanent: true,
    direction: "right",
    className: "vp-tooltip",
    offset: [12, 0],
  });

let vp3 = L.marker([22.33789, 114.052377], {
  icon: VpIcon,
  title: "vp3",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("View Point 3", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

//>> function for 3D vista
function onVpClick() {
  //get marker name
  let markerName = this.options.title;
  // alert("You clicked the map at " + markerName);

  // create switch statement for each SR name
  function onVpClick() {
    //get marker name
    let markerName = this.options.title;

    switch (markerName) {
      case "Uptown":
        markerName = "vp3";
        break;
      case "Tai Tao Tsuen":
        markerName = "vp4";
        break;
      case "Park Villa":
        markerName = "vp2";
        break;
      case "Jasper Court":
        markerName = "vp1";
        break;
      case "Tan Kwai Tsuen":
        markerName = "vp6";
        break;
      case "Ping Shan South":
        markerName = "vp6";
        break;
      case "Casa Regalia":
        markerName = "vp5";
        break;
      case "Manor Parc":
        markerName = "vp5";
        break;
      default:
        // do something if markerName doesn't match any case
        break;
    }
  }
  console.log("entering " + markerName);

  //trigger function in parent window
  window.parent.tour
    ._getRootPlayer()
    .getComponentByName("trigger" + "_" + markerName)
    .trigger("click");
}

function onVpClickTest() {
  //get marker name
  alert("You clicked the map");
}

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

//>> Dev Mode

let devMode = true;

if (devMode) {
  //pop up coordinates when clicking on map
  let popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);

    //copy coordinates to clipboard
    let copyText = e.latlng.toString();
    //extract only coordinates
    copyText = copyText.replace("LatLng(", "");
    copyText = copyText.replace(")", "");
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
