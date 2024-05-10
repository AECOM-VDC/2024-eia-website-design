
      let JsonData;
      let VP;
      let beforeUrl = "asset/visual_impact/";

      window.onload = function () {
        getUrlPara();
        getJson();
      };

      function getUrlPara() {
        getUrlString = window.location.href;
        fakeUrlString =
          "https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_substring&title=vp1&abc=123";

        var url = new URL(getUrlString);
        // Title = url.searchParams.get("title");
        VP = url.searchParams.get("data");
        console.log(VP);
      }

      function getJson() {
        fetch("./data.json", {})
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            JsonData = json;
            console.log(JsonData);
            vueDraw(JsonData);
            drawCompare();
            preClick();
            drawTooltip();
          })
          .catch((err) => {
            console.log("ERROR:", err);
            // alert(err);
          });
      }

      function drawTooltip(params) {
        var tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        // document.querySelectorAll('[data-bs-toggle="tooltip"]').tooltip('show');
        $("[data-bs-toggle='tooltip']").tooltip("show");
        // $("[data-bs-toggle='tooltip']").tooltip('toggle');

        $("#sideToggle").click(function () {
          $("[data-bs-toggle='tooltip']").tooltip("dispose");
        });
      }

      function drawCompare(params) {
        //一定要在Vue之後

        const options = {
          smoothing: true,
          smoothingAmount: 100,
          controlShadow: false,
          addCircle: true,
          addCircleBlur: true,
        };
        const element = document.getElementById("image-compare");
        const viewer = new ImageCompare(element, options).mount();
      }

      function optionClicked(element, index, isRight) {
        let optionTitle = JsonData.DATA[VP].options[index];
        let imgId;
        let anotherDropID;
        let imgUrl =
          beforeUrl +
          VP.toUpperCase() +
          "/" +
          JsonData.DATA[VP].fileName[index];

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

        console.log(buttonList);

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

        document.getElementById(imgId).src = imgUrl;

        element.parentNode.parentNode.parentNode.getElementsByTagName(
          "button"
        )[0].innerHTML = optionTitle;

        console.log("option clicked");
      }

      function toggleShow(id) {
        var x = document.getElementById(id);
        if (x.style.width != "0%") {
          x.style.width = "100%";
        } else {
          x.style.width = "0%";
        }
      }

      function preClick() {
        let A_index = JsonData.DATA[VP].preSelect[0];
        let B_index = JsonData.DATA[VP].preSelect[1];

        document
          .getElementById("dropdownA")
          .getElementsByClassName("dropdown-item")
          [A_index].click();
        document
          .getElementById("dropdownB")
          .getElementsByClassName("dropdown-item")
          [B_index].click();
      }

      //vue
      function vueDraw(_json) {
        const vpTitle = _json.DATA[VP].title;

        const listItem = {
          template: "<li class='list-group-item'></li>",
        };
        console.log(_json.DATA[VP].note);

        Vue.createApp({
          data() {
            return {
              title: vpTitle,
              option0: _json.DATA[VP].options[0],
              option1: _json.DATA[VP].options[1],
              option2: _json.DATA[VP].options[2],
              option3: _json.DATA[VP].options[3],
              items: _json.DATA[VP].note,
            };
          },
        }).mount("#app");
      }
    