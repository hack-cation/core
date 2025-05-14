// This array will store all custom team names the user creates.
// It begins empty and grows as the user adds new team names via the input form.
// Arrays in JavaScript are used to store lists of items in order.
let customTeamNames = [];


// First, we find and store important elements from the webpage (HTML) using their IDs.
// `document.getElementById` lets us find a specific element by its ID name.
// We do this so we can work with these elements in the script.

// This gets the form where the user types a new team name to add.
let namingForm = document.getElementById('teamOptionsForNamingMenu');

// This gets the input field where the user actually types the new team name.
let namingInput = document.getElementById('team1ForNamingForm');

// This gets the dropdown menu where the user can select a team from a list.
let dropdown = document.getElementById('teamSelect');

// This gets the part of the page that shows checkboxes for team selection.
let checkboxContainer = document.querySelector('.teamOptionsFromCheckboxesMenu');


// This part sets up an event listener on the team naming form.
// An event listener waits for a specific action — here, the user submitting the form.
// We use this to prevent the form from reloading the page, and instead handle the logic ourselves.
namingForm.addEventListener('submit', function(event) {
  event.preventDefault(); // This line stops the page from refreshing when the form is submitted.

  // Here we read what the user typed into the input box, and remove any spaces from the beginning or end.
  let teamName = namingInput.value.trim();

  // We only want to add the name if the user typed something AND it's not already in the list.
  if (teamName && !customTeamNames.includes(teamName)) {
    customTeamNames.push(teamName); // This adds the team name to our array (memory storage).
    updateDropdown();              // This updates the dropdown menu so the new name appears there.
    updateCheckboxes();            // This updates the checkbox list so the new team is shown.
    namingInput.value = '';        // This clears the input box so the user can type a new name easily.
  }
});


// This function rebuilds the dropdown menu every time a new team is added.
// It ensures the list always shows the current team names, both predefined and custom.
function updateDropdown() {
  // First, we define the static team names — these are always shown.
  let staticTeams = `
    <option value="">--Select a team--</option>
    <option value="teamMystic">Team Mystic</option>
    <option value="teamValor">Team Valor</option>
    <option value="teamInstinct">Team Instinct</option>
    <option value="teamRocket">Team Rocket</option>
    <option value="teamGalactic">Team Galactic</option>
  `;

  // We place the static options in the dropdown.
  dropdown.innerHTML = staticTeams;

  // Then, we loop through each custom team and add it as a new option in the dropdown.
  customTeamNames.forEach(function(team) {
    let option = document.createElement('option'); // Creates a new <option> element in HTML.
    option.value = team;                           // Sets the actual value that will be submitted.
    option.textContent = team;                     // Sets what the user sees in the menu.
    dropdown.appendChild(option);                  // Adds this new option to the dropdown menu.
  });
}


// This function refreshes the list of checkboxes, showing all current teams.
// It also attaches editable fields and save buttons for custom teams.
function updateCheckboxes() {
  // We first remove all previous custom checkboxes (not the predefined ones).
  // This ensures the list doesn't get duplicated each time.
  let oldCustomElements = checkboxContainer.querySelectorAll('.custom-team');
  oldCustomElements.forEach(el => el.remove());

  // We loop through each custom team name stored in the array.
  customTeamNames.forEach(function(team, index) {
    // We create a <div> to group all the elements related to one team.
    // Adding a class lets us easily find and delete these groups later.
    let wrapper = document.createElement('div');
    wrapper.className = 'custom-team';

    // This creates a small Pokémon icon image using a URL.
    // We use the index to show a different Pokémon each time (from 1 to 151).
    let icon = document.createElement('img');
    icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(index % 151) + 1}.png`;
    icon.classList.add('poke-icon'); // Adds a class so we can style the icon with CSS.

    // This creates the checkbox input so the user can select this team.
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `teamCheckbox${index}`; // Sets a unique ID so we can label it.
    checkbox.name = 'teams';
    checkbox.value = team;

    // This creates a text box where the user can edit the team name.
    let editableInput = document.createElement('input');
    editableInput.type = 'text';
    editableInput.className = 'editable-input';
    editableInput.value = team;

    // This creates a button that saves the new name if the user changes it.
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';

    // This tells the button what to do when clicked.
    saveButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevents any default behavior (like form submission).
      let newName = editableInput.value.trim(); // Gets the edited name and trims spaces.
      if (newName && !customTeamNames.includes(newName)) {
        customTeamNames[index] = newName; // Updates the name in our memory array.
        updateDropdown();                // Updates the dropdown to show the new name.
        updateCheckboxes();              // Updates the checkbox list with the new name.
      }
    });

    // Now we add each part of the team to the wrapper <div> in order.
    wrapper.appendChild(icon);          // Shows the Pokémon icon.
    wrapper.appendChild(checkbox);      // Shows the checkbox.
    wrapper.appendChild(editableInput); // Shows the editable team name.
    wrapper.appendChild(saveButton);    // Shows the save button.
    wrapper.appendChild(document.createElement('br')); // Adds a line break for clarity.

    // Finally, we add this wrapper to the page so the user can see it.
    checkboxContainer.appendChild(wrapper);
  });
}


// This sets up the "Reset" button for the dropdown team selector.
// When clicked, it resets the form back to its first (default) state.
let dropdownResetButton = document.getElementById('resetTeamOptionsFormDropdownButtonMenu');
dropdownResetButton.addEventListener('click', function(event) {
  event.target.form.reset(); // Resets all dropdown choices to default.
});


// This sets up the "Reset" button for the checkbox form.
// When clicked, it unchecks all selected boxes.
let checkboxResetButton = document.getElementById('resetTeamOptionsFormCheckboxesButtonMenu');
checkboxResetButton.addEventListener('click', function(event) {
  event.target.form.reset(); // Unchecks all checkboxes in the form.
});


// This adds a "Delete All Teams" button to let the user remove all custom teams.
// It's useful for starting fresh.
let deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete All Teams';       // The label users see on the button.
deleteButton.className = 'delete-button';            // Adds a class so it can be styled with CSS.

// When this button is clicked, we clear the custom team list and update the UI.
deleteButton.addEventListener('click', function() {
  customTeamNames = [];        // Empties the array of custom team names.
  updateDropdown();            // Rebuilds the dropdown menu with just static options.
  updateCheckboxes();          // Clears out all custom checkboxes.
});

// We add this delete button to the naming form, near where teams are added.
namingForm.appendChild(deleteButton);


// This extra section prevents the entire page from refreshing when any form is submitted.
// By default, forms try to send data to a server and reload the page.
// Since we are not using a server here, we stop that and show an alert for testing.
let allForms = document.querySelectorAll('form');
allForms.forEach(function(form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stops the form from submitting for real.
    alert("Form submitted (test mode)."); // Just a test message for confirmation.
  });
});
