window.onload = function () {
	console.log("test");
	$.ajax({
		dataType: "json",
		url: "data/posts.json",
		success: function (data) {
			const { posts } = data;
			fillCalendar();
			//createBreakdown();
		},
		fail: function (error) {
			console.error("ERROR: Failed to retrieve JSON ", error);
		}
	});
}

const fillCalendar = function () {
	var today = new Date('Jan 1 2024');
	document.getElementById("todays-date").innerHTML = "Today is " + today.toDateString();
	// First of the month
	var firstOfMonth = new Date('Jan 1 2024');
	// Set date to first
	firstOfMonth.setDate(1);
	console.log("first " + firstOfMonth.toDateString());
	// Last of the month
	var lastOfMonth = new Date('Jan 1 2024');
	// Set month to next
	lastOfMonth.setMonth(lastOfMonth.getMonth() + 1);
	// Set date to zero (last day of previous month)
	lastOfMonth.setDate(0);
	console.log("last " + lastOfMonth.getDate());

	var dayOfTheWeek = firstOfMonth.getDay()
	var dayOfTheMonth = 1;
	var weekOfTheMonth = 0;
	for (let i = 0; i < 6; i++) {
		while (dayOfTheWeek <= 6) {
			if (dayOfTheMonth > lastOfMonth.getDate()) break;
			document.getElementById("week" + weekOfTheMonth + "-day" + dayOfTheWeek).innerHTML = dayOfTheMonth;
			dayOfTheWeek++;
			dayOfTheMonth++;
		}
		dayOfTheWeek = 0;
		weekOfTheMonth++;
		if (dayOfTheMonth > lastOfMonth.getDate() && weekOfTheMonth < 6) {
			document.getElementById("week6").remove();
		};
	}

}

const createBreakdown = function () {
	console.log("func");
	const xSize = 500;
	const ySize = 500;
	const margin = 40;
	const xMax = xSize - margin * 2;
	const yMax = ySize - margin * 2;

	const svg = d3.select("body")
		.append("svg")
		.attr("style", "background-color:lightgray;")
		.attr("transform", "translate(" + margin + "," + margin + ")");
}
