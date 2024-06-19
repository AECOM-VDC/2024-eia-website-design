let LviIconPixelSize = [280, 279];
let LviIconScale = 0.18;
let LviIconSize = [
  LviIconPixelSize[0] * LviIconScale,
  LviIconPixelSize[1] * LviIconScale,
]; // size of the icon
let LviIconAnchor = [LviIconSize[0] / 2, LviIconSize[1] / 2];
let LviPopupAnchor = [0, LviIconSize[1] / 2];
let LviBottomOffset = [0, 16];

//custom marker
let LviIcon = L.icon({
  iconUrl: "./image/vp_marker.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: LviIconSize, // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: LviIconAnchor, // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  // popupAnchor: [12, 0],
});

//>> View Points

let VPA1_ = L.marker([22.267652, 114.264593], {
  icon: LviIcon,
  title: "VP-A1",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A1", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPA2_ = L.marker([22.267573, 114.272768], {
  icon: LviIcon,
  title: "VP-A2",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A2", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPA3_ = L.marker([22.272696, 114.270043], {
  icon: LviIcon,
  title: "VP-A3",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A3", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPA4_ = L.marker([22.276478, 114.271009], {
  icon: LviIcon,
  title: "VP-A4",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A4", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPA5_ = L.marker([22.274056, 114.273927], {
  icon: LviIcon,
  title: "VP-A5",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A5", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPA6_ = L.marker([22.270144, 114.274507], {
  icon: LviIcon,
  title: "VP-A6",
})

  .on("click", onVpClick)
  .bindTooltip("VP-A6", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPA7_ = L.marker([22.265567, 114.276749], {
  icon: LviIcon,
  title: "VP-A7",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A7", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPB1_ = L.marker([22.291519, 114.25704], {
  icon: LviIcon,
  title: "VP-B1",
})
  .on("click", onVpClick)
  .bindTooltip("VP-B1", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPB2_ = L.marker([22.297842, 114.256911], {
  icon: LviIcon,
  title: "VP-B2",
})
  .on("click", onVpClick)
  .bindTooltip("VP-B2", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
  });

let VPB3_ = L.marker([22.290248, 114.246011], {
  icon: LviIcon,
  title: "VP-B3",
})
  .on("click", onVpClick)
  .bindTooltip("VP-B3", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: LviBottomOffset,
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

let LVIArray = [];
