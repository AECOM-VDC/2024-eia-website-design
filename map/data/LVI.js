let LviIconPixelSize = [300, 300];
let LviIconScale = 0.18;
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
    rotation: -30,
  },
  {
    name: "2B",
    latLong: [22.268936, 114.24921],
    rotation: 45,
  },
  {
    name: "3",
    latLong: [22.24032, 114.241663],
    rotation: 30,
  },
];

let LVIArray = [];

//create LVI markers from json object, use name for title, tooltip and variable(lvi_${name}), if icon, classname, offset, etc are not set,use default values. If set in json object, use those values.
LviList.forEach((lvi) => {
  let lviMarker = L.marker(lvi.latLong, {
    icon: LviIcon || LviIcon,
    title: `LVI_${lvi.name}`,
    rotationAngle: lvi.rotation,
  })
    .on("click", onLviClick)
    .bindTooltip(lvi.name, {
      permanent: true,
      direction: lvi.direction || "center",
      className: lvi.className || "lvi-tooltip",
      offset: lvi.offset || LviCenterOffset,
    });
  LVIArray.push(lviMarker);
});

var markerCluster = L.markerClusterGroup({
  // disableClusteringAtZoom: 16,
  maxClusterRadius: 40,
  iconCreateFunction: function (cluster) {
    return LviIconClustered;
  },
  spiderLegPolylineOptions: { weight: 1.8, color: "#FFF", opacity: 1 },
});
markerCluster.addLayers(LVIArray);

//>> View Points

// let lvi_1 = L.marker([22.240895, 114.24146], {
//   icon: LviIcon,
//   title: "VP-11",
//   rotationAngle: 45,
// })
//   .on("click", onLviClick)
//   .bindTooltip("11", {
//     permanent: true,
//     direction: "center",
//     className: "lvi-tooltip",
//     offset: LviCenterOffset,
//   });

// let VP2_ = L.marker([22.268852, 114.248524], {
//   icon: LviIcon,
//   title: "VP-11",
//   rotationAngle: -25,
// })
//   .on("click", onLviClick)
//   .bindTooltip("2", {
//     permanent: true,
//     direction: "center",
//     className: "lvi-tooltip",
//     offset: LviCenterOffset,
//   });

// let VP2_1 = L.marker([22.268852, 114.248524], {
//   icon: LviIcon,
//   title: "VP-11",
//   rotationAngle: 55,
// })
//   .on("click", onLviClick)
//   .bindTooltip("", {
//     permanent: true,
//     direction: "center",
//     className: "lvi-tooltip",
//     offset: LviCenterOffset,
//   })
//   .bindTooltip("123123213", {
//     permanent: true,
//     direction: "center",
//     className: "lvi-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPA4_ = L.marker([22.276478, 114.271009], {
//   icon: LviIcon,
//   title: "VP-A4",
// })
//   .on("click", onLviClick)
//   .bindTooltip("VP-A4", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPA5_ = L.marker([22.274056, 114.273927], {
//   icon: LviIcon,
//   title: "VP-A5",
// })
//   .on("click", onLviClick)
//   .bindTooltip("VP-A5", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPA6_ = L.marker([22.270144, 114.274507], {
//   icon: LviIcon,
//   title: "VP-A6",
// })

//   .on("click", onLviClick)
//   .bindTooltip("VP-A6", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPA7_ = L.marker([22.265567, 114.276749], {
//   icon: LviIcon,
//   title: "VP-A7",
// })
//   .on("click", onLviClick)
//   .bindTooltip("VP-A7", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPB1_ = L.marker([22.291519, 114.25704], {
//   icon: LviIcon,
//   title: "VP-B1",
// })
//   .on("click", onLviClick)
//   .bindTooltip("VP-B1", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPB2_ = L.marker([22.297842, 114.256911], {
//   icon: LviIcon,
//   title: "VP-B2",
// })
//   .on("click", onLviClick)
//   .bindTooltip("VP-B2", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

// let VPB3_ = L.marker([22.290248, 114.246011], {
//   icon: LviIcon,
//   title: "VP-B3",
// })
//   .on("click", onLviClick)
//   .bindTooltip("VP-B3", {
//     permanent: true,
//     direction: "bottom",
//     className: "vp-tooltip",
//     offset: LviCenterOffset,
//   });

//>> function for 3D vista
function onLviClick() {
  //get marker name
  let markerName = this.options.title;
  // alert("You clicked the map at " + markerName);

  console.log("open LVI " + markerName);

  // select the lvi-popup element
  let lviPopup = document.getElementById("lvi-popup");

  // select the iframe inside lvi-popup
  let iframe = lviPopup.querySelector("iframe");

  // change the src attribute of the iframe to include the marker name as a URL parameter
  iframe.src = `../visual_compare/index.html?data=VP-A3#`;

  // display the lvi-popup
  lviPopup.style.display = "block";
}
