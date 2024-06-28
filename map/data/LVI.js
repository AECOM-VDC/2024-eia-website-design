//>>TODO : click的時候會重疊，要解決

var LviIconPixelSize = [200, 200];
let LviIconScale = 0.27;
let LviIconSize = [
  LviIconPixelSize[0] * LviIconScale,
  LviIconPixelSize[1] * LviIconScale,
]; // size of the icon
let LviIconAnchor = [LviIconSize[0] / 2, LviIconSize[1] / 2];
let LviPopupAnchor = [0, LviIconSize[1] / 2];
let LviCenterOffset = [0, 0];

//custom marker
let LviIcon = L.icon({
  iconUrl: "./image/LVI_arrow.png",

  // shadowUrl: "leaf-shadow.png",
  iconSize: LviIconSize, // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: LviIconAnchor, // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  // popupAnchor: [12, 0],
});

let LviIcon2 = L.icon({
  iconUrl: "./image/LVI_arrow2.png",

  // shadowUrl: "leaf-shadow.png",
  iconSize: [100 * LviIconScale, 150 * LviIconScale], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [(100 * LviIconScale) / 2, (150 * 2 * LviIconScale) / 3], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  // popupAnchor: [12, 0],
});

let LviIconBg = L.icon({
  iconUrl: "./image/LVI_arrow_bg.png",

  // shadowUrl: "leaf-shadow.png",
  iconSize: [100 * LviIconScale, 150 * LviIconScale], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [100 * 0.5 * LviIconScale, (150 * 2 * LviIconScale) / 2], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  // popupAnchor: [12, 0],
});

let LviIconClustered = L.icon({
  iconUrl: "./image/lvi_clustered.webp",
  // shadowUrl: "leaf-shadow.png",
  iconSize: LviIconSize, // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: LviIconAnchor, // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  // popupAnchor: [12, 0],
});

//create json object for LVI
let LviList = [
  {
    name: "1",
    latLong: [22.240895, 114.24146],
    rotation: 45,
  },
  {
    name: "2A",
    latLong: [22.26923, 114.248882],
    rotation: 0,
  },
  {
    name: "2B",
    latLong: [22.268734, 114.249375],
    rotation: 65,
  },
  {
    name: "3",
    latLong: [22.291895, 114.268695],
    rotation: 180,
  },
  {
    name: "4",
    latLong: [22.301382, 114.261168],
    rotation: 200,
  },
  {
    name: "5",
    latLong: [22.29368, 114.267013],
    rotation: 260,
  },
  {
    name: "6",
    latLong: [22.284146, 114.267837],
    rotation: 300,
  },
  {
    name: "7",
    latLong: [22.289859, 114.243588],
    rotation: 120,
  },
  {
    name: "8",
    latLong: [22.276511, 114.285045],
    rotation: 260,
  },
  {
    name: "9",
    latLong: [22.252922, 114.284777],
    rotation: 330,
  },
  {
    name: "10",
    latLong: [22.257195, 114.269485],
    rotation: 340,
  },
  {
    name: "11A",
    latLong: [22.276853, 114.2414],
    rotation: 30,
  },
  {
    name: "11B",
    latLong: [22.276134, 114.241608],
    rotation: 90,
  },
];

let LVIArray = [];
let LVIArrayClickable = [];

//create LVI markers from json object, use name for title, tooltip and variable(lvi_${name}), if icon, classname, offset, etc are not set,use default values. If set in json object, use those values.
LviList.forEach((lvi) => {
  let lviMarker = L.marker(lvi.latLong, {
    icon: LviIcon2,
    title: `VP${lvi.name}`,
    rotationAngle: lvi.rotation,
  })
    .bindTooltip(lvi.name, {
      permanent: true,
      direction: lvi.direction || "center",
      className: lvi.className || "lvi-tooltip",
      offset: lvi.offset || LviCenterOffset,
    })
    .on("click", onLviClick);
  LVIArray.push(lviMarker);
});

// LviList.forEach((lvi) => {
//   let lviMarker = L.marker(lvi.latLong, {
//     icon: LviIconBg,
//     title: `VP${lvi.name}`,
//     rotationAngle: lvi.rotation,
//   }).on("click", onLviClick);
//   LVIArrayClickable.push(lviMarker);
// });

var markerCluster = L.markerClusterGroup({
  // disableClusteringAtZoom: 16,
  maxClusterRadius: 20,
  iconCreateFunction: function (cluster) {
    return LviIconClustered;
  },
  spiderLegPolylineOptions: { weight: 1.8, color: "#FFF", opacity: 1 },
});
markerCluster.addLayers(LVIArray);

//>> function for 3D vista
function onLviClick(e) {
  //get marker name
  let markerName = this.options.title;
  // alert("You clicked the map at " + markerName);

  console.log("open LVI " + markerName);

  // select the lvi-popup element
  let lviPopup = document.getElementById("lvi-popup-overlay");

  // select the iframe inside lvi-popup
  let iframe = lviPopup.querySelector("iframe");

  //check if clicked on visible area or transparent area

  let distanceToXCenter = Math.abs(
    e.originalEvent.offsetX - LviIconSize[0] / 2
  );
  let distanceToYCenter = Math.abs(
    e.originalEvent.offsetY - LviIconSize[1] / 2
  );
  iframe.src = `../visual_compare/index.html?data=${markerName}`;

  // display the lvi-popup
  lviPopup.style.display = "block";
  if (
    //get absolute of clickOffsetX - _iconSize
    Math.abs(distanceToXCenter) < LviIconSize[0] * 0.3 &&
    Math.abs(distanceToYCenter) < LviIconSize[1] * 0.3
  ) {
    // Clicked on visible area!
    // change the src attribute of the iframe to include the marker name as a URL parameter
    iframe.src = `../visual_compare/index.html?data=${markerName}`;

    // display the lvi-popup
    lviPopup.style.display = "block";

    console.log("Clicked on visible area!");
  } else {
    // Clicked on transparent area!
    console.log("Clicked on transparent area!");
  }
}

document
  .getElementById("popup-close-btn")
  .addEventListener("click", function () {
    let iframe = document.getElementById("lvi-popup-iframe");
    iframe.src = "";
    document.getElementById("lvi-popup-overlay").style.display = "none";
  });
