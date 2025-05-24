// Slide Data Array: Holds information for each slide
const slideData = [
    // Slide 1: Welcome slide with logos
    {
        title: "Welcome to .Hack//cation May 2025!",
        content:
        `
        /*this is a comment: need to hot link or back link the hack//cation logo and put in the tagline */
            <p><strong>.Hack//cation Logo</strong> <img src="hack//cation-Logo.png" alt="Hack//cation Logo"></p>
            <p>TagLine: <em>its suppose to be fun</em></p>
        
        /*this is a comment: need to hot link or back link the vulcanus systems logo and put in the tagline */
            <p><strong>Presented and Hosted by:</strong> <img src="vulcanus-logo.png" alt="Vulcanus Systems Logo"></p>
            <p>TagLine: <em>Forging the future of software, one masterpiece at a time</em></p>

        /*this is a comment: need to put in the tagline for getsnooz.com*/
            <p><strong>Sponsored by:</strong> <img src="https://getsnooz.com/cdn/shop/files/SNOOZ-Logo-PNG.png?v=1682532565&width=600" alt="GetSnooz Logo"></p>
            <p>Tagline: <em>A Journey into the World of Innovation and Collaboration</em></p>

        `,
        // Unique ID for slide 1
        id: "slide1" 
    },

    // Slide 2: Description of what a Hackathon is and why you should care
    {
        title: "What is a Hackathon? And Why Should You Care?",
        content: `
            <h3>T.L.D.R.:</h3>
            <p>It’s an event to challenge yourself with building projects to grow and have fun.</p>
            <h3>Longer version:</h3>
            <p>A hackathon is so much more than just an event—it’s an exhilarating challenge that brings together people with diverse skills, backgrounds, and passions to create something new in a very short period of time. It’s a space where innovation, collaboration, and creativity collide in the best possible way.</p>
            <p><strong>Here’s what makes a hackathon so special:</strong>
            <p><strong>An Unleashed Creative Playground:</strong> At a hackathon, there are no limits to what you can build. It’s not about following strict guidelines or fitting into a predefined mold. It’s about exploring new ideas, experimenting with new technologies, and pushing the boundaries of what you thought was possible.</p>

            <p><strong>Learning on the Fly:</strong>Whether you're a seasoned coder or someone just getting started, hackathons provide an environment where learning happens at lightning speed. You’ll dive deep into new tools, frameworks, and concepts that you may not have encountered before—and you’ll learn from your fellow participants.</p>
            <p><strong>Real-World Impact:</strong> Unlike traditional learning environments, a hackathon allows you to work on real-world problems and create tangible solutions. The things you build here can have lasting value—not just in the hackathon, but potentially in the real world as well.</p>
            <p><strong>Why Should YOU Care About Hackathons?</strong></p>
            <ul>
                <li><strong>Challenge Yourself:</strong> Hackathons are all about stepping out of your comfort zone. They push you to think critically, problem-solve creatively, and collaborate effectively. If you’ve ever wanted to take on a challenge that tests your skills, a hackathon is the perfect place to do it.</li>
                <li><strong>Build a Portfolio:</strong> The projects you work on during a hackathon aren’t just abstract exercises—they’re real, working solutions that can live in your portfolio, on your resume, or even as a fully functional product. Employers look for problem-solvers who can take initiative, and a hackathon is one of the best ways to prove that you’ve got the chops.</li>
                <li><strong>Meet Like-Minded Innovators:</strong> Whether you’re looking to find a co-founder for your next big idea or simply meet people who share your passions, hackathons are a great way to network with industry professionals, fellow creators, and future collaborators.</li>
                <li><strong>Have Fun!</strong> While it’s a competitive event, the energy and excitement at a hackathon are like no other. You’ll be surrounded by passionate people all trying to build, learn, and create something new. It’s a chance to be part of something bigger, share ideas, and, most importantly, have fun while doing it!</li>
            </ul>
            <p>This year, we’re taking it up a notch by theming our hackathon around one of the most beloved franchises of all time: Pokémon! Specifically, we’ll be diving deep into the world of the Pokédex—that iconic, digital encyclopedia of Pokémon creatures that has captured the imagination of millions.
Expect a series of challenges that are not only fun and engaging, but will stretch your problem-solving and technical skills as you build out tools, features, and experiences inspired by the Pokémon universe. This hackathon isn’t just about writing code; it’s about designing, experimenting, and creating experiences that have real-world impact.
Whether you’re here for the love of Pokémon, the thrill of solving puzzles, or the chance to learn something new, get ready to push your limits, collaborate with others, and explore a world full of possibilities. The adventure starts now!</p>
        `,
        // Unique ID for slide 2
        id: "slide2"
    },

    // Slide 3: Event schedule and agenda
    {
        title: "Event Schedule & Agenda",
        content: 
        /*this is a comment: need to put the hotlink or backlink to the schedule/agenda that was just created, though it has not been pushed yet*/
        `
            <p>Here’s what you can expect:</p>
            <ul>
                <li><strong>Day 1:</strong></li>
                <li>11:00 AM Welcome & Introduction</li>
                <li>12:00 AM Hackathon Kickoff: Challenge Announcement</li>
                <li>1:00 PM Coding Begins: Explore the Pokédex Theme</li>
                <li>2:00 PM Refining Your Project: User Testing & Feedback</li>
                <li>3:00 PM Final Touches & Pre-Presentation Preparation</li>
                <li>5:00 PM Evening Wrap-Up: Team Check-ins</li>
                <li>6:00 PM Presentations Begin</li>
                <li>8:00 PM Judging and Awards Ceremony</li>
            </ul>
            <p><em>Note: Times are approximate. Flexibility is encouraged!</em></p>
        `,
        // Unique ID for slide 3
        id: "slide3"
    },

    // Slide 4: Rules and submission guidelines
    {
        title: "Rules & Submission Guidelines",
        content: `
            <ul>
                <li><strong>Theme:</strong> All projects must align with the Pokédex theme (Pokémon mechanics, characters, or world).</li>
                <li><strong>Team Size:</strong> Teams of 1, 3, 5, or 7 are allowed. If you work in a team, you will split the prizes. Only one submission per team is allowed.</li>
                <li><strong>AI Usage:</strong> Artificial Intelligence can assist in your learning but cannot be used to complete your project directly.</li>
                <li><strong>Originality:</strong> Your project must be created during the hackathon timeframe. No pre-existing code or designs unless explicitly allowed.</li>
            </ul>
        `,
        // Unique ID for slide 4
        id: "slide4"
    },

    // Slide 5: Version control and documentation requirements
    {
        title: "Version Control & Documentation",
        content: `
            <p>To ensure smooth collaboration and track your progress, version control is mandatory. Make sure to:</p>
            <ul>
                <li>Use GitHub, GitLab, or Bitbucket for project history.</li>
                <li>Commit frequently to show your development process.</li>
                <li>Keep detailed commit messages and include branching for major features.</li>
            </ul>
            <p><em>Remember: Without version control, your project won’t be eligible for review.</em></p>
        `,
        // Unique ID for slide 5
        id: "slide5"
    },

    // Slide 6: Deliverables and deployment requirements
    {
        title: "Deliverables and Deployment",
        content: `
            <p>This hackathon isn’t just about potential ideas—it’s about execution! You must submit:</p>
            <ul>
                <li>A working prototype that is live online (e.g., a web app, API, etc.).</li>
                <li>Clear documentation on how to use your project.</li>
                <li>Evidence of progress through version history, commits, and collaboration.</li>
            </ul>
            <p>Make sure your project is deployed to a platform like Netlify, Heroku, Vercel, etc., and that it’s fully accessible for judging.</p>
        `,
        // Unique ID for slide 6
        id: "slide6"
    },

    // Slide 7: Presentation guidelines
    {
        title: "Presentations",
        content: `
            <p>Each team will present their project to the judges and fellow participants. Presentations should cover:</p>
            <ul>
                <li>The technologies you learned and used.</li>
                <li>Pain points you encountered and how you overcame them.</li>
                <li>Breakthroughs you achieved—what worked, what didn’t, and why it matters.</li>
                <li>A demo showing the functionality of your project.</li>
            </ul>
            <p><strong>Presentation Time:</strong> 3 to 5 minutes. Be clear, concise, and engaging!</p>
            <p><em>Tip: Focus on telling a story—what was the problem, how did you solve it, and what impact will your solution have?</em></p>
        `,
        // Unique ID for slide 7
        id: "slide7"
    },

    // Slide 8: Peer judging information
    {
        title: "Peer Judging: You’re the Judge!",
        content: `
            <p>In an exciting twist, you’ll be judging your peers! Each team will evaluate other projects based on:</p>
            <ul>
                <li><strong>Innovation and Creativity:</strong> How unique or original is the project?</li>
                <li><strong>Technical Execution:</strong> How well was the project built and implemented?</li>
                <li><strong>Adherence to the Pokédex Theme:</strong> Does the project stay true to the theme?</li>
                <li><strong>Presentation Quality:</strong> How clear and compelling was the final presentation?</li>
            </ul>
            <p>This is your chance to evaluate, learn from, and appreciate your fellow participants' work.</p>
        `,
        // Unique ID for slide 8
        id: "slide8"
    },

    // Slide 9: Submission instructions
    {
        title: "How to Submit Your Project",
        content: `
            <p>Once your project is ready, submit it via email to:</p>
            <p><strong>AUSTIN@VULCANUSSYSTEMS.COM</strong></p>
            <ul>
                <li>Your team name, and your individual names</li>
                <li>A link to your live project (GitHub, Heroku, etc.)</li>
                <li>A brief project description</li>
                <li>A summary of the technologies used and the challenges faced</li>
            </ul>
            <p><em>Be sure to submit on time or risk disqualification!</em></p>
        `,
        // Unique ID for slide 9
        id: "slide9"
    },

    // Slide 10: Networking and community information
    {
        title: "Networking & Community",
        content: `
            <p>One of the best things about a hackathon is the community. Throughout the event, you can:</p>
            <ul>
                <li>Collaborate with like-minded innovators and problem-solvers.</li>
                <li>Join our Discord channel to share ideas, ask questions, and get help.</li>
                <li>Use the event hashtag #.Hack//cationMay2025 on social media to share your journey, progress, and fun moments!</li>
            </ul>
            <p> Don’t forget, hackathons are all about building relationships and learning together!</p>
        `,
        // Unique ID for slide 10
        id: "slide10"
    },

    // Slide 11: Gamification & Competition
    {
        title: "Gamification & Friendly Competition",
        content: `
            <p>Hackathons are fun, and what’s more fun than a little healthy competition? Here’s how you’ll compete:</p>
            <ul>
                <li><strong>Live Leaderboard</strong> Track progress and see how your project compares with others in real time.</li>
                <li><strong>Judging</strong> You’ll be evaluated not just by judges, but by your peers—so bring your A-game!</li>
                <li><strong>Prizes</strong> There will be awards for the most creative, technically impressive, and user-friendly projects. </li>
            </ul>
            <p>Remember: It’s not just about winning—it’s about learning, having fun, and pushing your limits.</p>
        `,
        // Unique ID for slide 11
        id: "slide11"
    },

    // Slide 12: Fun moments and social activities
    {
        title: "Fun Moments & Social Activities",
        content: `
            <p>While it’s all about hacking and creating, we’ve also set up some fun social activities during the event:</p>
            <ul>
                <li><strong>Pokémon Trivia:</strong> Test your Pokémon knowledge for prizes!</li>
                <li><strong>Social Hour:</strong> Relax and network with your peers.</li>
                <li><strong>Afterparty:</strong> We’re throwing a fun afterparty to unwind!</li>
            </ul>
        `,
        // Unique ID for slide 12
        id: "slide12"
    },

    // Slide 13: Thank you and closing remarks
    {
        title: "Thank You",
        content: `
            <p>Thank you for participating in .Hack//cation May 2025!</p>
            <p>We hope you had a great time, learned something new, and created something amazing. Stay tuned for upcoming events, and remember to keep building!</p>
            <p>Thank you for being part of .Hack//cation May 2025! Get ready for a fun-filled, challenging, and rewarding experience. We can’t wait to see your amazing projects and innovations!
Let the adventure begin—Go, .Hack//cation! </p>
            <p><strong>Keep hacking, and we’ll see you next time!</strong></p>
        `,
        // Unique ID for slide 13
        id: "slide13"
    }
];


