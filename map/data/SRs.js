let SrIconPixelSize = [25, 41]; // size of the icon
let SrIconScale = 0.85;

let iconSize = [
  SrIconPixelSize[0] * SrIconScale,
  SrIconPixelSize[1] * SrIconScale,
]; // size of the icon
let iconAnchor = [iconSize[0] / 2, iconSize[1]]; // point of the icon which will correspond to marker's location

let SrIcon = L.icon({
  iconUrl: "./image/marker-icon-green.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: iconSize, // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  // popupAnchor: [15,15], // point from which the popup should open relative to the iconAnchor
});

//>> TYLL SRs

var AdministrationBuilding = L.marker([22.346702, 114.086119], {
  icon: SrIcon,
  title: "vp1",
}).bindTooltip("Administration Building of <br>Shell Tsing Yi Installation", {
  interactive: true,
  permanent: true,
  direction: "bottom",
  className: "sr-tooltip",
  offset: [-5, 0],
  title: "vp1",
});

var LantauLinkVisitorsCentre = L.marker([22.35851, 114.081463], {
  icon: SrIcon,
  title: "vp1",
}).bindTooltip("Lantau Link Visitors Centre", {
  interactive: true,
  permanent: true,
  direction: "bottom",
  className: "sr-tooltip",
  offset: [0, 0],
  title: "vp1",
});

var PlannedPrivateHousing = L.marker([22.345124, 114.064329], {
  icon: SrIcon,
  title: "vp2",
}).bindTooltip("Planned Private Housing<br>Development in Ma Wan South", {
  interactive: true,
  permanent: true,
  direction: "bottom",
  className: "sr-tooltip",
  offset: [0, 0],
  title: "vp2",
});

var NoahArk = L.marker([22.348478, 114.061185], {
  icon: SrIcon,
  title: "vp2",
}).bindTooltip("Noah's Ark", {
  interactive: true,
  permanent: true,
  direction: "bottom",
  className: "sr-tooltip",
  offset: [0, -70],
  title: "vp2",
});

var VillageHouseAtTsoWan = L.marker([22.334476, 114.054265], {
  icon: SrIcon,
  title: "vp3",
}).bindTooltip("Village House at Tso Wan", {
  interactive: true,
  permanent: true,
  direction: "bottom",
  className: "sr-tooltip",
  offset: [0, 0],
  title: "vp3",
});

var VillageHouseAtYiChuen = L.marker([22.340669, 114.054995], {
  icon: SrIcon,
  title: "vp3",
}).bindTooltip("Village House<br>at Yi Chuen", {
  interactive: true,
  permanent: true,
  direction: "left",
  className: "sr-tooltip",
  offset: [-10,-15],
  title: "vp3",
});

var SrArray = [
  AdministrationBuilding,
  LantauLinkVisitorsCentre,
  PlannedPrivateHousing,
  NoahArk,
  VillageHouseAtTsoWan,
  VillageHouseAtYiChuen,
];
