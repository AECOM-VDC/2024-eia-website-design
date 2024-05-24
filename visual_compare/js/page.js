window.onload = function () {
  vueDraw();
};

//vue
function vueDraw() {
  const beforeUrl = "asset/visual_impact/";

  Vue.createApp({
    data() {
      return {
        JsonData: {},
        VP: "",
        title: "",
        mapLocation: "",
        options: null,
        items: null,
        imgSrc: { A: "", B: "" },
        mapImageSrc: "",
        preClicked: false,
      };
    },
    methods: {
      getJson() {
        fetch("./data.json", {})
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            this.JsonData = json;
            this.title = this.JsonData.DATA[this.VP].title;
            this.mapLocation = this.JsonData.DATA[this.VP].mapLocation;
            this.options = this.JsonData.DATA[this.VP].options;
            //this is changed for STLMC only to show note from template
            this.items = this.JsonData.TEMPLATE.vp0.note;
          })
          .catch((err) => {
            console.log("ERROR:", err);
            // alert(err);
          });
      },
      //showMapImage
      showMapImage() {
        let mapImageSrc = beforeUrl + "maps" + "/" +  this.VP.toLowerCase() + ".png";
        this.mapImageSrc = mapImageSrc;
        //assign mapImageSrc to img
        document.getElementById("mapImage").src = mapImageSrc;
      },

      drawTooltip(bool) {
        if (bool) {
          if (this.getClientWidth() < 575) {
            return;
          }
          var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
          );
          var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
          });
          let tooltipEl = document.querySelectorAll(
            "[data-bs-toggle='tooltip']"
          )[0];

          tooltip = bootstrap.Tooltip.getInstance(tooltipEl);

          tooltip.show();
          document
            .querySelectorAll("#sideToggle")[0]
            .addEventListener("click", function () {
              tooltip.hide();
              tooltip.disable();
              // console.log("tooltip hided");
            });
        } else {
          //hide all tooltip class
          let tooltipList = document.querySelectorAll(".tooltip");
          tooltipList.forEach((element) => {
            element.style.display = "none";
          }
          );



        }
      },
      drawCompare(params) {
        //一定要在Vue之後

        const options = {
          smoothing: false,
          smoothingAmount: 100,
          controlShadow: false,
          addCircle: false,
          addCircleBlur: false,
        };
        const element = document.getElementById("image-compare");
        const viewer = new ImageCompare(element, options).mount();
        // console.log("drawing viewer");
      },
      getUrlPara() {
        let getUrlString = window.location.href;
        fakeUrlString = "";

        var url = new URL(getUrlString);
        // Title = url.searchParams.get("title");
        this.VP = url.searchParams.get("data");
        // console.log(this.VP);
      },
      getClientWidth() {
        let vw = document.documentElement.clientWidth;
        return vw;
      },
      optionClicked(event, index, isRight) {
        let element = event.target;
        let optionTitle = this.JsonData.DATA[this.VP].options[index];
        let imgId;
        let anotherDropID;
        let imgUrl =
          beforeUrl +
          this.VP.toUpperCase() +
          "/" +
          this.JsonData.DATA[this.VP].fileName[index];

        switch (isRight) {
          case false:
            imgId = "img1";
            anotherDropID = "dropdownB";
            break;
          case true:
            imgId = "img2";
            anotherDropID = "dropdownA";

            break;

          default:
            break;
        }

        let buttonList =
          element.parentNode.parentNode.getElementsByClassName("dropdown-item");

        buttonList.forEach((element) => {
          element.classList.remove("disabled");
        });

        element.classList.add("disabled");

        let anotherDrop = document
          .getElementById(anotherDropID)
          .getElementsByClassName("dropdown-item");

        anotherDrop.forEach((element) => {
          element.classList.remove("active");
        });

        anotherDrop[index].classList.add("active");

        // let text = optionTitle;
        if (isRight) {
          this.imgSrc.B = imgUrl;
        } else {
          this.imgSrc.A = imgUrl;
        }

        document.getElementById(imgId).src = imgUrl;

        element.parentNode.parentNode.parentNode.getElementsByTagName(
          "button"
        )[0].innerHTML = optionTitle;

        // console.log("option clicked");
      },
      preClick() {
        if (this.preClicked) {
          return;
        }
        // console.log("preclick");

        let A_index = this.JsonData.DATA[this.VP].preSelect[0];
        let B_index = this.JsonData.DATA[this.VP].preSelect[1];
        // console.log(A_index, B_index);

        let dropA = document
          .getElementById("dropdownA")
          .getElementsByClassName("dropdown-item");

        document
          .getElementById("dropdownA")
          .getElementsByClassName("dropdown-item")
          [A_index].click();
        document
          .getElementById("dropdownB")
          .getElementsByClassName("dropdown-item")
          [B_index].click();
        this.preClicked = true;
        this.drawCompare();
      },
      toggleShow(id) {
        var x = document.getElementById(id);
        if (x.style.width != "0%") {
          x.style.width = "100%";
        } else {
          x.style.width = "0%";
        }
      },
    },
    updated() {
      // console.log("updated");
      this.preClick();
      // this.drawCompare();
    },
    mounted() {
      //make sure elements are rendered
      console.log("Developed by AECOM Digital");
      this.getUrlPara();
      this.showMapImage();
      this.getJson();
      //run drawTooltip after 1s
      setTimeout(() => {
        this.drawTooltip(true);
      }, 500);

      // this.preClick();
    },
  }).mount("#app");
}
