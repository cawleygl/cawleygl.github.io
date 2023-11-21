let activeSlide = 0;
showSlide(activeSlide);

function advanceSlide(n) {
	showSlide(activeSlide += n);
}

function chooseSlide(n) {
	showSlide(activeSlide = n);
}

function showSlide(n) {
	let i;
	let slides = document.getElementsByClassName("slide");
	let thumbnails = document.getElementsByClassName("thumbnail");
	let caption = document.getElementById("caption");
	if (n > slides.length - 1) activeSlide = 0;
	if (n < 0) activeSlide = slides.length - 1;
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < thumbnails.length; i++) {
		thumbnails[i].className = thumbnails[i].className.replace(" active", "");
	}
	console.log(slides[activeSlide].style.display);
	slides[activeSlide].style.display = "block";
	thumbnails[activeSlide].className += " active";
	caption.innerHTML = thumbnails[activeSlide].alt;
}
