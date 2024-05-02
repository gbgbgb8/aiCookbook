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
        for (let i = 1; i <= 20; i++) {
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
        checkURLAndDisplayRecipe();  // Check URL to see if a recipe needs to be displayed
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
    async function displayRecipe(recipe) {
        const result = md.render(recipe.content);
        contentElement.innerHTML = result;
        await loadImage(recipe.filename.slice(0, -3));
        createShareButton(recipe.title, recipe.filename);
    }

    async function loadImage(filenameWithoutMd) {
        const extensions = ['jpg', 'jpeg', 'png'];
        for (let ext of extensions) {
            try {
                const path = `${filenameWithoutMd}${ext}`;
                const response = await fetch(path);
                if (response.ok) {
                    const image = new Image();
                    image.src = path;
                    image.alt = 'Recipe Image';
                    image.style.width = '100%'; // Set the image width to 100% of the container
                    contentElement.insertBefore(image, contentElement.firstChild);
                    break;
                }
            } catch (error) {
                console.error('Failed to load image:', error);
            }
        }
    }

    // Create and append the share button
    function createShareButton(title, filename) {
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share';
        shareButton.classList.add('btn', 'btn-share');
        const permalink = `${window.location.origin}${window.location.pathname}?recipe=${filename}`; // Constructs the permalink
        shareButton.onclick = () => {
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: permalink
                }).then(() => console.log('Content shared successfully!'))
                  .catch(error => console.log('Error sharing:', error));
            } else {
                console.log('Share API not supported.');
            }
        };
        contentElement.appendChild(shareButton);
    }

    // Check the URL for a 'recipe' query parameter and display it if present
    function checkURLAndDisplayRecipe() {
        const params = new URLSearchParams(window.location.search);
        const filename = params.get('recipe');
        if (filename) {
            const recipe = recipes.find(r => r.filename === filename);
            if (recipe) {
                displayRecipe(recipe);
            }
        }
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

    loadAllFiles();  // Start loading all recipes when the page loads
});
