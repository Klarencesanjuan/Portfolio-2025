document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. CLICK TO START LOGIC
    // -----------------------------------------------------------------
    const startButton = document.getElementById('start-button');
    const introOverlay = document.getElementById('intro-overlay');
    const contentWrapper = document.querySelector('.content-wrapper');

    if (startButton && introOverlay && contentWrapper) {
        startButton.addEventListener('click', () => {
            // Start the fade-out of the overlay
            introOverlay.style.opacity = '0';
            
            // Remove the hidden class from the main content
            contentWrapper.classList.remove('hidden');

            // Wait for the fade-out transition to finish (1000ms from CSS) 
            setTimeout(() => {
                introOverlay.style.display = 'none';
                
                // Optional: Scroll to the top of the page (Home) after starting
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000); 
        });
    }

    // -----------------------------------------------------------------
    // 2. SECTION REVEAL LOGIC (FOR ABOUT ME AND PROJECTS)
    // -----------------------------------------------------------------
    const aboutSection = document.querySelector('.about-me-section');
    const projectsSection = document.getElementById('projects'); 

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    // Function to create an observer for a specific element
    const createObserver = (element) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.classList.add('is-visible');
                    // Stop observing once it becomes visible
                    observer.unobserve(element); 

                    // LOGIC FOR STAGGERED PROJECTS (Frame 3 items)
                    if (element.id === 'projects') {
                        const projectItems = element.querySelectorAll('.project-item');
                        projectItems.forEach((item, index) => {
                            // Apply a staggered delay (0.15s delay between each item)
                            item.style.transitionDelay = `${index * 0.15}s`; 
                            item.classList.add('is-visible'); 
                        });
                    }
                }
            });
        }, observerOptions);

        if (element) {
            observer.observe(element);
        }
    }

    // Apply the observer to both main sections (About Me and Projects)
    createObserver(aboutSection);
    createObserver(projectsSection); 
});