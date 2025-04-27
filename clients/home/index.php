<?php

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Hack-cation 2025 event details and map to HeatSync Labs." />
  <meta property="og:image" content="image-link.jpg" />
  
  
  <title>Hack-cation 2025</title>

  <!-- External Stylesheet Link (for modularity) -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- temporarily loading Cascading Style Sheets for prototyping -->
  <style>
   /* Body Styling */
body {
  font-family: 'Arial', sans-serif;
  background-color: #111111;
  color: #fdf6ee;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
}

/* Header Styling */
header {
  background: linear-gradient(90deg, #e97451, #ff6f00);
  color: #000;
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  border-bottom: 3px solid #ffab76;
  box-shadow: 0 4px 10px rgba(255, 111, 0, 0.3);
}

/* Section Styling */
section {
  background-color: #1e1e1e;
  width: 90%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  border-left: 6px solid #e97451;
  box-shadow: 0 4px 20px rgba(255, 111, 0, 0.1);
}

h2 {
  color: #ffab76;
}

p {
  line-height: 1.6;
  color: #fdf6ee;
}

a {
  color: #ff6f00;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
  color: #ffab76;
}

/* Map Container Styling */
.mapContainer {
  display: none;
  width: 80vw;
  height: 80vh;
  margin-top: 20px;
}

/* Loading Spinner Styling */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #ff6f00;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  display: none;
}

.loading-text {
  color: #ffab76;
  font-weight: bold;
  margin: 10px;
  display: none;
}

/* iframe Container for Responsive Design */
.iframe-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  margin: 0 auto;
}

iframe {
  max-width: 100%;
  height: 100%;
  border: none;
}
</style>

  <!-- External JavaScript (for modularity) -->
  <script defer src="app.js"></script>
  
  <!-- temporarily loading JavaScript for prototyping -->
  <script>
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
</script>
  
</head>

