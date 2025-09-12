
function closePanel() {
    // var rp = window.parent.tour._getRootPlayer();
    MySetVizByTags(["switch_state_noise"], false, 0);
    MySetVizByTags(["switch_state_air"], false), 0;
    rp.getComponentByName('NoiseStateSwitch').set('visible',false);
    rp.getComponentByName('AirStateSwitch').set('visible',false);
    console.log("closePanel");
  }