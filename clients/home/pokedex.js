
  
//JavaScript section for handling resets and preventing default form behavior
    // Handle reset for checkboxes form
    document.getElementById('resetTeamOptionsFormCheckboxesButtonMenu').addEventListener('click', function (event) {
      event.target.form.reset();
      
      // Prevent button from submitting form
      //event.preventDefault(); 

      // Select all checkbox inputs with name="teams"
      //const checkboxes = document.querySelectorAll('input[type="checkbox"][name="teams"]');

      // Loop through each checkbox and uncheck it
      /*checkboxes.forEach(function (cb) {
        cb.checked = false;
      });*/
    });

    // Handle reset for dropdown form
    document.getElementById('resetTeamOptionsFormDropdownButtonMenu').addEventListener('click', function (event) {
        event.target.form.reset();

        // Prevent button from submitting form
        //event.preventDefault(); 

      // Reset the dropdown menu to the first option older way of doing the action
      // document.getElementById('teamSelect').selectedIndex = 0;
    });

    // Optional: prevent actual form submissions while testing
    const forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload on submit
        alert("yay"); // Visual feedback
      });
    });

