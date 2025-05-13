// Create an empty array to store the custom team names entered by the user
let customTeamNames = [];

// Get references to HTML elements using their unique IDs
let namingForm = document.getElementById('teamOptionsForNamingMenu'); // The form where the user enters their team name
let namingInput = document.getElementById('team1ForNamingForm'); // The input field where the user types the team name
let dropdown = document.getElementById('teamSelect'); // The dropdown menu where team names will appear
let checkboxContainer = document.querySelector('.teamOptionsFromCheckboxesMenu'); // The container for the checkboxes that will list teams

// Add an event listener to the form to listen for a "submit" event (when the user submits the form)
namingForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the form from refreshing the page when the user submits it

  // Retrieve the value the user has entered in the naming input field
  let teamName = namingInput.value.trim(); // Trim spaces from the beginning and end of the name

  // Check if the user entered a non-empty team name and if that name is not already in the customTeamNames array
  if (teamName && !customTeamNames.includes(teamName)) {
    customTeamNames.push(teamName); // Add the new team name to the array
    updateDropdown(); // Update the dropdown menu with the new team name
    updateCheckboxes(); // Update the checkboxes with the new team name
    namingInput.value = ''; // Clear the input field after adding the team name
  }
});

// Function to update the dropdown menu with all the custom team names
function updateDropdown() {
  // Clear all the options in the dropdown, leaving just the placeholder option
  dropdown.innerHTML = '<option value="">--Select a team--</option>';

  // Loop through each custom team name and create a new option element for it
  customTeamNames.forEach(function (team) {
    let option = document.createElement('option'); // Create a new <option> element
    option.value = team; // Set the value of the option to the team name
    option.textContent = team; // Set the display text of the option to the team name
    dropdown.appendChild(option); // Add the option to the dropdown menu
  });
}

// Function to update the checkboxes with all the custom team names
function updateCheckboxes() {
  // Select all the checkbox input elements, labels, and line breaks within the checkbox container
  let checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"], label, br');

  // Loop through each of the checkbox elements and remove them from the container
  checkboxes.forEach(function (el) {
    el.remove(); // Remove each element from the container
  });

  // Loop through each custom team name to create a new checkbox and label for it
  customTeamNames.forEach(function (team, index) {
    let checkbox = document.createElement('input'); // Create a new <input> element for the checkbox
    checkbox.type = 'checkbox'; // Set the input type to checkbox
    checkbox.id = `teamCheckbox${index}`; // Set a unique ID for each checkbox
    checkbox.name = 'teams'; // Give the checkboxes the same name, so they can be grouped together
    checkbox.value = team; // Set the value of the checkbox to the team name

    let label = document.createElement('label'); // Create a new <label> element
    label.htmlFor = checkbox.id; // Set the label's "for" attribute to the checkbox's ID (links them)
    label.textContent = team; // Set the label text to the team name

    // Append the checkbox, label, and a line break to the checkbox container
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement('br'));
  });
}

// Add event listener to the "Reset" button for the dropdown menu
let resetDropdownButton = document.getElementById('resetTeamOptionsFormDropdownButtonMenu');
resetDropdownButton.addEventListener('click', function (event) {
  event.target.form.reset(); // Reset the dropdown form (clears the selected value)
});

// Add event listener to the "Reset" button for the checkboxes menu
let resetCheckboxesButton = document.getElementById('resetTeamOptionsFormCheckboxesButtonMenu');
resetCheckboxesButton.addEventListener('click', function (event) {
  event.target.form.reset(); // Reset the checkboxes form (unchecks all checkboxes)
});

// Optional: Prevent actual form submissions while testing
let forms = document.querySelectorAll('form'); // Select all form elements on the page
forms.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and causing a page reload
    alert("Form submitted (test mode)."); // Display an alert to simulate a successful form submission
  });
});

// Function to save the custom team names to localStorage so they persist even after page reload
function saveTeams() {
  localStorage.setItem('teams', JSON.stringify(customTeamNames)); // Save the custom team names array to localStorage
}

// Function to load the saved team names from localStorage and display them
function loadTeams() {
  let savedTeams = localStorage.getItem('teams'); // Retrieve the saved teams from localStorage
  if (savedTeams) {
    customTeamNames = JSON.parse(savedTeams); // Parse the JSON string back into an array
    updateDropdown(); // Update the dropdown with the saved team names
    updateCheckboxes(); // Update the checkboxes with the saved team names
  }
}

// Load saved teams on page load
window.addEventListener('load', function () {
  loadTeams(); // Call the loadTeams function to populate the page with saved team names
});
