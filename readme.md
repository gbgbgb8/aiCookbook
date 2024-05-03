# aiCookbook

## Project Overview
The `aiCookbook` is a dynamic web application designed to store and display a collection of recipes in a user-friendly format. It enables users to search, view, and share a wide variety of recipes presented in markdown format, enhancing the accessibility and usability of culinary content. Additionally, the application now supports displaying images alongside recipes, offering a more engaging user experience.

## Features
- **Recipe Display:** Recipes are rendered in the browser using markdown formatting, ensuring a clean and consistent presentation. Each recipe is accompanied by an image that enhances the visual appeal and provides a visual reference for the dish.
- **Search Functionality:** Users can search for recipes by name, filtering the available content to find what they're looking for quickly.
- **Responsive Design:** The application is responsive, making it accessible on a wide range of devices from desktops to mobile phones.
- **Share Capability:** Users can share recipes via a permalink, utilizing the browser's native share API when available.
- **Image Integration:** For each recipe displayed, the application attempts to load a corresponding image (JPEG, JPG, PNG formats) that matches the recipe file name, enriching the presentation and appeal of the recipes.

## Technologies Used
- **HTML/CSS:** For structuring and styling the web pages.
- **JavaScript:** To handle the dynamic aspects of the application such as loading recipes, searching, sharing, and dynamically loading images.
- **Markdown-it:** A JavaScript markdown parser used to convert markdown files into HTML.
- **Spectre.css:** A lightweight CSS framework that provides basic styling for the application without the overhead of more extensive frameworks.

## Directory Structure
- `index.html`: The entry point of the application which loads the entire app.
- `style.css`: Contains all the custom styles used throughout the application.
- `script.js`: Handles all the interactions within the application, including loading recipes, searching, initializing UI components, and dynamically loading images.
- `*.md`: Markdown files for each recipe, named sequentially (e.g., `001.md`, `002.md`, ...).
- `*.jpg`, `*.jpeg`, `*.png`: Image files that match the markdown files to visually represent the recipes.
  
## Usage
- Use the search box at the top to find recipes by keywords.
- Click on any recipe button to view the full recipe along with its image.
- Use the 'Share' button to share the recipe with others.

### Consistent Recipe Format
Each markdown recipe is meticulously structured to ensure ease of use and clarity:
- **Title**: Descriptive and formatted as a level 2 heading (`##`).
- **Ingredients Section**: Categorized by type and listed with precise descriptions.
- **Equipment Needed Section**: Outlines necessary tools and is formatted as a simple bullet list.
- **Instructions Section**: Numbered steps with bolded action words to guide users through the cooking process.
- **Shopping List Section**: Organized by categories, with interactive checkboxes for user convenience.

### Markdown Features Utilized
- **Bold** for emphasis.
- **Bullet lists** for ingredients and equipment.
- **Numbered lists** for step-by-step instructions.
- **Checkboxes** for shopping lists.

This structured approach not only maintains uniformity across the digital cookbook but also enhances the user experience by making recipes easy to follow and visually engaging.

Here's an enhanced prompt that includes detailed specifications for zero-shot generation of a recipe in the format used in the `aiCookbook` project:

---

"Could you provide a detailed markdown recipe for [RECIPE NAME OR DESCRIPTION HERE]? The recipe should be formatted according to the guidelines of the aiCookbook project:

### Recipe Structure:
- **Title**: Use a level 2 heading (`##`) for the recipe name.
- **Ingredients Section**: Categorize ingredients by type (e.g., Meat, Vegetables, Seasoning). List ingredients with specific quantities and descriptions. Format the category titles in bold.
- **Equipment Needed Section**: List all the necessary cooking tools and equipment as a simple bullet list under a level 3 heading (`###`).
- **Instructions Section**: Provide the cooking steps as a numbered list, starting each step with a bold action word (e.g., Prepare, Cook, Serve) to clearly guide through the cooking process.
- **Shopping List Section**: Organize the shopping list by categories similar to the ingredients section, and use checkboxes (`[ ]`) for each item to allow users to interactively mark what they need.

### Markdown Features to Use:
- **Bold** for emphasis on section titles and key terms within the instructions.
- **Bullet lists** to enumerate equipment and ingredients.
- **Numbered lists** for the sequential steps in the instructions.
- **Checkboxes** in the shopping list for user interaction.

This structured approach ensures that the recipe is easy to follow and enhances user engagement. Make sure the recipe is visually engaging and maintains uniformity with other entries in the digital cookbook."

---

Replace "[RECIPE NAME OR DESCRIPTION HERE]" with the specific recipe or dish description to get a well-structured and formatted markdown recipe response. This prompt is designed to ensure that all necessary details are included and formatted correctly according to your project's standards.

Save the response into a markdown file like 042.md and optionally include a relevant photo as 042.jpg along with the other .md and .jpg files in the root folder.

## License
This project is licensed under the MIT License.