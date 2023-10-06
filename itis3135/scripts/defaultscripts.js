function userNameAndFeelings() {
  if (document.getElementById("user-name").value && document.getElementById("user-status").value) {
    var name = document.getElementById("user-name").value;
    var feeling = document.getElementById("user-status").value;
    var greeting = "The Gilded Condor welcomes you, " + name + "! We're glad you're feeling " + feeling + ".";
    document.getElementById("user-greeting").innerHTML = greeting;
  }
}

function numberToPolygon() {
  if (document.getElementById("user-number").value) {
    var polygons = ["Nothing", "Monogon", "Bigon", "Triangle", "Quadrilateral", "Pentagon", "Hexagon", "Heptagon", "Octagon", "Nonagon", "Decagon"]
    var number = Math.abs(Math.round(document.getElementById("user-number").value));
    var polygonName;
    if (number < 10) {
      polygonName = polygons[number];
    } else {
      polygonName = "Wacky-gon";
    }
    document.getElementById("user-polygon").innerHTML = polygonName;
  }
}

function gildTheLily() {
  document.getElementById("gild-the-lily-button").classList.add("golden-button");
  document.getElementById("gild-the-lily-button").innerHTML = "***********************************************************";
}

function circleYourPrey() {
  var numberOfSounds = Math.round(Math.random() * (2) + 3);
  var sound = "";
  for (i = 0; i < numberOfSounds; i++) {
    var hiss_or_snort = Math.round(Math.random() * (1));
    sound += hiss_or_snort ? "hisssss " : "snort ";
  }

  alert(sound);
  document.getElementById("condor-perch").innerHTML = "&#128038;";
}

function condorStatus() {
  var date = new Date();
  var status = "We at the Gilded Condor are currently ";
  if (date.getHours > 5 && date.getHours() < 14) {
    status += "foraging";
  } else if (date.getHours > 14 && date.getHours < 19) {
    status += "perching";
  } else {
    status += "sleeping";
  }
  status += ". Please check again later."

  alert(status);
}

function verifyEgg() {
  var eggColor = prompt("Please enter the color of your egg: ");
  var eggSize = prompt("Please enter the size of your egg (small, medium, or large): ");

  if ((eggColor.toUpperCase() == "BLUE" || eggColor.toUpperCase() == "GREEN") && eggSize.toUpperCase() == "LARGE") {
    alert("Congratulations! You've found a genuine Condor Egg!");
  } else {
    alert("We're sorry, the egg you've provided does not match the qualifications of a Condor Egg.");
  }
}
