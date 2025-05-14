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
let teamNames = ["Team Mystic","Team Valor","Team Rocket"];

/* ============================================================================
   SELECT HTML ELEMENTS FOR INTERACTION
   ============================================================================ */

// These variables grab specific elements from the HTML page to interact with:
// - The form used to add new team names
// - The input field where names are typed
// - The dropdown menu for selecting teams
// - The area where team checkboxes are displayed

const namingForm = document.getElementById('teamOptionsForNamingMenu');
const namingInput = document.getElementById('team1ForNamingForm');
const dropdown = document.getElementById('teamSelect');
const checkboxContainer = document.querySelector('#teamOptionsForCheckboxesMenu fieldset');

/* ============================================================================
   TEAM NAME SUBMISSION: Add New Team
   ============================================================================ */

// This listens for the form submission event, when a user adds a new team.
namingForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop the page from reloading

  // Read the input, trim whitespace, and check it's not already added
  let teamName = namingInput.value.trim();
  if (teamName && !teamNames.includes(teamName)) {
    teamNames.push(teamName); // Add new team name to memory
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


  // Add static options first
  dropdown.innerHTML = '<option value="">--Select a team--</option>';

  // Then add each custom team name as a new <option>
  teamNames.forEach(function(team) {
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
     checkboxContainer.innerHTML = "";

  // For each custom team, create a set of UI components
  teamNames.forEach(function(team, index) {
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

    let label = document.createElement("label");
    label.for = checkbox.id;
    label.innerText = team;

    // Append all parts into the wrapper container
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

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
 // teamNames = [];   // Clear all team names
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
