document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const contentElement = document.getElementById('recipeContent');
    const buttonContainer = document.getElementById('recipeButtons');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchBox = document.getElementById('searchBox');
    let recipes = [];

    // Function to load all markdown files in parallel
    async function loadAllFiles() {
        let filePromises = [];

        // Prepare promises for each file from 001 to 999
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
                .catch(() => null);  // Ignore errors, simply do nothing if the file isn't found
            filePromises.push(promise);
        }

        // Wait for all promises to settle
        await Promise.all(filePromises);
        recipes.sort((a, b) => a.filename.localeCompare(b.filename));  // Optional: sort recipes by filename
        createButtons();  // Create buttons for all loaded recipes
        loadingIndicator.style.display = 'none';  // Hide loading indicator
        searchBox.disabled = false;  // Enable search box
    }

    // Function to create buttons from loaded recipes
    function createButtons() {
        buttonContainer.innerHTML = '';  // Clear existing buttons
        recipes.forEach(recipe => {
            const button = document.createElement('button');
            button.textContent = recipe.title;
            button.classList.add('btn');
            button.onclick = () => {
                const result = md.render(recipe.content);
                contentElement.innerHTML = result;
            };
            buttonContainer.appendChild(button);
        });
    }

    // Event listener for search functionality
    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm));
        if (searchTerm) {
            buttonContainer.innerHTML = ''; // Clear existing buttons
            filteredRecipes.forEach(recipe => {
                const button = document.createElement('button');
                button.textContent = recipe.title;
                button.classList.add('btn');
                button.onclick = () => {
                    const result = md.render(recipe.content);
                    contentElement.innerHTML = result;
                };
                buttonContainer.appendChild(button);
            });
        } else {
            createButtons(); // Re-create all buttons if search box is cleared
        }
    });

    loadAllFiles();
});
