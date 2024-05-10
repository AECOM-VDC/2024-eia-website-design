//custom marker
var VpIcon = L.icon({
  iconUrl: "./image/vp_marker.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [60, 60], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [30, 30], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

//>> View Points
var vp1 = L.marker([22.437827, 114.011724], {
  icon: VpIcon,
  title: "vp1",
}).addTo(map);
vp1.on("click", onVpClick);
vp1.bindTooltip("View Point 1", {
  permanent: true,
  direction: "bottom",
  className: "vp-tooltip",
  offset: [0, 5],
});

var vp2 = L.marker([22.434415, 114.005228], {
  icon: VpIcon,
  title: "vp2",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("View Point 2", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

var vp3 = L.marker([22.433845, 114.00342], {
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

var vp4 = L.marker([22.432466, 114.002814], {
  icon: VpIcon,
  title: "vp4",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("View Point 4", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

var vp5 = L.marker([22.428738, 114.00017], {
  icon: VpIcon,
  title: "vp5",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("View Point 5", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });

var vp6 = L.marker([22.424346, 113.997658], {
  icon: VpIcon,
  title: "vp6",
})
  .addTo(map)
  .on("click", onVpClick)
  .bindTooltip("View Point 6", {
    permanent: true,
    direction: "bottom",
    className: "vp-tooltip",
    offset: [0, 5],
  });
