var people = [];
var salaries = [];

window.onload = function () {
    document.getElementById("addSalary").onclick = addSalary;
    document.getElementById("displayResults").onclick = displayResults;
    document.getElementById("displaySalary").onclick = displaySalary;
    document.getElementById("select-employee").onchange= selectCurrentEmployee;
    document.getElementById("enter-name").focus();
}

var addSalary = function () {
    var name = document.getElementById("enter-name").value;
    var salary = document.getElementById("enter-salary").value;

    if (!name || !salary) {
        alert("Please enter both a name and salary.");
    } else if (isNaN(salary)) {
        alert("Please enter a numerical value for the new salary.");
    } else {
        people.push(name);
        salaries.push(parseInt(salary));
        document.getElementById("enter-name").value = "";
        document.getElementById("enter-salary").value = "";
    }

    document.getElementById("enter-name").focus();
}

var displayResults = function () {
    var largest = salaries[0];
    var total = 0;

    if (people.length === 0 || salaries.length === 0) return;

    for (var i = 0; i < salaries.length; i++) {
        if (salaries[i] > largest) {
            largest = salaries[i];
        }
        total += salaries[i];
    }
    var average = total / salaries.length;
    document.getElementById("results").innerHTML = "<h2>Results</h2><p><em>Average:</em> " + average + "</p><p><em>Highest:</em> " + largest + "</p>";

}

var displaySalary = function () {
    if (people.length === 0 || salaries.length === 0) return;

    var table = document.getElementById("results-table");
    table.innerHTML = "";
    table.classList.remove("hidden");
    var tableHeader = document.createElement("tr");
    tableHeader.innerHTML = "<th>Name</th><th>Salary</th>";
    table.appendChild(tableHeader);

    for (var i = 0; i < salaries.length; i++) {
        var tableRow = document.createElement("tr");
        tableRow.innerHTML = "<td>" + people[i] + "</td><td>" + salaries[i] + "</td>";
        table.appendChild(tableRow);
    }

} 

var selectCurrentEmployee = function (event) {
    var newSalary = parseInt(event.target.value);
    var newName = event.target.selectedOptions[0].innerHTML;
    document.getElementById("enter-salary").value = newSalary;
    document.getElementById("enter-name").value = newName;
}