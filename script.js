document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const contentElement = document.getElementById('recipeContent');
    const buttonContainer = document.getElementById('recipeButtons');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchBox = document.getElementById('searchBox');
    let recipes = [];

    // Asynchronously load all Markdown files
    async function loadAllFiles() {
        let filePromises = [];
        for (let i = 1; i <= 999; i++) {
            const file = `${i.toString().padStart(3, '0')}.md`;
            const promise = fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error('File not found');
                    return response.text();
                })
                .then(text => {
                    const title = text.split('\n')[0].replace('## ', '');
                    recipes.push({ filename: file, title: title, content: text });
                })
                .catch(() => null);  // Handle missing files gracefully
            filePromises.push(promise);
        }
        await Promise.all(filePromises);
        recipes.sort((a, b) => a.filename.localeCompare(b.filename));
        createButtons();
        loadingIndicator.style.display = 'none';  // Hide loading indicator once files are loaded
        searchBox.disabled = false;  // Enable the search box after loading
    }

    // Create buttons for each recipe
    function createButtons() {
        buttonContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const button = document.createElement('button');
            button.textContent = recipe.title;
            button.classList.add('btn');
            button.onclick = () => {
                displayRecipe(recipe);
            };
            buttonContainer.appendChild(button);
        });
    }

    // Display the selected recipe and append a share button
    function displayRecipe(recipe) {
        const result = md.render(recipe.content);
        contentElement.innerHTML = result;
        createShareButton(recipe.title, recipe.content);
    }

    // Create and append the share button
    function createShareButton(title, text) {
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share';
        shareButton.classList.add('btn', 'btn-share');
        shareButton.onclick = () => {
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: text,
                    url: window.location.href
                }).then(() => console.log('Content shared successfully!'))
                  .catch(error => console.log('Error sharing:', error));
            } else {
                console.log('Share API not supported.');
            }
        };
        contentElement.appendChild(shareButton);
    }

    // Search functionality to filter recipes
    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm));
        if (searchTerm) {
            buttonContainer.innerHTML = '';
            filteredRecipes.forEach(recipe => {
                const button = document.createElement('button');
                button.textContent = recipe.title;
                button.classList.add('btn');
                button.onclick = () => {
                    displayRecipe(recipe);
                };
                buttonContainer.appendChild(button);
            });
        } else {
            createButtons();  // Re-create all buttons if search box is cleared
        }
    });

    loadAllFiles();
});
