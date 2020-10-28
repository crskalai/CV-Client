
    function toggleButton(x) {
      var hideShow = document.getElementById("hideDiv");
      if (hideShow.style.display === "none") {
        hideShow.style.display = "block";
      } else {
        hideShow.style.display = "none";
      }
      // var y = document.getElementById("myDIVs");
      // y.classList.add("col-lg-9");
      // y.classList.remove("col-lg-12");
      console.log(x.classList)
      if (x.classList[1] == "fa-angle-right") {
        x.classList.remove("fa-angle-right")
        x.classList.add("fa-angle-left")
      }
      else {
        x.classList.remove("fa-angle-left")
        x.classList.add("fa-angle-right")
      }
      // x.classList.toggle("fa-arrow-left");
    }