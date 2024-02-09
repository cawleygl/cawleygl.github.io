function toggleNavDropdown() {
	var arrow = document.getElementById("nav-arrow");
	arrow.classList.toggle("up");
	arrow.classList.toggle("down");
	var links = document.getElementsByClassName("nav-link");
	for (let i = 0; i < links.length; i++) {
		links[i].classList.toggle("open");
		links[i].classList.toggle("closed");
		// links[i].classList.remove("invisible");
		// links[i].classList.add("visible");
	}

}

function activatePopup(element) {
	element += "-popup";
	var popup = document.getElementById(element);
	popup.classList.remove("closed");
	timeout = setTimeout(function () {
		popup.classList.toggle("invisible");
		popup.classList.toggle("visible");
	}, 10);
}

function deactivatePopup(element) {
	element += "-popup";
	var popup = document.getElementById(element);
	popup.classList.toggle("invisible");
	popup.classList.toggle("visible");
	timeout = setTimeout(function () {
		popup.classList.add("closed");
	}, 200);
}

function slideDrawer(element) {
	var elements = document.getElementsByClassName(element);

	var icon = elements[0];
	var content = elements[1];

	content.classList.add("slide-animation");
	content.classList.toggle("play-slide-animation");

	if (icon.innerHTML === "+") {
		icon.innerHTML = "-";
	} else {
		icon.innerHTML = "+";
	}

}

