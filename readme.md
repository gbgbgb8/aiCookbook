# aiCookbook

## Project Overview
The `aiCookbook` is a dynamic web application designed to store and display a collection of recipes in a user-friendly format. It enables users to search, view, and share a wide variety of recipes presented in markdown format, enhancing the accessibility and usability of culinary content.

## Features
- **Recipe Display:** Recipes are rendered in the browser using markdown formatting, ensuring a clean and consistent presentation.
- **Search Functionality:** Users can search for recipes by name, filtering the available content to find what they're looking for quickly.
- **Responsive Design:** The application is responsive, making it accessible on a wide range of devices from desktops to mobile phones.
- **Share Capability:** Users can share recipes via a permalink, utilizing the browser's native share API when available.

## Technologies Used
- **HTML/CSS:** For structuring and styling the web pages.
- **JavaScript:** To handle the dynamic aspects of the application such as loading recipes, searching, and sharing.
- **Markdown-it:** A JavaScript markdown parser used to convert markdown files into HTML.
- **Spectre.css:** A lightweight CSS framework that provides basic styling for the application without the overhead of more extensive frameworks.

## Directory Structure
- `index.html`: The entry point of the application which loads the entire app.
- `style.css`: Contains all the custom styles used throughout the application.
- `script.js`: Handles all the interactions within the application, including loading recipes, searching, and initializing UI components.
- `*.md`: Markdown files for each recipe, named 001.md through 999.md (e.g., `001.md`, `002.md`, ...).
The entire folder will be scanned, even if there are fewer than 999 files.

## Usage
- Use the search box at the top to find recipes by keywords.
- Click on any recipe button to view the full recipe.
- Use the 'Share' button to share the recipe with others.

The markdown recipes in the `aiCookbook` project are structured and formatted consistently, adhering to a clear and comprehensive template that enhances readability and usability. Here's a breakdown of the typical structure and formatting used in your recipes:

### Title
- The recipe title is formatted as a level 2 heading (`##`) and is descriptive of the dish.

### Ingredients Section
- This section is marked as a level 3 heading (`###`).
- Ingredients are categorized by their role in the recipe (e.g., "Meat," "Vegetables," "For Seasoning"). Each category is emphasized in bold.
- Ingredients are listed with quantities and specific descriptions to ensure clarity.

### Equipment Needed Section
- Also marked as a level 3 heading.
- Lists all the tools and equipment needed to prepare the dish, formatted as a simple bullet list.

### Instructions Section
- Marked as a level 3 heading.
- Numbered steps (`1.`, `2.`, etc.) guide the user through the cooking process.
- Each step begins with a bold action word to highlight the main task of that step (e.g., "Prepare," "Cook," "Serve").
- Detailed directions follow each step to provide specific guidance on how to execute the task.

### Shopping List Section
- Marked as a level 3 heading.
- Organized by categories similar to those in the ingredients section.
- Each item is presented in a checklist format using brackets (`[ ]`), allowing users to interact by checking off items as they gather them.

### Consistency in Detail
- Each recipe maintains a consistent level of detail in both the ingredients and the instructions to ensure that users have all the necessary information to successfully recreate the dishes.

### Use of Markdown Features
- **Bold** for emphasis on key words or phrases.
- **Bullet lists** for listing ingredients and equipment.
- **Numbered lists** for sequential steps in the instructions.
- **Checkboxes** in the shopping list for interactive use.

This structured approach not only helps maintain uniformity across your digital cookbook but also aids in enhancing the user experience by making each recipe easy to follow and understand.

## Contributing
Feel free to fork this repository and submit pull requests to add more recipes or enhance the functionalities. For adding a new recipe, create a markdown file in the format as shown in the existing recipes and update the recipe list in the `script.js` file.

## License
This project is licensed under the MIT License