// Function to create a slide element with content
function createSlide(slide) {
    // Create a section for the slide
    const slideSection = document.createElement("section");
    slideSection.classList.add("slide", "fade");
    slideSection.id = slide.id; // Set unique ID for each slide
    
    // Create an article for the slide content
    const article = document.createElement("article");
    
    // Add slide title
    const slideTitle = document.createElement("h2");
    slideTitle.textContent = slide.title;
    article.appendChild(slideTitle);
    
    // Add slide content
    article.innerHTML += slide.content;
    
    // Append article to section
    slideSection.appendChild(article);
    
    return slideSection;
}

// Function to render all slides to the slideshow container
function renderSlides() {
    const slideshowContainer = document.getElementById("slideshow-container");
    slideData.forEach(slide => {
        const slideElement = createSlide(slide); // Generate slide from data
        slideshowContainer.appendChild(slideElement); // Append slide to container
    });
}

// Function to hide all slides
function hideAllSlides() {
    const slides = document.querySelectorAll('.slide'); // Get all slides
    slides.forEach(slide => {
        slide.style.display = 'none'; // Hide each slide
    });
}

// Function to show a specific slide based on index
function showSlide(index) {
    hideAllSlides(); // First, hide all slides
    const slides = document.querySelectorAll('.slide');
    slides[index].style.display = 'block'; // Display the slide at the given index
}

// Function to move to the next slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slideData.length; // Move to next slide, loop back to start if at the end
    showSlide(currentSlideIndex); // Show the new slide
}

// Function to move to the previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slideData.length) % slideData.length; // Move to previous slide, loop back to end if at the start
    showSlide(currentSlideIndex); // Show the new slide
}

// Initialize the first slide index
let currentSlideIndex = 0;

// Set up event listeners for navigation (optional: use buttons or automatic navigation)
document.getElementById("next-btn").addEventListener("click", nextSlide);
document.getElementById("prev-btn").addEventListener("click", prevSlide);

// Initialize the slideshow by rendering slides and showing the first slide
document.addEventListener("DOMContentLoaded", () => {
    renderSlides(); // Render slides on page load
    showSlide(currentSlideIndex); // Show the first slide
});



