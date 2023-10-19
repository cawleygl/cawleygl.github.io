function toggleNavDropdown() {
  var links = document.getElementsByClassName("nav-link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.toggle("open");
    links[i].classList.toggle("closed");
  }
}