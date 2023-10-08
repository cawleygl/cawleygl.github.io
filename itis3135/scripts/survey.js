function resetForm() {
  // Remove course input fields
  var numberofCourses = document.getElementsByClassName('course-entry').length;
  if (numberofCourses > 0) {
    for (i = 0; i < numberofCourses; i++) {
      document.getElementById('course-' + i).remove();
    }
    document.getElementById("course-delete-button").remove();
  }
  // Remove and replace image input field
  document.getElementById('image-upload').remove();
  var newImageInput = document.createElement("input");
  newImageInput.setAttribute("id", "image-upload");
  newImageInput.setAttribute("name", "image-upload");
  newImageInput.setAttribute("type", "file");
  newImageInput.setAttribute("accept", ".jpg,.jpeg,.png");
  document.getElementById('image-label').appendChild(newImageInput);
  // Clear input content
  document.getElementById('name').value = "";
  document.getElementById('mascot').value = "";
  document.getElementById('caption').value = "";
  document.getElementById('personal-bkgnd').value = "";
  document.getElementById('professional-bkgnd').value = "";
  document.getElementById('academic-bkgnd').value = "";
  document.getElementById('dev-bkgnd').value = "";
  document.getElementById('computer-platform').value = "";
  document.getElementById('funny-thing').value = "";
  document.getElementById('other').value = "";
  document.getElementById('agree').checked = false;

}

function returnToForm() {
  // Clear form elements
  resetForm();
  // Reset output element
  document.getElementById('byo-introduction').innerHTML = "";
  // Display form
  document.getElementById("form-element").removeAttribute("style");
}

function verifyForm() {
  // Check form values, image upload, and presence of course entry fields
  if (
    !document.getElementById('name').value ||
    !document.getElementById('mascot').value ||
    !document.getElementById('caption').value ||
    !document.getElementById('personal-bkgnd').value ||
    !document.getElementById('professional-bkgnd').value ||
    !document.getElementById('academic-bkgnd').value ||
    !document.getElementById('dev-bkgnd').value ||
    !document.getElementById('computer-platform').value ||
    !document.getElementById('funny-thing').value ||
    !document.getElementById('image-upload').files[0] ||
    !document.getElementById('agree').checked ||
    document.getElementsByClassName('course-entry').length === 0
  ) {
    return true;
  }

  // Loop through course entry fields to verify values
  var numberofCourses = document.getElementsByClassName('course-entry').length;
  for (i = 0; i < numberofCourses; i++) {
    if (!document.getElementById('course-name-' + i).value) {
      return true;
    }
    if (!document.getElementById('course-reason-' + i).value) {
      return true;
    }
  }

  return false;
}

function buildIntroduction(formValues) {
  // Hide form
  document.getElementById("form-element").setAttribute("style", "display:none;");
  // Create name with mascot
  var name = document.createElement("h2");
  name.innerHTML = formValues.name + "'s " + formValues.mascot;
  document.getElementById("byo-introduction").appendChild(name);
  // Create image
  var imageFigure = document.createElement("figure");
  var imageCaption = document.createElement("figcaption");
  imageCaption.innerHTML = formValues.imageCaption;
  imageFigure.innerHTML = formValues.imageElement;
  imageFigure.appendChild(imageCaption);
  document.getElementById("byo-introduction").appendChild(imageFigure);
  // Create List
  var introList = document.createElement("ul");
  // Create personal background
  var personalBackground = document.createElement("li");
  personalBackground.innerHTML = "<strong>Personal Background: </strong>" + formValues.personalBkgnd;
  introList.appendChild(personalBackground);
  // Create professional background
  var professionalBackground = document.createElement("li");
  professionalBackground.innerHTML = "<strong>Professional Background: </strong>" + formValues.professionalBkgnd;
  introList.appendChild(professionalBackground);
  // Create academic background
  var academicBackground = document.createElement("li");
  academicBackground.innerHTML = "<strong>Academic Background: </strong>" + formValues.academicBkgnd;
  introList.appendChild(academicBackground);
  // Create web dev background
  var devBackground = document.createElement("li");
  devBackground.innerHTML = "<strong>Background in this Subject: </strong>" + formValues.devBkgnd;
  introList.appendChild(devBackground);
  // Create computer platform
  var computerPlatform = document.createElement("li");
  computerPlatform.innerHTML = "<strong>Primary Computer Platform: </strong>" + formValues.computerPlatform;
  introList.appendChild(computerPlatform);

  // Create course list
  var courses = document.createElement("li");
  var coursesTitle = document.createElement("strong");
  coursesTitle.innerHTML = "Courses I'm Taking & Why: ";
  var courseList = document.createElement("ul");
  courses.appendChild(coursesTitle);


  // Loop through courses to create list items for each
  for (i = 0; i < formValues.courseNames.length; i++) {
    var courseListItem = document.createElement("li");  
    courseListItem.innerHTML = "<strong>" + formValues.courseNames[i] + ": </strong>" + formValues.courseReasons[i];
    courseList.appendChild(courseListItem);
  }

  courses.appendChild(courseList);
  // Append courses
  introList.appendChild(courses);


  // Create funny thing
  var funnyThing = document.createElement("li");
  funnyThing.innerHTML = "<strong>Funny/Interesting Item to Remember me by: </strong>" + formValues.funnyThing;
  introList.appendChild(funnyThing);
  // Create other information if necessary
  if (formValues.other) {
    var other = document.createElement("li");
    other.innerHTML = "<strong>I'd also like to Share: </strong>" + formValues.other;
    introList.appendChild(other);
  }

  // Append list to document
  document.getElementById("byo-introduction").appendChild(introList);

  // Create return button
  var returnButton = document.createElement("button");
  returnButton.setAttribute("type", "button");
  returnButton.setAttribute("onclick", "returnToForm();");
  returnButton.classList.add("return-button");
  returnButton.innerHTML = "Return";
  document.getElementById("byo-introduction").appendChild(returnButton);

}