<body>


  <!-- Main Header -->
  <header>
  Welcome to Hack-cation 2025: 
      <br>A Live-Action Pokédex of Innovation! 
	      <br>The first in the series of HACK-CATIONs, but not the last!
		      <br>An 8-Hour Code Quest to Catch Big Ideas, Evolve Skills & Push Boundaries</header>

  <!-- Intro Section: Explains the event -->
  <section id="intro">
    <h2>Your Hackathon Pokédex Has Been Activated...</h2>
    <p>Hack-cation 2025 isn't just a hackathon it's your entry into the world of digital discovery!
	Inspired by the Pokédex, the legendary tool from the Pokémon universe, this event turns every project, person, and presentation into a unique entry in our own living encyclopedia of code, creativity, and community.
    You’re not just showing up. 
    You’re logging in as a trainer, ready to identify, track, build, and collect ideas that’ll shape your next evolution. Inspired by the Pokédex...</p>
  </section>


    <section id="registerYourTrainerInfo">
    <h2>Register Your Trainer Info!</h2>
    <p>Click here to enter the Hack-cation Pokédex (tinyurl.com/hackcation2025 [placeholder link replace with your form!]
Claim your spot in this one-day, real-time tech adventure.</p>
  </section>
  
  
  <section id="whatIsInYourPokedex">
    <h2>What’s in Your Pokédex Today?</h2>
    <p>Fuel Your Trainer Stamina – Free pizza, snacks, and drinks all day
      Scan Wild Ideas – Workshops and challenges that reveal hidden abilities
      Catch 'Em All – Team up or solo to take down dev quests and build something epic
      Professors Present! – Hear from wise Trainers (that’s YOU!) with lightning talks and tech tales
      Battle Ready – Win prizes, glory, and rare swag for standout creations
      Evolve Through Collaboration – Connect with devs, designers, and thinkers in your region </p>
  </section>
  
  <section id="seekingTechProfessors">
    <h2>Seeking Tech Professors (That’s Presenters!)</h2>
    <p>Do you have the wisdom of Professor Oak and the passion of a Team Rocket speech (but, like, good intentions)?
We're looking for short, powerful presentations from those who want to share knowledge, projects, or hilarious dev fails. Bring your best demos, dev tales, and jaw-dropping projects — light up the room with your tech! If it belongs in the Pokédex, we want to hear it.</p>
  </section>
  
    <section id="callingAllItemShops">
    <h2>Calling All Item Shops (Sponsors!)</h2>
    <p>Do you represent a brand that believes in creative exploration and future tech trainers?
Partner with us to equip our hackers with the tools, swag, and encouragement they need. Support the local tech community and showcase your brand to a hungry, talented, innovation-obsessed crowd. Visibility. Engagement. Legendary support status unlocked. Let’s talk. </p>
  </section>
  
    <section id="whoCanEnterThePokedex">
    <h2>Who Can Enter the Pokédex?</h2>
    <p>EVERYONE. You don’t need all 8 Gym Badges just curiosity and the drive to build.
Whether you're a beginner catching your first bug (in code) or a champion-level coder chasing your next challenge, Hack-cation is your digital playground.</p>
  </section>


    <section id="postHackPokeBarDebrief">
    <h2>Post-Hack PokéBar Debrief</h2>
    <p>After the last code commit, our Trainers will migrate to a nearby local tavern for the unofficial official afterparty. It's a casual gathering to swap stories, trade high-fives, and reflect on all the wild builds caught during the day. Refreshments will be flowing. Pokédex entries will be updated.</p>
  </section>
  
      <section id="whyHack-cation">
    <h2>Why Hack-cation?</h2>
    <p>Because the journey matters more than the destination. Whether you’re here to build the next big app, make new friends, or just vibe and learn Hack-cation has a spot for you.
Because discovering something new in code, in collaboration, in yourself is what this is all about.
Because you don’t need to wait for a rare spawn to make something legendary.</p>
  </section>
  
      <section id="closing">
    <h2>Hack-cation is your chance to explore, build, and evolve.</h2>
    <p>So power up your laptop, grab your Pokédex, and join us for an unforgettable 8-hour quest.</p>
  </section>
  
    <!-- Event Details Section -->
<section id="eventDetails">
  <h2>Event Details</h2>
  <p>Date: Saturday, May 24th, 2025</p>
  <p>Time: 12:00 PM – 8:00 PM</p>
  <p>Location: HeatSync Labs, 108 W Main St, Mesa, AZ 85201</p>
  
  <!-- Container for centering iframe -->
  <div class="iframe-container">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.8639932471606!2d-111.83531376406164!3d33.418234627922686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872ba7e847f7f7a7%3A0x49fc0930c8d07906!2s108%20W%20Main%20St%2C%20Mesa%2C%20AZ%2085201!5e0!3m2!1sen!2sus!4v1745579043950!5m2!1sen!2sus" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>

  <p><a href="#" id="OpenStreetMapShortLink" aria-label="Open OpenStreetMap">View on OpenStreetMap</a></p>
</section>




  <!-- Map Container for OpenStreetMap (Initially hidden) -->
  <section class="mapContainer" id="mapContainer">
    <iframe id="osmMap" src="" aria-label="OpenStreetMap View"></iframe>
  </section>

  <!-- Footer Section -->
  <footer>
    <p>Let’s code, let’s create, and let’s catch 'em all — one idea at a time.</p>
  </footer>

  <!-- Loading Indicator -->
  <div id="loading-container">
    <p class="loading-text">Fetching directions...</p>
    <div class="spinner"></div>
  </div>






  <!-- later on Add Content Security Policy headers and ensure Hypertext Transfer Protocol Secure is used with letsencrypt
  Content-Security-Policy: default-src 'self'; script-src 'self' https://maps.googleapis.com; frame-src 'self' https://osm.org; -->
  
  
  
</body>

</html>
