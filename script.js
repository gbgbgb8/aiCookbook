document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const contentElement = document.getElementById('recipeContent');
    const buttonContainer = document.getElementById('recipeButtons');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchBox = document.getElementById('searchBox');
    let recipes = [];

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
                .catch(() => null);
            filePromises.push(promise);
        }
        await Promise.all(filePromises);
        recipes.sort((a, b) => a.filename.localeCompare(b.filename));
        createButtons();
        loadingIndicator.style.display = 'none';
        searchBox.disabled = false;
    }

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

    function displayRecipe(recipe) {
        const result = md.render(recipe.content);
        contentElement.innerHTML = result;
        createShareButton(recipe.title, recipe.filename); // Updated to pass filename
    }

    function createShareButton(title, filename) {
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share';
        shareButton.classList.add('btn', 'btn-share');
        const permalink = `${window.location.origin}${window.location.pathname}?recipe=${filename}`; // Constructs the permalink
        shareButton.onclick = () => {
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: permalink // Uses permalink instead of text
                }).then(() => console.log('Content shared successfully!'))
                  .catch(error => console.log('Error sharing:', error));
            } else {
                console.log('Share API not supported.');
            }
        };
        contentElement.appendChild(shareButton);
    }

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
            createButtons();
        }
    });

    loadAllFiles();
});
