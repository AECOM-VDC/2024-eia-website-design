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
  //>> zoom
  minZoom: 14,
  maxZoom: 17,
  zoomDelta: 1,
  zoomSnap: 1,
  wheelPxPerZoomLevel: 120,
});

//>> map coordinate
map.setView([22.28036, 114.255152], 15);

//>> Image Overlay
let imageUrl = "./image/map_20240612_2.webp";
let errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let altText = "image";
let siteBounds = L.latLngBounds([
  [22.250762, 114.224521],
  [22.317078, 114.295996],
]);

// zoom the map to the rectangle bounds

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

let VPA1 = L.marker([22.267652, 114.264593], {
  icon: VpIcon,
  title: "VP-A1",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A1", {
    permanent: true,
    direction: "right",
    className: "vp-tooltip",
    offset: [12, 0],
  });

let VPA2 = L.marker([22.266957, 114.274442], {
  icon: VpIcon,
  title: "VP-A2",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A2", {
    permanent: true,
    direction: "right",
    className: "vp-tooltip",
    offset: [12, 0],
  });

let VPA3 = L.marker([22.270869, 114.271846], {
  icon: VpIcon,
  title: "VP-A3",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A3", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

let VPA4 = L.marker([22.275277, 114.270923], {
  icon: VpIcon,
  title: "VP-A4",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A4", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

let VPA5 = L.marker([22.271385, 114.274013], {
  icon: VpIcon,
  title: "VP-A5",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A5", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

let VPA6 = L.marker([22.26928, 114.275064], {
  icon: VpIcon,
  title: "VP-A6",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A6", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

let VPA7 = L.marker([22.266123, 114.277682], {
  icon: VpIcon,
  title: "VP-A7",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("VP-A7", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

  let VPB1 = L.marker([22.289176, 114.254315], {
    icon: VpIcon,
    title: "VP-B1",
  })
    .addTo(map)
    .on("click", onVpClick)
    .bindTooltip("VP-B1", {
      permanent: true,
      direction: "bottom",
      className: "vp-tooltip",
      offset: [0, 5],
    });

    let VPB2 = L.marker([22.297733, 114.257169], {
      icon: VpIcon,
      title: "VP-B2",
    })
      .addTo(map)
      .on("click", onVpClick)
      .bindTooltip("VP-B2", {
        permanent: true,
        direction: "bottom",
        className: "vp-tooltip",
        offset: [0, 5],
      });

      
    let VPB3 = L.marker([22.290844, 114.246569], {
      icon: VpIcon,
      title: "VP-B3",
    })
      .addTo(map)
      .on("click", onVpClick)
      .bindTooltip("VP-B3", {
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
  console.log("entering ");

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
