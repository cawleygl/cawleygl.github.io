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
