document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-me-section');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // This line adds the class 'is-visible' which triggers the CSS transition
                aboutSection.classList.add('is-visible');
                // Stop observing once it's shown
                observer.unobserve(aboutSection); 
            }
        });
    }, observerOptions);

    // Start observing the about section if it exists
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});