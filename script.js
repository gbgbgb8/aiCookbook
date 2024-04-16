document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const contentElement = document.getElementById('recipeContent');
    const buttonContainer = document.getElementById('recipeButtons');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchBox = document.getElementById('searchBox');
    let recipes = []; // This will store an array of objects containing filename and title

    // Function to load and check files sequentially
    function loadFilesSequentially(index = 1) {
        if (index > 999) { // Stop after 999.md
            loadingIndicator.style.display = 'none'; // Hide loading indicator
            searchBox.disabled = false; // Enable search box
            createButtons(); // Initially create all buttons
            return;
        }

        const file = `${index.toString().padStart(3, '0')}.md`;
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error('File not found');
                return response.text();
            })
            .then(text => {
                const title = text.split('\n')[0].replace('## ', '');
                recipes.push({filename: file, title: title, content: text});
                loadFilesSequentially(index + 1); // Load next file
            })
            .catch(() => {
                loadFilesSequentially(index + 1); // Attempt to load next file even if current one fails
            });
    }

    // Function to create buttons from loaded recipes
    function createButtons() {
        buttonContainer.innerHTML = ''; // Clear existing buttons
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

    loadFilesSequentially();
});
