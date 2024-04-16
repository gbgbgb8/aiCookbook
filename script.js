document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const contentElement = document.getElementById('content');

    fetch('taquitos.md')
        .then(response => response.text())
        .then(text => {
            const result = md.render(text);
            contentElement.innerHTML = result;
        })
        .catch(error => console.error('Error loading the Markdown file:', error));
});
