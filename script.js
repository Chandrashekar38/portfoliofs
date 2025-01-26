// Dark/Light Mode Toggle
const toggleButton = document.createElement('button');
toggleButton.id = 'theme-toggle';
toggleButton.textContent = 'Toggle Theme';
document.body.prepend(toggleButton);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// Add light theme styles dynamically
const style = document.createElement('style');
style.textContent = `
    .light-theme {
        background: #ffffff;
        color: #000000;
    }
    .light-theme .project-card,
    .light-theme .experience-card,
    .light-theme .blog-post {
        background: #f4f4f9;
        color: #000000;
    }
`;
document.head.appendChild(style);