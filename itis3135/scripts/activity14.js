$(document).ready(function() {
	const links = document.querySelectorAll("aside a");
	for (let i = 0; i < links.length; i++) {
		links[i].onclick = clickEvent;
	}
}); // end ready


function clickEvent(event) {
	let file = "data/" + event.target.title + ".json";
	$.ajax({
		dataType: "json",
		url: file,
		success: function(data) {
			const { speakers } = data;
			const [ speakerInfo ] = speakers;
			console.log(speakerInfo);
			// Clear main
			const [main] = document.getElementsByTagName("main");
			console.log(main);
			main.innerHTML = "";
			// Build elements with json data
			let title = document.createElement("h1");
			title.innerHTML = speakerInfo.title;
			main.appendChild(title);
			let month = document.createElement("h2");
			month.innerHTML = speakerInfo.month;
			main.appendChild(month);
			let speaker = document.createElement("h3");
			speaker.innerHTML = speakerInfo.speaker;
			main.appendChild(speaker);
			let image = document.createElement("img");
			image.src = speakerInfo.image;
			image.alt = event.target.title + "_picture";
			main.appendChild(image);
			let description = document.createElement("p");
			description.innerHTML = speakerInfo.text;
			main.appendChild(description);
		},
		fail: function(data) {
			console.error("ERROR: Failed to retrieve JSON ", data);
		}
	});

}