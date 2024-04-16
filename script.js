document.addEventListener('DOMContentLoaded', function() {
    const md = window.markdownit();
    const recipes = ['taquitos.md', 'minicorndogs.md', 'sloppyjoes.md', 'fishtacos.md', 'mexicanpizza.md'];
    const contentElement = document.getElementById('randomRecipes');
    const searchResultsElement = document.getElementById('searchResults');
    const searchBox = document.getElementById('searchBox');

    // Display three random recipes
    function displayRandomRecipes() {
        const shuffled = recipes.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        selected.forEach(file => {
            fetch(file)
                .then(response => response.text())
                .then(text => {
                    const result = md.render(text);
                    const div = document.createElement('div');
                    div.innerHTML = result;
                    contentElement.appendChild(div);
                });
        });
    }

    // Filter and display recipes based on search input
    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        searchResultsElement.innerHTML = ''; // Clear previous results
        const filtered = recipes.filter(file => file.toLowerCase().includes(searchTerm));
        filtered.forEach(file => {
            fetch(file)
                .then(response => response.text())
                .then(text => {
                    const result = md.render(text);
                    const div = document.createElement('div');
                    div.innerHTML = result;
                    searchResultsElement.appendChild(div);
                });
        });
    });

    displayRandomRecipes();
});
