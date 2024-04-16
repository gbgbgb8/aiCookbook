document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const contentElement = document.getElementById('recipeContent');
    const buttonContainer = document.getElementById('recipeButtons');

    // Function to load and check files sequentially
    function loadFilesSequentially(index = 1) {
        const file = `${index.toString().padStart(3, '0')}.md`;
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error('File not found');
                return response.text();
            })
            .then(text => {
                createButton(file, text);
                loadFilesSequentially(index + 1); // Load next file
            })
            .catch(() => {
                console.log('No more files to load');
            });
    }

    // Function to create a button from file data
    function createButton(filename, fileContent) {
        const title = fileContent.split('\n')[0].replace('## ', ''); // Assumes title is on the first line
        const button = document.createElement('button');
        button.textContent = title;
        button.classList.add('btn');
        button.onclick = () => {
            const result = md.render(fileContent);
            contentElement.innerHTML = result;
        };
        buttonContainer.appendChild(button);
    }

    loadFilesSequentially();
});
