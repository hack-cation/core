// Event listener for OpenStreetMap link
document.getElementById('OpenStreetMapShortLink').addEventListener('click', (e) => {
  e.preventDefault();
  showMap();
});

// Function to handle displaying the map and switching to OpenStreetMap view
function showMap() {
  const eventDetails = document.getElementById('eventDetails');
  const mapContainer = document.getElementById('mapContainer');
  const iframe = document.getElementById('osmMap');
  const loadingText = document.querySelector('.loading-text');
  const spinner = document.querySelector('.spinner');

  // Hide event details and show map container
  eventDetails.style.display = 'none';
  mapContainer.style.display = 'block';

  // Set iframe source to OpenStreetMap view
  iframe.src = 'https://osm.org/go/TlVqlgw68?m=';

  // Simulate loading for directions
  loadingText.style.display = 'block';
  spinner.style.display = 'block';

  // Attempt to get geolocation and fetch directions
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchDirections(lat, lon);
    }, handleGeolocationError);
  } else {
    loadingText.textContent = 'Geolocation is not supported by your browser.';
    spinner.style.display = 'none';
  }
}

// Function to fetch directions via Google Maps
function fetchDirections(lat, lon) {
  const destination = encodeURIComponent("108 W Main St, Mesa, AZ 85201");
  const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${lat},${lon}&destination=${destination}&mode=driving`;

  setTimeout(() => {
    loadingText.style.display = 'none';
    spinner.style.display = 'none';
  }, 2000);
}

// Function to handle errors when geolocation fails
function handleGeolocationError(error) {
  const loadingText = document.querySelector('.loading-text');
  const spinner = document.querySelector('.spinner');

  let errorMessage = 'Geolocation access denied or failed.';
  if (error.code === error.PERMISSION_DENIED) {
    errorMessage += ' Please enable location services to get directions.';
  }

  loadingText.textContent = errorMessage;
  spinner.style.display = 'none';
}
