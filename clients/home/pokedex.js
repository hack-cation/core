// 📝 This array will store all team names that users create dynamically.
// It starts empty and gets filled as users enter team names.
let customTeamNames = [];

// 🧩 These lines fetch HTML elements using their IDs or class selectors.
// We store them in variables to easily interact with them later.

// This gets the entire team naming form element so we can listen to submissions.
let namingForm = document.getElementById('teamOptionsForNamingMenu');

// This gets the input field where the user types a custom team name.
let namingInput = document.getElementById('team1ForNamingForm');

// This refers to the <select> dropdown where teams will be shown as choices.
let dropdown = document.getElementById('teamSelect');

// This is the <div> that contains all the checkboxes for selecting multiple teams.
let checkboxContainer = document.querySelector('.teamOptionsFromCheckboxesMenu');

// 🔁 This event listener waits for the naming form to be submitted (when the user presses enter or clicks submit).
// Instead of sending data to a server, it processes the name right here in the browser.
namingForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Stops the page from reloading.

  // ✂️ We take the value from the input field and remove extra whitespace.
  let teamName = namingInput.value.trim();

  // ✅ If a name was entered and it's not already in our list, we add it.
  if (teamName && !customTeamNames.includes(teamName)) {
    customTeamNames.push(teamName); // Store the name
    updateDropdown();               // Update the dropdown menu with new teams
    updateCheckboxes();             // Recreate the checkboxes with the new teams
    namingInput.value = '';         // Clear the input field after adding
  }
});

// 📦 This function updates the dropdown menu to match the current list of team names.
// First, it clears out any old team names so we don’t duplicate them.
function updateDropdown() {
  // Reset dropdown to just the placeholder option.
  dropdown.innerHTML = '<option value="">--Select a team--</option>';

  // Go through each team name and create a new <option> element for it.
  customTeamNames.forEach(function (team) {
    let option = document.createElement('option'); // Creates a <option> tag
    option.value = team;                           // Sets the internal value
    option.textContent = team;                     // Sets the visible text
    dropdown.appendChild(option);                  // Adds it to the dropdown menu
  });
}

// 🗂️ This function rebuilds the list of checkboxes every time a new team is added.
// It first deletes any existing checkboxes, then adds new ones based on current team names.
function updateCheckboxes() {
  // Remove all existing checkboxes, labels, and <br> elements.
  let oldElements = checkboxContainer.querySelectorAll('input[type="checkbox"], label, br, .editable-input, .save-button, .poke-icon');
  oldElements.forEach(el => el.remove());

  // Loop over the list of team names to create a checkbox for each.
  customTeamNames.forEach(function (team, index) {
    // Create a Pokémon icon to display next to the team name.
    let icon = document.createElement('img');
    icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(index % 151) + 1}.png`; // 1-151 original Pokémon
    icon.classList.add('poke-icon'); // Applies styling (e.g., size, margin)

    // Create the checkbox input.
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `teamCheckbox${index}`; // Unique ID for label linking
    checkbox.name = 'teams';
    checkbox.value = team;

    // Create an editable input field so the user can change the team name.
    let editableInput = document.createElement('input');
    editableInput.type = 'text';
    editableInput.className = 'editable-input';
    editableInput.value = team;

    // Create a "Save" button to save changes to the team name.
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';

    // When save is clicked, we update the team name and rebuild the UI.
    saveButton.addEventListener('click', function () {
      let newName = editableInput.value.trim();
      if (newName && !customTeamNames.includes(newName)) {
        customTeamNames[index] = newName; // Update in array
        updateDropdown();                 // Update dropdown list
        updateCheckboxes();               // Refresh checkboxes
      }
    });

    // Create a label for the checkbox so users can see what it refers to.
    let label = document.createElement('label');
    label.htmlFor = checkbox.id; // Connects label to checkbox via ID
    label.textContent = team;    // Show the team name

    // Append everything to the checkbox container in the correct order.
    checkboxContainer.appendChild(icon);           // Pokémon icon
    checkboxContainer.appendChild(checkbox);       // Checkbox
    checkboxContainer.appendChild(editableInput);  // Editable name field
    checkboxContainer.appendChild(saveButton);     // Save button
    checkboxContainer.appendChild(document.createElement('br')); // Line break
  });
}

// 🔄 This listens for the "Reset" button in the dropdown form and clears the selected option.
let dropdownResetButton = document.getElementById('resetTeamOptionsFormDropdownButtonMenu');
dropdownResetButton.addEventListener('click', function (event) {
  event.target.form.reset(); // Resets form back to first option
});

// 🔄 Same thing for the checkboxes — this will clear all selected checkboxes.
let checkboxResetButton = document.getElementById('resetTeamOptionsFormCheckboxesButtonMenu');
checkboxResetButton.addEventListener('click', function (event) {
  event.target.form.reset(); // Unchecks everything in the form
});

// 🗑️ Optional: This adds a "Delete All Teams" button so the user can clear the entire list.
let deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete All Teams';
deleteButton.className = 'delete-button'; // Style it using CSS
deleteButton.addEventListener('click', function () {
  customTeamNames = [];        // Clear the array
  updateDropdown();            // Remove all from dropdown
  updateCheckboxes();          // Remove all from checkboxes
});

// Add the delete button to the naming form area.
namingForm.appendChild(deleteButton);

// 🚧 While you're still testing the site, this prevents all form submissions from refreshing the page.
// When you're ready to submit to a server, you can remove or modify this.
let allForms = document.querySelectorAll('form');
allForms.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop real submission
    alert("Form submitted (test mode)."); // Show visual confirmation
  });
});
