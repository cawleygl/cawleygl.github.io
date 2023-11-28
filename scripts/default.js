function toggleNavDropdown() {
	var arrow = document.getElementById("nav-arrow");
	arrow.classList.toggle("up");
	arrow.classList.toggle("down");
  var links = document.getElementsByClassName("nav-link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.toggle("open");
    links[i].classList.toggle("closed");
  }

}

function activatePopup(element) {
	element += "-popup";
	var popup = document.getElementById(element);
	popup.classList.remove("invisible");
	popup.classList.add("visible");
}

function deactivatePopup(element) {
	element += "-popup";
	var popup = document.getElementById(element);
	popup.classList.add("invisible");
	popup.classList.remove("visible");
}