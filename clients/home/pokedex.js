/* 
  This JavaScript file adds interactivity to the Pokédex Team Builder app.
  It allows users to create, name, edit, delete, and select Pokémon teams,
  and includes a theme toggle to switch between dark (default) and bright light mode.
*/

/* ============================================================================
   GLOBAL DATA: Team Storage
   ============================================================================ */

// This array stores custom team names added by the user.
// We start with an empty list and dynamically add to it.
let customTeamNames = [];

/* ============================================================================
   SELECT HTML ELEMENTS FOR INTERACTION
   ============================================================================ */

// These variables grab specific elements from the HTML page to interact with:
// - The form used to add new team names
// - The input field where names are typed
// - The dropdown menu for selecting teams
// - The area where team checkboxes are displayed

let namingForm = document.getElementById('teamOptionsForNamingMenu');
let namingInput = document.getElementById('team1ForNamingForm');
let dropdown = document.getElementById('teamSelect');
let checkboxContainer = document.querySelector('.teamOptionsFromCheckboxesMenu');

/* ============================================================================
   TEAM NAME SUBMISSION: Add New Team
   ============================================================================ */

// This listens for the form submission event, when a user adds a new team.
namingForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop the page from reloading

  // Read the input, trim whitespace, and check it's not already added
  let teamName = namingInput.value.trim();
  if (teamName && !customTeamNames.includes(teamName)) {
    customTeamNames.push(teamName); // Add new team name to memory
    updateDropdown();               // Refresh dropdown options
    updateCheckboxes();             // Refresh checkbox list
    namingInput.value = '';         // Clear the input box
  }
});

/* ============================================================================
   UPDATE DROPDOWN: Refresh with Static + Custom Teams
   ============================================================================ */

function updateDropdown() {
  // Static/default team options that are always shown
  let staticTeams = `
    <option value="">--Select a team--</option>
    <option value="teamMystic">Team Mystic</option>
    <option value="teamValor">Team Valor</option>
    <option value="teamInstinct">Team Instinct</option>
    <option value="teamRocket">Team Rocket</option>
    <option value="teamGalactic">Team Galactic</option>
  `;

  // Add static options first
  dropdown.innerHTML = staticTeams;

  // Then add each custom team name as a new <option>
  customTeamNames.forEach(function(team) {
    let option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    dropdown.appendChild(option);
  });
}

/* ============================================================================
   UPDATE CHECKBOXES: Show Custom Teams with Edit + Save
   ============================================================================ */

function updateCheckboxes() {
  // Clear any existing custom team elements
  let oldCustomElements = checkboxContainer.querySelectorAll('.custom-team');
  oldCustomElements.forEach(el => el.remove());

  // For each custom team, create a set of UI components
  customTeamNames.forEach(function(team, index) {
    let wrapper = document.createElement('div');
    wrapper.className = 'custom-team';

    // Create a unique Pokémon icon
    //let icon = document.createElement('img');
    //icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(index % 151) + 1}.png`;
    //icon.classList.add('poke-icon');

    // Create a checkbox for team selection
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `teamCheckbox${index}`;
    checkbox.name = 'teams';
    checkbox.value = team;

    // Create an editable text field to rename the team
    let editableInput = document.createElement('input');
    editableInput.type = 'text';
    editableInput.className = 'editable-input';
    editableInput.value = team;

    // Create a save button to confirm edits
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';

    // When the save button is clicked:
    saveButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent accidental form submission
      let newName = editableInput.value.trim();
      if (newName && !customTeamNames.includes(newName)) {
        customTeamNames[index] = newName; // Update name in memory
        updateDropdown();                 // Refresh dropdown and checkboxes
        updateCheckboxes();
      }
    });

    // Append all parts into the wrapper container
    wrapper.appendChild(icon);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(editableInput);
    wrapper.appendChild(saveButton);
    wrapper.appendChild(document.createElement('br'));

    // Add wrapper to the page
    checkboxContainer.appendChild(wrapper);
  });
}

/* ============================================================================
   RESET BUTTONS: Dropdown and Checkbox Forms
   ============================================================================ */

// Reset dropdown back to its default state
let dropdownResetButton = document.getElementById('resetTeamOptionsFormDropdownButtonMenu');
dropdownResetButton.addEventListener('click', function(event) {
  event.target.form.reset();
});

// Uncheck all boxes in the checkbox form
let checkboxResetButton = document.getElementById('resetTeamOptionsFormCheckboxesButtonMenu');
checkboxResetButton.addEventListener('click', function(event) {
  event.target.form.reset();
});

/* ============================================================================
   DELETE ALL TEAMS: Clear Custom Teams
   ============================================================================ */

let deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete All Teams';
deleteButton.className = 'delete-button';

deleteButton.addEventListener('click', function() {
  customTeamNames = [];   // Clear all team names
  updateDropdown();       // Refresh the dropdown
  updateCheckboxes();     // Refresh the checkbox list
});

// Add delete button to the form for visibility
namingForm.appendChild(deleteButton);

/* ============================================================================
   THEME TOGGLE: Dark (Default) / Light Switch
   ============================================================================ */

// Grab the checkbox used to toggle themes
let themeToggle = document.getElementById('theme-toggle');

// Get the <body> tag so we can add/remove classes
let body = document.body;

// Check if a theme was previously saved in browser storage
let savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  // If there was a saved theme, apply it
  body.classList.add(savedTheme);
  themeToggle.checked = savedTheme === 'light';
} else {
  // Default to dark mode
  body.classList.add('dark');
  themeToggle.checked = false;
}

// When the user toggles the theme switch:
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    // Switch to bright light mode
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    // Switch back to dark mode
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

/* ============================================================================
   FORM SUBMISSION CATCH: Prevent Accidental Reloads
   ============================================================================ */

// Prevent any form from submitting to a server or reloading the page
let allForms = document.querySelectorAll('form');
allForms.forEach(function(form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stops form from reloading page
    alert("Form submitted (test mode).");
  });
});

/* ============================================================================
   END OF FILE
   ============================================================================ */
