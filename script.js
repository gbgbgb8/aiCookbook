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
                const result = md.render(recipe.content);
                contentElement.innerHTML = result;
            };
            buttonContainer.appendChild(button);
        });
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
                    const result = md.render(recipe.content);
                    contentElement.innerHTML = result;
                };
                buttonContainer.appendChild(button);
            });
        } else {
            createButtons(); 
        }
    });

    loadAllFiles();
});
