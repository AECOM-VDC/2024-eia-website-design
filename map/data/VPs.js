let VpIconPixelSize = [280, 279];
let VpIconScale = 0.18;
let VpIconSize = [
  VpIconPixelSize[0] * VpIconScale,
  VpIconPixelSize[1] * VpIconScale,
]; // size of the icon
let VpIconAnchor = [VpIconSize[0] / 2, VpIconSize[1] / 2];
let VPPopupAnchor = [0, VpIconSize[1] / 2];
let bottomOffset = [0, 16];

//custom marker
let VpIcon = L.icon({
  iconUrl: "./image/vp_marker.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: VpIconSize, // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: VpIconAnchor, // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  // popupAnchor: [12, 0],
});

//>> View Points

let VPA1 = L.marker([22.267652, 114.264593], {
  icon: VpIcon,
  title: "VP-A1",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A1", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPA2 = L.marker([22.267573, 114.272768], {
  icon: VpIcon,
  title: "VP-A2",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A2", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPA3 = L.marker([22.272696, 114.270043], {
  icon: VpIcon,
  title: "VP-A3",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A3", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPA4 = L.marker([22.276478, 114.271009], {
  icon: VpIcon,
  title: "VP-A4",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A4", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPA5 = L.marker([22.274056, 114.273927], {
  icon: VpIcon,
  title: "VP-A5",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A5", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPA6 = L.marker([22.270144, 114.274507], {
  icon: VpIcon,
  title: "VP-A6",
})

  .on("click", onVpClick)
  .bindTooltip("VP-A6", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPA7 = L.marker([22.265567, 114.276749], {
  icon: VpIcon,
  title: "VP-A7",
})
  .on("click", onVpClick)
  .bindTooltip("VP-A7", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPB1 = L.marker([22.291519, 114.25704], {
  icon: VpIcon,
  title: "VP-B1",
})
  .on("click", onVpClick)
  .bindTooltip("VP-B1", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPB2 = L.marker([22.297842, 114.256911], {
  icon: VpIcon,
  title: "VP-B2",
})
  .on("click", onVpClick)
  .bindTooltip("VP-B2", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

let VPB3 = L.marker([22.290248, 114.246011], {
  icon: VpIcon,
  title: "VP-B3",
})
  .on("click", onVpClick)
  .bindTooltip("VP-B3", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: bottomOffset,
  });

//>> function for 3D vista
function onVpClick() {
  //get marker name
  let markerName = this.options.title;
  // alert("You clicked the map at " + markerName);

  console.log("entering " + markerName);
  //send message to parent window
  window.parent.postMessage("trigger" + "_" + markerName, "*");
  //trigger function in parent window
  try {
    window.parent.tour
      ._getRootPlayer()
      .getComponentByName("trigger" + "_" + markerName)
      .trigger("click");
  } catch (error) {}
}

let VPArray = [VPA1, VPA2, VPA3, VPA4, VPA5, VPA6, VPA7, VPB1, VPB2, VPB3];
