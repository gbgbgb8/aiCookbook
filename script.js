document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const recipes = ['taquitos.md', 'minicorndogs.md', 'sloppyjoes.md', 'fishtacos.md', 'mexicanpizza.md'];
    const buttonContainer = document.getElementById('recipeButtons');
    const contentElement = document.getElementById('recipeContent');
    const searchBox = document.getElementById('searchBox');

    // Function to create buttons for each recipe
    function createRecipeButtons() {
        recipes.forEach(file => {
            const button = document.createElement('button');
            button.textContent = file.replace('.md', '');
            button.classList.add('btn');
            button.onclick = () => loadRecipe(file);
            buttonContainer.appendChild(button);
        });
    }

    // Function to load and display the content of a recipe
    function loadRecipe(file) {
        fetch(file)
            .then(response => response.text())
            .then(text => {
                const result = md.render(text);
                contentElement.innerHTML = result;
            })
            .catch(error => console.error('Error loading the Markdown file:', error));
    }

    // Event listener for search functionality
    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        const filtered = recipes.filter(file => file.toLowerCase().includes(searchTerm));
        buttonContainer.innerHTML = ''; // Clear previous buttons
        filtered.forEach(file => {
            const button = document.createElement('button');
            button.textContent = file.replace('.md', '');
            button.classList.add('btn');
            button.onclick = () => loadRecipe(file);
            buttonContainer.appendChild(button);
        });
    });

    createRecipeButtons();
});