function submitForm() {
  // Run form verification
  if (verifyForm()) {
    alert("Please make sure all input fields are completed.");
    return;
  }
  // Object for form values
  var formValues = {
    name: document.getElementById('name').value,
    mascot: document.getElementById('mascot').value,
    imageElement: "",
    imageCaption: document.getElementById('caption').value,
    personalBkgnd: document.getElementById('personal-bkgnd').value,
    professionalBkgnd: document.getElementById('professional-bkgnd').value,
    academicBkgnd: document.getElementById('academic-bkgnd').value,
    devBkgnd: document.getElementById('dev-bkgnd').value,
    computerPlatform: document.getElementById('computer-platform').value,
    funnyThing: document.getElementById('funny-thing').value,
    other: document.getElementById('other').value,
    courseNames: [],
    courseReasons: []
  }
  // Loop through course input fields and push values to name and reason arrays
  var numberofCourses = document.getElementsByClassName('course-entry').length;
  for (i = 0; i < numberofCourses; i++) {
    formValues.courseNames.push((document.getElementById('course-name-' + i).value));
    formValues.courseReasons.push((document.getElementById('course-reason-' + i).value));
  }
  // Get image from file input
  var image = document.getElementById('image-upload').files[0];
  const imageUrl = URL.createObjectURL(image);
  var text = "<img src=\"" + imageUrl + "\" alt=\"" + document.getElementById('name').value + ": " + document.getElementById('caption').value + "\" >";
  formValues.imageElement = text;
  // Build introduction
  buildIntroduction(formValues);
  return;
}

function addCourse() {
  // Placeholder text arrays
  var courseNamePlaceholders = ["ITIS3135 - Web-Based Application Design and Development", "ITCS3112 - Design and Implementation of Object-Oriented Systems", "ITIS3310 - Software Architecture & Design", "ITSC2181 - Introduction to Computer Systems"];
  var courseReasonPlaceholders = ["I really enjoy web development and want to fill any gaps in my knowledge.", "I've enjoyed using Java and learning Object-Oriented design and want to work more with it.", "I want to learn more about building applications from start to finish.", "I'm hoping to learn about how computers work at their most basic level."];

  // Find number of current courses
  var numberofCourses = document.getElementsByClassName('course-entry').length;

  // Use existing placeholder text for Courses 1-4, use default text if more are required
  var courseNamePlaceholderText = "";
  var courseReasonPlaceholderText = "";
  if (numberofCourses >= 0 && numberofCourses < 4) {
    courseNamePlaceholderText = courseNamePlaceholders[numberofCourses];
    courseReasonPlaceholderText = courseReasonPlaceholders[numberofCourses];
  } else {
    courseNamePlaceholderText = "ABCD1234 - Name of Course Goes Here";
    courseReasonPlaceholderText = "I am taking this course because ...";
  }

  // Create id variables
  var nameId = "course-name-" + numberofCourses;
  var reasonId = "course-reason-" + numberofCourses;
  var containerId = "course-" + numberofCourses;
  //Create strings for name and reason input fields
  var nameContent = "Course " + (numberofCourses + 1) + " Name: <input id=\"" + nameId + "\" name=\"" + nameId + "\" type=\"text\" placeholder=\"" + courseNamePlaceholderText + "\">";
  var reasonContent = "Reason You're Taking Course " + (numberofCourses + 1) + ": <textarea id=\"" + reasonId + "\" name=\"" + reasonId + "\" type=\"text\" placeholder=\"" + courseReasonPlaceholderText + "\"></textarea>";
  // Create a container (these counted for total number of current courses) and add input fields
  var courseContainer = document.createElement("div");
  courseContainer.classList.add("course-entry");
  courseContainer.setAttribute("id", containerId);
  // Name input field
  var courseNameElement = document.createElement("label");
  courseNameElement.setAttribute("for", nameId);
  courseNameElement.innerHTML = nameContent;
  // Reason input field
  var courseReasonElement = document.createElement("label");
  courseReasonElement.setAttribute("for", reasonId);
  courseReasonElement.innerHTML = reasonContent;
  // Append name and reason elements
  courseContainer.appendChild(courseNameElement);
  courseContainer.appendChild(courseReasonElement);
  // Create delete button if this is the first course added
  if (numberofCourses === 0) {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete a Course";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("id", "course-delete-button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("onclick", "deleteCourse();");
    document.getElementById('course-field').appendChild(deleteButton);
  }
  // Append container with input fields
  document.getElementById('course-field').appendChild(courseContainer);
}

function deleteCourse() {
  // Count current courses
  var numberofCourses = document.getElementsByClassName('course-entry').length;
  // Remove course, only if courses exist
  if (numberofCourses > 0) {
    document.getElementById("course-" + (numberofCourses - 1)).remove();
  }
  // Remove delete button if removing final course
  if (numberofCourses === 1) {
    document.getElementById("course-delete-button").remove();
  }
}

