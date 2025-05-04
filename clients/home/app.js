  // Wait for the entire DOM content to be loaded before running any script
  window.addEventListener('DOMContentLoaded', () => {

    // -------------------------------
    // 1. Add anchor links to section headers and apply NES-style container styling
    // -------------------------------

    // Select all <section> elements that have an "id" attribute
    document.querySelectorAll('section[id]').forEach((section) => {
      const id = section.id; // Store the section's ID for link use
      const h2 = section.querySelector('h2'); // Find the <h2> inside this section (expected heading)

      // If a heading exists, prepend an anchor link to the heading content
      if (h2) {
        // Replace the inner HTML of <h2> with a clickable anchor linking to this section
        h2.innerHTML = `<a href="#${id}">#</a> ` + h2.innerHTML;
      }

      // Add NES.css classes to visually style each section (rounded, dark-themed container)
      section.classList.add('nes-container', 'is-rounded', 'is-dark');
    });

    // -------------------------------
    // 2. Declare and retrieve necessary DOM elements used in the map and location functionality
    // -------------------------------

    const openStreetMapLink = document.getElementById('OpenStreetMapShortLink'); // Button or link that initiates map loading
    const eventDetails = document.getElementById('eventDetails'); // Container for event information (hidden when map is shown)
    const mapContainer = document.getElementById('mapContainer'); // Wrapper for the map and loader
    const iframe = document.getElementById('osmMap'); // The <iframe> that displays OpenStreetMap content
    const loadingText = document.querySelector('.loading-text'); // UI element to show user-facing loading messages
    const spinner = document.querySelector('.spinner'); // UI element to indicate loading activity (spinner animation)

    // -------------------------------
    // 3. Set up event listener for the map link/button
    // -------------------------------

    if (openStreetMapLink) {
      // If the button/link exists, add a click listener
      openStreetMapLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default behavior of link navigation
        showMap(); // Call function to display the map and request user location
      });
    }

    // -------------------------------
    // 4. Function to display the map and request geolocation
    // -------------------------------
    function showMap(
      mapUrl = 'https://osm.org/go/TlVqlgw68?m=',       // Default map link if no location is available
      loadingMessage = 'Getting your location...'       // Default message shown while trying to locate user
    ) {
      // Check that all required DOM elements exist to avoid null errors
      if (!eventDetails || !mapContainer || !iframe || !loadingText || !spinner) {
        console.error("One or more required DOM elements are missing.");
        return;
      }

      // Hide event detail UI since we're switching to the map
      eventDetails.style.display = 'none';

      // Show the map container so the user sees something happening
      mapContainer.style.display = 'block';

      // Set the default/fallback map URL into the iframe
      iframe.src = mapUrl;

      // Display loading message to the user while geolocation begins
      loadingText.textContent = loadingMessage;
      loadingText.style.display = 'block';

      // Show spinner animation to indicate activity
      spinner.style.display = 'block';

      // Check if the browser supports geolocation
      if (!navigator.geolocation) {
        // If not supported, inform the user
        loadingText.textContent = 'Geolocation is not supported by your browser.';
        spinner.style.display = 'none'; // Hide spinner since we can't proceed
        return;
      }

      // Request the user's current geolocation
      navigator.geolocation.getCurrentPosition(
        // Success callback: user location retrieved
        ({ coords }) => fetchDirections(coords.latitude, coords.longitude),

        // Error callback: something went wrong retrieving location
        (error) => handleGeolocationError(error, mapUrl)
      );
    }

    // -------------------------------
    // 5. Function to fetch directions using coordinates and update the map
    // -------------------------------
    function fetchDirections(lat, lon) {
      // Log the latitude and longitude for developer debugging
      console.log(`Fetching directions for coordinates: ${lat}, ${lon}`);

      // Simulate an API fetch or processing delay with setTimeout
      setTimeout(() => {
        // After the delay, hide the loading UI
        loadingText.style.display = 'none';
        spinner.style.display = 'none';

        // Update the iframe to center the map on the user's actual coordinates
        iframe.src = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
      }, 2000); // Wait 2 seconds to simulate data loading
    }

    // -------------------------------
    // 6. Function to handle errors if geolocation fails
    // -------------------------------
    function handleGeolocationError(error, fallbackMapUrl) {
      // Default message if something goes wrong
      let errorMessage = 'Geolocation access denied or failed.';

      // Customize message if the user explicitly denied access to their location
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage += ' Please enable location services to get directions.';
      }

      // Set iframe to the fallback static map URL
      iframe.src = fallbackMapUrl || 'https://osm.org/go/TlVqlgw68?m=';

      // Display the error message to the user
      loadingText.textContent = errorMessage;

      // Hide the spinner animation
      spinner.style.display = 'none';
    }

    // -------------------------------
    // 7. Initialize Leaflet map for a fixed location (HeatSync Labs)
    // -------------------------------

    const leafletMapDiv = document.getElementById('leafletMap'); // Container where Leaflet map will render
    const heatSyncCoords = [33.41536, -111.8344199]; // Static coordinates for HeatSync Labs in Mesa, AZ

    if (leafletMapDiv) {
      // Create a new Leaflet map centered on the specified coordinates, zoom level 20 (very close)
      const leafletMap = L.map('leafletMap').setView(heatSyncCoords, 20);

      // Add tile layer from OpenStreetMap with proper attribution
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // Maximum zoom level allowed
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap); // Add tiles to the map

      // Add a marker on the map at HeatSync’s location
      L.marker(heatSyncCoords)
        .addTo(leafletMap) // Add marker to the map
        .bindPopup('<b>HeatSync Labs</b><br>108 W Main St, Mesa, AZ 85201') // Tooltip text when marker is clicked
        .openPopup(); // Automatically open the popup on load
    }

  }); // End of DOMContentLoaded event listener
