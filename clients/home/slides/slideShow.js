// Slide Data Array: Holds information for each slide
const slideData = [
    // Slide 1: Welcome slide with logos
    {
        title: "Welcome to .hack//cation May 2025!",
        content:
        `
            <p><strong>.hack//cation Logo</strong> <img src="hack//cation-Logo.png" alt="Hack//cation Logo"></p>
            <p>TagLine: <em>its suppose to be fun</em></p>
        
            <p>
                <strong>Presented and Hosted by:</strong> 
                <a href="https://vulcanussystems.com/">
                    <svg alt="VULCANUS SYSTEMS" xmlns="http://www.w3.org/2000/svg" width=100 class="hero-logo" id="Layer_1" data-name="Layer 1" viewBox="0 0 68.17 96.07"><defs></defs><path d="M36.16.44c.79.32-.29.54-.85.7-3.18.87-7.84 2.3-9.92 4.86 0 0 9.22-5.42 15.46-5.72s9.12 3.49 12.87 7.45c.64-.02.29-2.85 3.77-.98 5.04 2.71 2.02 8.43 4.93 12.45.36.5.6.57.51-.16-.12-1.04-.71-2.2-.69-3.31.71-.68 4.78 3.69 5.06 4.84.24 1-.31 5.87-1.06 5.92l-5.74-2.77c.73 2.49 4 3.26 5.22 4.68.14.17 2.08 3.54 2.16 3.75.48 1.18.41 5.25-.53 6.08-.19.17-.76.19-1.12.43-.54.36-1.27 1.61-2.22 1.01-.22-.14-1.57-3.14-2.99-4.13-1.02-.7-4.1-1.06-3.15-2.45.71-1.03 4.25-.64 5.41-.33-1.24-1.43-3.43-1.71-4.83-2.99-.93-.85-1.66-2.42-2.48-3.43-1.19-1.48-3.38-2.5-3.12-4.7 2.7.49 4.44 1.97 5.9 4.17.38-2.34-2.76-5.67-4.77-6.17-1.1-.27-1.8.04-3.37-.1s-2.2-.8-2.29-.88c-.67-.62-.77-3.3-1.32-4.55-.74-1.72-2.28-3.14-4.23-3.23.55.69 1.27.94 1.89 1.76 1.31 1.75.33 6.91.37 5.88s-1.05-2.08-1.6-3.2c-1.79-3.65-5.78-4.06-9.13-5.54-1.29-.57-2.47-1.36-3.7-2.04-.16.68.35.82.73 1.18.73.7 2.25 1.78 3.13 2.43.95.7 6.71 3.8 5.52 5.07-2.43-1.24-5.24-.25-7.65-.86-3.19-.81-3.83-5.58-7.64-5.74 1.13 1.16 4.8 3.71 3.66 5.57-.45.73-4.24 1.33-5.38 2.26-.93.76-.96 2.07-2.09 2.59 0 0-.97-1.65.18-3.82s4.34-3.13 4.34-3.13c-3.69.07-5.81 1.98-6.45 5.54-.19 1.07.04 2.7-.25 3.41-.18.43-3.2 3.06-3.82 3.29-1.56.59-3.82.53-5.46 1.32.29 1.16 2.14.32 2.63 1.01 1.45 2.04-4.99 5.54-6.8 5.24-.1.44.69.59.96.62 1.93.2 3.64-.81 5.29-1.67 1.26 1.72-4.65 4.32-5.37 5.23-1.21 1.53-.08 4.1-3.67 1.2C-.1 36.41-.5 34.06.56 31.01c.3-.88.9-2.38 1.9-2.45-.92-1.41-1.66-3.24-1.31-4.95.16-.77 4.06-6.28 4.62-6.51.67-.27.54.36.45.79-.21.96-.88 1.72-.97 2.68 4.62-2.7.8-12.21 7.99-11.64-3.21 2.05-1.41 5.92-2.24 8.54-.44 1.37-3.36 3.82-4.36 5.02 1.23.07 3.25-1.39 4.34-2.27 2.04-1.64 3.3-4.13 6.44-4.17 0 0-2.05-.19-1.33-2.21s3.42-3.35 3.42-3.35c-2.22.04-5.73 1.63-5.57 3.47s-.45-.37-.53-.68c-.82-3.56 2.3-5.23 5.4-5.58.09-.59-.83-.37-1.21-.34-.76.06-1.48.44-2.26.34-1.01-1.89 4.65-6.37 5.56-5.56.12 1.16-1.66 2.03-1.22 3.12.98-.83 2.37-.81 3.43-1.44.94-.55 1.62-1.75 2.49-2.38 3.05-2.2 9.77-1.32 10.56-1Zm9.94 3.28c-1.76-1.01-2.92-1.82-5.22-1.16s-6.11 3.09-6.11 3.09c4.1-1.12 10.37-3.43 12.16 2.09-1.18-.54-2.1.04-3.28.02-.65-.02-2.8-.97-2.62-.02s5.92.51 8.11 1.45c1.32.56 6.08 4.75 6.48 6.04.17.53.01.55-.45.46-2.44-.49-4.21-.03-5.79-2.38.55 3.41 3.73 2.54 5.93 3.63 2.42 1.19 4.69 4.49 7.62 5.06-1.46-1.37-3.21-2.64-3.85-4.67s.24-6.22-.84-7.84c-.09-.14-.43-.46-.52-.34.19 1.32.53 2.65.34 4-.07.48.2.6-.51.51-1.44-.72-2.28-2.14-3.49-3.11-1.29-1.04-3.47-2.18-4.51-3.13-1.32-1.2-1.32-2.47-3.44-3.68ZM12.18 23.04l-2.06.89-4.2 2.92c2.31-.47 4.86-1.89 6.25-3.82ZM42.77 81.07c.73.86 3.64-4.13 3.48-4.86.72-.54 1.73 1.87 1.71 2.56-.02.78-1.63 5.29-2.11 5.91-.76.98-2.33 1.01-2.89 1.97-.68 1.17-.33 3.1-1.09 4.47-1.01 1.83-3.11 2.12-4.63 3.01s-1.43 2.25-4 1.87c-1.57-.24-1.58-1.42-2.65-2.22-2.03-1.51-3.47-.78-4.86-3.83-1.46-3.22-1.48-2.55-3.27-5.08-1.04-1.48-2-4.57-1.91-6.36.04-.73 1.09-3.98 2.07-3.19.11.09 1.28 2.32 1.32 2.52.28 1.35-.61 1.75-.57 2.29.15 2.11 3.28 4.46 4.45 5.98.85 1.11 1.18 2.35 2.09 3.29 1.08-4.14-1.9-4.51-3.47-6.78-1.96-2.84.46-4.82.68-7.34.08-.97-.34-1.62-.34-2.39 0-2.14 2.1-4.52 3.38-6.08 2.02.35 7.81-.67 9.15.52.32.29 1.28 1.9 1.45 2.37 2.17 5.71-3.92 4.77-4.54 7.81-.55 2.7 3.13 3.12 3.33 5.53.02.25-1.01 4.38-1.2 4.92-.61 1.79-2.1 3.33-3.93 3.89 1.14-1.91 1.61-3.8.94-5.98-1.1-3.58-5.99-4.74-2.42-9.22.67-.84 1.67-1.21 2.17-2.17-1.15.1-4.71 1.66-5.05 2.6-1.38 3.84 3.24 6.85 3.27 10.47.03 2.72-3.03 2.68-2.75 3.78 1.06.2 2.78 3.78 3.47 3.3.24-1.66 2.04-1.83 3.11-2.63 3.74-2.78 1.29-6.42 5.23-8.67-2.27-2.21-4.1-3.34-2.68-6.86 1.17-2.92 3.42-2.31 2.61-6.96-.36-2.09-2.13-2.68-.69-5.03.17-.27-.1-.58.59-.44.6.25 1.94 2.66 2.18 3.38.58 1.72.99 5.76.69 7.48-.39 2.28-2.67 3.76-2.35 6.16Zm-18.36 4.54s2.12 3.75 2.3 4.29.5 1.1 1.43 1.84 3.53.62 1.52-.36-2.06-1.37-2.02-2.46-3.24-3.3-3.24-3.3ZM33.73 58.48c-3.58-.88-8.94 1.3-9.04 5.56 0 0-1.2-.49-1.74-.19s-.52 3.58-1.57 4.69-3.49 1.46-2.74 2.8c1.22.17 1.61-.16 2.57-.55 1.42-.57.52.82-.43 1.31-2.69 1.41-5.17.83-5.11 5.14-1.7-1.09-2.67-3.19-2.43-5.21 0 0 .45 1.93 1.32 1.23s2.12-8.93 4.74-10.63c.43-.28.69-.43 1.23-.33-3 2.7-1.69 3.34-.87 5.21 1.95-4.41 3.47-10.35 8.71-11.79 2.4-.66 5.75-.46 5.36 2.76Z"></path><path d="m48.33 65.78.35-3.47c.71-.7 2.74 2.31 3.08 3 .52 1.05 2.43 6.3 2.67 7.41.52 2.4-.53 3.89-2.62 4.89-.08-1.09.25-2.61-.33-3.58-.75-1.25-5.68-1.58-5.06-4.06l4.18 2.08c.35-1.53-2.08-2.46-3.11-3.84-1.79-2.39-3.32-7.55-6.1-8.85-1.73-.81-5.35-.43-4.82-2.91 1.79-1.2 3.24-.26 5.16-.05l-2.43-.7c-.08-.59 1.25-.4 1.57-.35 4.66.71 6.58 6.46 7.47 10.43ZM13.57 64.04c-.71-2.29.19-4.4 1.59-6.24.72-.94 2.24-1.42 2.24-3.15 3.96 4.05-1.22 3.86-1.86 10.92s-2.31 6.11-2.31 6.11c-.72-1.56.36-2.76-.29-4.38-.28-.7-.99-.76-1.45-1.35-4.58-5.81 2.63-10.13 2.09-16.16 6.47 3.66-4.53 9.67 0 14.25ZM55.28 72.04c-1.83-2.18-1.22-5.58-2.36-8.24-.7-1.63-3.11-3.11-3.15-4.43-.02-.56 1.12-4.36 1.52-4.35l2.91 4.38 1.08 3.95c1.87-4.62-4.08-7.85-1.38-12.51.88-.66 1.65 3.19 1.91 3.82 1.44 3.4 3.69 6.02 1.97 9.98-.49 1.14-2.25 2.52-2.43 3.13-.35 1.18.1 3-.07 4.27ZM58.32 49c.16-.19.48-2.04.43-2.47s-.83-.05-1.23-.89c-.87-1.88-.24-3.89 1.09-5.54 1.56-1.93 2.34-.94 3.09 1.02.91 2.38.2 3.81-.51 6.08-.32 1.01-.94 6.86-2.95 6.71s-1.92-2.61-1.39-3.75c.3-.65 1.17-.79 1.47-1.15Zm1.47-3.72c.38-.51 1.71-2.89 1.06-4.5-.09-.23-.26-.71-.54-.71s-.25 1.62-.41 1.81c-.98 1.18-1.19 1.29-.8 2.88.13.51.24 1.1.68.52Z"></path><path d="M30.24 64.01c-.14-.77 1.19-.8 1.08-1.06s-1.16-.57-1.55-.03-.23 1.21-.88 1.07-.78-1.72-.78-1.72c-.05-.29.58-.82.82-.99 1.34-.91 3.81.17 5.62.22.76.02 5.59-1.02 5.8.93.05.45-.32 1.3-1.12 1.59-2.69.97-8.89.59-8.99 0ZM25.94 64.32c-.26-.97-2.02 3.39-2.46 5.4s-.31 2.56.18 3.81 1.06 1.91 1.52 2.47-.07-4.23.77-5.89 3.64-3.32 2.91-3.68-2.65-1.14-2.91-2.12ZM11.72 50.15c.53 1.14.62 3.6-1.39 3.75s-2.63-5.7-2.95-6.71c-.71-2.27-1.42-3.71-.51-6.08.75-1.96 1.53-2.95 3.09-1.02 1.33 1.65 1.96 3.66 1.09 5.54-.39.84-1.17.45-1.23.89s.28 2.29.43 2.47c.3.36 1.17.5 1.47 1.15Zm-2.26-5.39c.4-1.59.18-1.7-.8-2.88-.16-.19-.14-1.81-.41-1.81s-.44.48-.54.71c-.65 1.61.68 3.99 1.06 4.5.44.58.55 0 .68-.52ZM20.07 54.86l4.82-3.68M25.27 30.61c-.73-.23-1.27-.9-1.27-1.7s.49-1.42 1.18-1.68l-.16-.82c-.79-.05-1.44-.1-1.37-.25.05-.1.52-.36 1.22-.54l-1.02-5.29c-.14.07-.28.13-.43.21-4.07 2.17-3.32 3.2-5.52 6.29-.64.9-1.79 1.58-2.39 2.48-1.05 1.58-2.04 4.62-1.24 5.54.8.92 2.3-1.41 3.74-1.99 1.88-.76 4.66-.04 7.26.76v-3Z"></path><path d="M26.54 28.91c0-.41-.33-.75-.75-.75s-.74.33-.74.75.33.74.74.74.75-.33.75-.74ZM30.6 40.76s-1.85 1.95-4.29 3.17v4.66c.73.23 1.27.9 1.27 1.7 0 .99-.8 1.79-1.79 1.79-.33 0-.63-.09-.89-.25l-4.21 3.2c.23.72.6 3.8 1.05 3.79 1.05-.69 1.31-1.93 2.08-2.78.88-.98 2.83-2.14 3.32-2.93 1.07-1.72.56-4.12 3.48-4.93.42-2.37-.7-4.86-.02-7.41Z"></path><path d="M25.79 51.04c.41 0 .75-.33.75-.74s-.33-.75-.75-.75-.74.33-.74.75.33.74.74.74ZM18.79 51.19c-.12.1.84 1.76 1.44 2.89l3.96-3.01c-.11-.24-.18-.5-.18-.77 0-.8.54-1.48 1.27-1.7v-4.19c-2.85 1.1-4.4 1.57-4.4 1.57s5.5-3.1 5.19-4.07c-.31-.97-3.23-.19-4.63-.83-1.13-.52-2.35-2.21-2.89-2.34-.79-.2-1.68.7-2.2.47-.8-.35-1.43-2.26-2.77-1.91-.72 5.12-.83 9.19 3.65 12.51.93-1-2.14-2.51-1.56-3.13 2.61 2.87 4.27 3.12 7.99 2.09.63 2.96-2.89 2.34-4.86 2.43ZM38.6 49.19c-1.13-3.69-.15-8.54-.72-12.06-.21-1.34-1.59-1.95-1.7-3.54-.07-1.03.32-2.86 1.37-3.26-.43 1.53-1 4.47 1.29 4.8.93.13 2.72-.41 4.56-1.04v-3.44c-.73-.23-1.27-.9-1.27-1.7s.58-1.53 1.35-1.73l.07-.36c-.16-.01-.32-.03-.48-.04-1.56-.13-3.33 1.63-3.33 1s1.36-1.24 1.98-1.51c.29-.13 1.16-.37 2.03-.5l1.05-5.44c-.32-.04-.67-.09-1.1-.19-1.05-.23-1.78-1.3-2.84-1.33-1.43-.04-3.85.96-5.57 1.07-4.41.29-6.4-1.63-10.48-.02l1.07 5.55c.44-.04.91-.03 1.38.06 1.4.27 2.97 1.6 2.97 2.05 0 1.04-2.41-.17-2.76-.7-.13-.2-.71-.29-1.39-.36l.13.69c.77.2 1.35.89 1.35 1.73s-.54 1.48-1.27 1.7v3.33c1.86.58 3.54 1.1 4.6 1.01 1.16-.25 2.17-1.06 2.61-2.09.31-.74.21-1.83.21-1.83 1.45 2.35-1.48 4.73-1.64 6.12-.1.84.36 2.54.26 3.8-.1 1.33-.84 7.83-1.25 8.47-.6.94-2.48 1.52-1.88 3.5 2.59-1.46 3.65 1.71 6.08 1.74 1.81.02 4.07-1.36 4.8-1.81 2.17-1.33-1.39-3.32-1.5-3.67Z"></path><path d="M44.67 28.95c0-.41-.33-.75-.74-.75s-.74.33-.74.75.33.74.74.74.74-.33.74-.74Z"></path><path d="M53.89 28.42c-.68-.9-1.83-1.4-2.38-2.14-1.2-1.61-.68-2.7-2.86-4.44-1.28-1.02-1.98-1.24-2.8-1.35l-1.01 5.22c.57 0 1 .12 1.05.45.1.61-.48.76-1.29.75l-.07.36c.69.25 1.18.9 1.18 1.68s-.54 1.48-1.27 1.7v3.08c1.5-.52 2.93-1.02 3.86-1.16 1.19-.19 2.51-.43 3.61.25l3.35 2.72c.06-2.61.27-4.93-1.39-7.12ZM43.93 49.59c-.41 0-.74.33-.74.75s.33.74.74.74.74-.33.74-.74-.33-.75-.74-.75ZM54.54 47.84c2.32-2.41 1.31-7.54 1.08-10.56-1.06-.11-1.55 1.49-2.33 1.69-.63.16-1.19-.33-1.82-.13-1.85.6-4.13 4.13-7.31 2.96.16 1.95 2.42 2.49 3.47 3.82-.64.25-1.87-.41-3.18-1.32v4.32c.73.23 1.27.9 1.27 1.7 0 .28-.07.54-.18.77l3.41 2.59c.9-.42 1.41-.78 1.82-2.16-1.62-.36-4.46-.26-4.52-2.44 2.08.68 6.76.33 8.3-1.26Z"></path><path d="M44.82 51.88c-.26.15-.57.25-.89.25-.99 0-1.79-.8-1.79-1.79 0-.8.54-1.48 1.27-1.7v-5.08c-1.96-1.46-3.85-3.09-4.11-2.79l-.09 7.2c.96.77 1.86 1.34 2.41 2.37.53.98.74 2.41 1.35 3.26 1.2 1.67 3.56 3.22 4.33 5.23.94.67 1.79-2.83 1.11-4.23l-3.59-2.73ZM27.68 37.08c-.14.08-.37.14-.62-.1-.41-.39-.7.25-.74-.22-.04-.44-.78-.88-1.44-1.05-1.9-.4-3.81.16-5.39 1.76 2.58 2.89 5.97 2.16 9.03 1.04.29-.32-.28-.95-.83-1.42ZM44.16 35.86c-.58.23-1.2.61-1.39.9-.26.4-1.08.54-1.48.93-.26.32-.4.63-.23.82 3.05 1.12 6.45 1.85 9.03-1.04-1.73-1.75-3.86-2.24-5.93-1.61Z"></path></svg>
                    <div>
                        VULCANUS SYSTEMS
                    </div>
                </a>
            </p>
            <p>TagLine: <em>Forging the future of software, one masterpiece at a time</em></p>

            <p>
                <strong>Sponsored by:</strong>
                <a href="https://getsnooz.com">
                    <img src="https://getsnooz.com/cdn/shop/files/SNOOZ-Logo-PNG.png?v=1682532565&width=600" alt="GetSnooz Logo">
                </a>
            </p>
            <p>Tagline: <em>SOUND. SLEEP.</em></p>

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
<div class="wordthing">11:00
Open Doors & Register

11:30
Pizza & Presentation of Competition and Goals

11:45
First Presentation: Crash Course into iOS

12:45
Second Presentation: Crash Course into Web with React and Vite

14:00
Stretch and Mini Challenge #1

16:00
Another Stretch and Mini Challenge #2

18:00
Final Stretch and Start turning in Submissions

19:00
End of Competition Submissions! Time for Show & Tell

Near the End...
Vote and Place!</div>

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
    slideSection.classList.add("slide");
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
    slideshowContainer.innerHTML = '';
    slideData.forEach(slide => {
        const slideElement = createSlide(slide); // Generate slide from data
        slideshowContainer.appendChild(slideElement); // Append slide to container
    });
}

// Function to hide all slides
function hideAllSlides() {
    const slides = document.querySelectorAll('.slide'); // Get all slides
    slides.forEach(slide => {
        slide.classList.remove('show');
    });
}

// Function to show a specific slide based on index
function showSlide(index) {
    hideAllSlides(); // First, hide all slides
    const slides = document.querySelectorAll('.slide');
    slides[index].classList.add('show');
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

renderSlides(); // Render slides on page load
showSlide(currentSlideIndex); // Show the first slide



