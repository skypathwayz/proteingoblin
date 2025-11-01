// Search functionality for Protein Goblin.com

class SearchEngine {
    constructor() {
        this.recipes = recipes; // Using the global recipes object
        this.searchIndex = null; // Lazy load - build only when needed
        this.searchHistory = this.loadSearchHistory();
        this.popularSearches = this.loadPopularSearches();
        this.searchDebounceTimer = null; // For debouncing search input
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSearchSuggestions();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
            searchInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
            searchInput.addEventListener('focus', () => this.showSearchSuggestions());
            // Delay blur to allow clicking on suggestions
            searchInput.addEventListener('blur', (e) => {
                // Don't hide if clicking inside suggestions
                const relatedTarget = e.relatedTarget;
                const suggestions = document.getElementById('search-suggestions');
                if (suggestions && suggestions.contains(relatedTarget)) {
                    return;
                }
                setTimeout(() => {
                    if (!suggestions || !suggestions.matches(':hover')) {
                        this.hideSearchSuggestions();
                    }
                }, 300);
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
    }

    setupSearchSuggestions() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        // Create suggestions container
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'search-suggestions';
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
            display: none;
        `;
        
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(suggestionsContainer);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }

    buildSearchIndex() {
        const index = {
            recipes: [],
            ingredients: [],
            categories: [],
            tags: []
        };
        
        // Index all recipes
        Object.values(this.recipes).forEach(recipeList => {
            recipeList.forEach(recipe => {
                const recipeData = {
                    name: recipe.name,
                    category: recipe.category,
                    difficulty: recipe.difficulty,
                    ingredients: recipe.ingredients,
                    method: recipe.method,
                    tips: recipe.tips || '',
                    prepTime: recipe.prepTime,
                    cookTime: recipe.cookTime,
                    servings: recipe.servings,
                    protein: recipe.protein,
                    calories: recipe.calories
                };
                
                index.recipes.push(recipeData);
                
                // Index ingredients
                recipe.ingredients.forEach(ingredient => {
                    if (!index.ingredients.includes(ingredient)) {
                        index.ingredients.push(ingredient);
                    }
                });
                
                // Index categories
                if (!index.categories.includes(recipe.category)) {
                    index.categories.push(recipe.category);
                }
            });
        });
        
        return index;
    }

    handleSearchInput(e) {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            this.hideSearchSuggestions();
            return;
        }
        
        // Debounce search to prevent lag (wait 300ms after user stops typing)
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
        }
        
        this.searchDebounceTimer = setTimeout(() => {
            this.showSearchSuggestions();
            this.updateSuggestions(query);
        }, 300); // Wait 300ms before searching
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.performSearch();
        }
    }

    showSearchSuggestions() {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'block';
        }
    }

    hideSearchSuggestions() {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }

    updateSuggestions(query) {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions) return;
        
        // Lazy load search index only when first search happens
        if (!this.searchIndex) {
            this.searchIndex = this.buildSearchIndex();
        }
        
        const results = this.search(query, 5); // Get top 5 results
        const suggestionsHTML = this.createSuggestionsHTML(results, query);
        
        suggestions.innerHTML = suggestionsHTML;
        
        // Add click handlers to suggestions
        this.addSuggestionClickHandlers();
    }

    createSuggestionsHTML(results, query) {
        if (results.length === 0) {
            return `
                <div class="suggestion-item no-results">
                    <span><img src="images-backup/22.svg" alt="" style="height: 16px; width: auto; vertical-align: middle; margin-right: 4px;"> Goblin says: No recipes found for "${query}" - try "chocolate" or "pancakes"!</span>
                </div>
            `;
        }
        
        return results.map(recipe => `
            <div class="suggestion-item" data-recipe-name="${recipe.name}">
                <div class="suggestion-icon">${this.getRecipeIcon(recipe.category)}</div>
                <div class="suggestion-content">
                    <div class="suggestion-name">${this.highlightMatch(recipe.name, query)}</div>
                    <div class="suggestion-meta">
                        <span class="suggestion-category">${recipe.category}</span>
                        <span class="suggestion-time">${recipe.prepTime}</span>
                        <span class="suggestion-protein">${recipe.protein}g protein</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addSuggestionClickHandlers() {
        const suggestionItems = document.querySelectorAll('.suggestion-item[data-recipe-name]');
        suggestionItems.forEach(item => {
            // Use mousedown instead of click to prevent blur from interfering
            item.addEventListener('mousedown', (e) => {
                e.preventDefault(); // Prevent input blur
                const recipeName = item.dataset.recipeName;
                this.selectRecipe(recipeName);
            });
            // Also handle touch for mobile
            item.addEventListener('touchend', (e) => {
                e.preventDefault();
                const recipeName = item.dataset.recipeName;
                this.selectRecipe(recipeName);
            });
        });
    }

    selectRecipe(recipeName) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = recipeName;
        }
        
        this.hideSearchSuggestions();
        
        // Find and display the recipe directly
        let foundRecipe = null;
        Object.values(this.recipes).forEach(flavorRecipes => {
            const recipe = flavorRecipes.find(r => r.name === recipeName);
            if (recipe) {
                foundRecipe = recipe;
            }
        });
        
        if (foundRecipe) {
            // Scroll to recipe generator section first
            const generatorSection = document.getElementById('recipe-generator');
            if (generatorSection) {
                generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Use global viewFullRecipe function (from main.js)
            if (typeof window.viewFullRecipe === 'function') {
                setTimeout(() => {
                    window.viewFullRecipe(recipeName);
                }, 500); // Small delay to allow scroll to complete
            } else if (typeof viewFullRecipe === 'function') {
                setTimeout(() => {
                    viewFullRecipe(recipeName);
                }, 500);
            } else {
                // Fallback: perform search to show results
                this.performSearch();
            }
        } else {
            this.performSearch();
        }
    }

    performSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        const query = searchInput.value.trim();
        
        if (query.length < 2) {
            this.showAlert('Please enter at least 2 characters to search', 'warning');
            return;
        }
        
        // Save to search history
        this.saveToSearchHistory(query);
        
        // Perform search
        const results = this.search(query);
        
        // Display results
        this.displaySearchResults(results, query);
        
        // Track search analytics
        this.trackSearch(query, results.length);
    }

    search(query, limit = null) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        const results = [];
        
        this.searchIndex.recipes.forEach(recipe => {
            let score = 0;
            const searchableText = [
                recipe.name,
                recipe.category,
                recipe.difficulty,
                ...recipe.ingredients,
                ...recipe.method,
                recipe.tips
            ].join(' ').toLowerCase();
            
            // Calculate relevance score
            searchTerms.forEach(term => {
                // Exact name match gets highest score
                if (recipe.name.toLowerCase().includes(term)) {
                    score += 10;
                }
                
                // Category match
                if (recipe.category.toLowerCase().includes(term)) {
                    score += 5;
                }
                
                // Ingredient match
                recipe.ingredients.forEach(ingredient => {
                    if (ingredient.toLowerCase().includes(term)) {
                        score += 3;
                    }
                });
                
                // Method match
                recipe.method.forEach(step => {
                    if (step.toLowerCase().includes(term)) {
                        score += 2;
                    }
                });
                
                // General text match
                if (searchableText.includes(term)) {
                    score += 1;
                }
            });
            
            if (score > 0) {
                results.push({ ...recipe, score });
            }
        });
        
        // Sort by score (highest first)
        results.sort((a, b) => b.score - a.score);
        
        return limit ? results.slice(0, limit) : results;
    }

    displaySearchResults(results, query) {
        // Check if we're on cookbook page
        const isCookbookPage = window.location.pathname.includes('cookbook.html');
        
        if (isCookbookPage) {
            // On cookbook page - filter and highlight matching recipes in each category
            if (results.length === 0) {
                if (typeof showAlert === 'function') {
                    showAlert(`No recipes found for "${query}". Try different search terms!`, 'warning');
                }
                return;
            }
            
            // Group results by category
            const resultsByCategory = {
                breakfast: [],
                desserts: [],
                snacks: [],
                savory: [],
                baked: [],
                frozen: []
            };
            
            results.forEach(recipe => {
                const category = recipe.category ? recipe.category.toLowerCase() : 'snacks';
                if (category.includes('breakfast') || category.includes('morning')) {
                    resultsByCategory.breakfast.push(recipe);
                } else if (category.includes('dessert') || category.includes('cake') || category.includes('sweet')) {
                    resultsByCategory.desserts.push(recipe);
                } else if (category.includes('snack') || category.includes('bar') || category.includes('bite')) {
                    resultsByCategory.snacks.push(recipe);
                } else if (category.includes('savory')) {
                    resultsByCategory.savory.push(recipe);
                } else if (category.includes('baked')) {
                    resultsByCategory.baked.push(recipe);
                } else if (category.includes('frozen') || category.includes('ice')) {
                    resultsByCategory.frozen.push(recipe);
                } else {
                    resultsByCategory.snacks.push(recipe);
                }
            });
            
            // Update each category grid with search results
            Object.keys(resultsByCategory).forEach(categoryName => {
                const categoryRecipes = resultsByCategory[categoryName];
                const gridId = categoryName + '-recipes-grid';
                const grid = document.getElementById(gridId);
                
                if (grid && categoryRecipes.length > 0) {
                    // Display matching recipes in this category
                    if (typeof displayRecipes === 'function') {
                        displayRecipes(categoryRecipes, grid);
                    } else {
                        grid.innerHTML = categoryRecipes.map(recipe => {
                            const imageHtml = typeof getFoodImage === 'function' ? getFoodImage(recipe.name, recipe.name) : '';
                            const safeRecipeName = recipe.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                            return `
                                <div class="recipe-card fade-in" style="border: 2px solid var(--accent-color);" onclick="if(typeof viewFullRecipe === 'function') { viewFullRecipe('${safeRecipeName}'); } else if(typeof window.viewFullRecipe === 'function') { window.viewFullRecipe('${safeRecipeName}'); }">
                                    <div class="recipe-image">
                                        ${imageHtml}
                                    </div>
                                    <div class="recipe-header">
                                        <h3 class="recipe-title">${recipe.name}</h3>
                                        <div class="recipe-meta">
                                            <span class="recipe-category">${recipe.category}</span>
                                            <span class="recipe-protein">${recipe.protein}g protein</span>
                                        </div>
                                    </div>
                                    <div class="recipe-actions" onclick="event.stopPropagation();">
                                        <button class="btn btn-primary btn-small" onclick="if(typeof viewFullRecipe === 'function') { viewFullRecipe('${safeRecipeName}'); } return false;">
                                            View Recipe
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('');
                    }
                } else if (grid && categoryRecipes.length === 0) {
                    // Hide categories with no results
                    grid.parentElement.style.display = 'none';
                }
            });
            
            // Scroll to first result category
            const firstResult = results[0];
            if (firstResult) {
                const category = firstResult.category ? firstResult.category.toLowerCase() : 'snacks';
                let targetCategory = 'breakfast';
                
                if (category.includes('breakfast') || category.includes('morning')) {
                    targetCategory = 'breakfast';
                } else if (category.includes('dessert') || category.includes('cake') || category.includes('sweet')) {
                    targetCategory = 'desserts';
                } else if (category.includes('snack') || category.includes('bar') || category.includes('bite')) {
                    targetCategory = 'snacks';
                } else if (category.includes('savory')) {
                    targetCategory = 'savory';
                } else if (category.includes('baked')) {
                    targetCategory = 'baked';
                } else if (category.includes('frozen') || category.includes('ice')) {
                    targetCategory = 'frozen';
                }
                
                setTimeout(() => {
                    const targetSection = document.getElementById(targetCategory);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
            
            // Show search results message
            if (typeof showAlert === 'function') {
                showAlert(`Found ${results.length} recipes matching "${query}"!`, 'success');
            }
            return;
        }
        
        // On index page - show in featured recipes grid
        const featuredSection = document.getElementById('featured-recipes');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        const container = document.getElementById('featured-recipes-grid');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon" style="text-align: center; margin-bottom: 20px;"><img src="images-backup/22.svg" alt="" style="height: 60px; width: auto;"></div>
                    <h3>Goblin's Sad News: No recipes found for "${query}"</h3>
                    <p style="color: var(--secondary-text); margin-top: 10px;">
                        <img src="images-backup/22.svg" alt="" style="height: 16px; width: auto; vertical-align: middle; margin-right: 4px;"> Even goblins can't find everything! Try searching for "chocolate", "vanilla", "pancakes", or "smoothie" - goblins know these work!
                    </p>
                    <p>Try searching for different ingredients or recipe names</p>
                    <div class="search-suggestions">
                        <h4>Popular searches:</h4>
                        <div class="popular-searches">
                            ${this.popularSearches.slice(0, 6).map(term => `
                                <button class="popular-search-btn" onclick="if(window.searchEngine) { window.searchEngine.searchForTerm('${term}'); }">
                                    ${term}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // Update the grid with search results - make cards clickable
        container.innerHTML = results.map(recipe => {
            const safeRecipeName = recipe.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            return `
            <div class="recipe-card fade-in" style="cursor: pointer;" onclick="if(typeof viewFullRecipe === 'function') { viewFullRecipe('${safeRecipeName}'); } else if(typeof window.viewFullRecipe === 'function') { window.viewFullRecipe('${safeRecipeName}'); }">
                ${this.createRecipeCardHTML(recipe)}
            </div>
            `;
        }).join('');
        
        // Update the section title
        const sectionTitle = document.querySelector('.featured-recipes .section-title');
        if (sectionTitle) {
            sectionTitle.textContent = `Search Results for "${query}" (${results.length} recipes)`;
        }
        
        // Show clear search button
        this.showClearSearchButton();
    }

    createRecipeCardHTML(recipe) {
        const imageHtml = typeof getFoodImage === 'function' ? getFoodImage(recipe.name, recipe.name) : '';
        const safeRecipeName = recipe.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
                <div class="recipe-image">
                    ${imageHtml}
                </div>
                <div class="recipe-header">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <div class="recipe-meta">
                        <span class="recipe-category">${recipe.category}</span>
                        <span class="recipe-difficulty">${recipe.difficulty}</span>
                        <span class="recipe-protein">${recipe.protein}g protein</span>
                    </div>
                </div>
                <div class="recipe-ingredients">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.slice(0, 4).map(ingredient => `<li>${ingredient}</li>`).join('')}
                        ${recipe.ingredients.length > 4 ? '<li>...and more!</li>' : ''}
                    </ul>
                </div>
                <div class="recipe-method">
                    <h4>Quick Method:</h4>
                    <ol>
                        ${recipe.method.slice(0, 3).map(step => `<li>${step}</li>`).join('')}
                        ${recipe.method.length > 3 ? '<li>...see full recipe for more steps!</li>' : ''}
                    </ol>
                </div>
                <div class="recipe-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-primary btn-small" onclick="if(typeof viewFullRecipe === 'function') { viewFullRecipe('${safeRecipeName}'); } else if(typeof window.viewFullRecipe === 'function') { window.viewFullRecipe('${safeRecipeName}'); } return false;">
                        View Full Recipe
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="if(typeof addToShoppingListFromCard === 'function') { addToShoppingListFromCard('${safeRecipeName}'); } return false;">
                        Add to List
                    </button>
                </div>
        `;
    }

    searchForTerm(term) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = term;
            this.performSearch();
        }
    }

    viewFullRecipe(recipeName) {
        // Use global viewFullRecipe function from main.js
        if (typeof window.viewFullRecipe === 'function') {
            window.viewFullRecipe(recipeName);
        } else if (typeof viewFullRecipe === 'function') {
            viewFullRecipe(recipeName);
        } else {
            // Fallback: try to find recipe and scroll to generator
            const generatorSection = document.getElementById('recipe-generator');
            if (generatorSection) {
                generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showAlert('Goblin says: Click "Generate Recipe" and select this recipe from the results!', 'info');
            }
        }
    }

    saveRecipe(recipeName) {
        if (typeof recipeGenerator !== 'undefined') {
            recipeGenerator.toggleFavorite(recipeName);
        }
    }

    showClearSearchButton() {
        let clearBtn = document.getElementById('clear-search-btn');
        if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.id = 'clear-search-btn';
            clearBtn.className = 'btn btn-outline';
            clearBtn.innerHTML = 'Clear Search';
            clearBtn.onclick = () => this.clearSearch();
            
            const sectionFooter = document.querySelector('.featured-recipes .section-footer');
            if (sectionFooter) {
                sectionFooter.appendChild(clearBtn);
            }
        }
        clearBtn.style.display = 'inline-block';
    }

    clearSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.hideSearchSuggestions();
        
        // Reload featured recipes
        if (typeof loadFeaturedRecipes === 'function') {
            loadFeaturedRecipes();
        }
        
        // Reset section title
        const sectionTitle = document.querySelector('.featured-recipes .section-title');
        if (sectionTitle) {
            sectionTitle.textContent = 'Trending Recipe Ideas';
        }
        
        // Hide clear button
        const clearBtn = document.getElementById('clear-search-btn');
        if (clearBtn) {
            clearBtn.style.display = 'none';
        }
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getRecipeIcon(category) {
        const icons = {
            breakfast: '🥞',
            desserts: '🍰',
            snacks: '🍪',
            savory: '🍲',
            baked: '🍞',
            frozen: '🍦'
        };
        return icons[category] || '🍽️';
    }

    // Local Storage Methods
    saveToSearchHistory(query) {
        this.searchHistory.unshift({
            query,
            timestamp: Date.now()
        });
        
        // Keep only last 20 searches
        this.searchHistory = this.searchHistory.slice(0, 20);
        localStorage.setItem('proteinShackSearchHistory', JSON.stringify(this.searchHistory));
    }

    loadSearchHistory() {
        const saved = localStorage.getItem('proteinShackSearchHistory');
        return saved ? JSON.parse(saved) : [];
    }

    loadPopularSearches() {
        const saved = localStorage.getItem('proteinShackPopularSearches');
        return saved ? JSON.parse(saved) : [
            'chocolate pancakes',
            'protein bars',
            'vanilla smoothie',
            'breakfast recipes',
            'high protein',
            'low carb',
            'vegan protein',
            'protein cookies'
        ];
    }

    savePopularSearches() {
        localStorage.setItem('proteinShackPopularSearches', JSON.stringify(this.popularSearches));
    }

    // Analytics
    trackSearch(query, resultCount) {
        console.log('Search performed:', {
            query,
            resultCount,
            timestamp: Date.now()
        });
        
        // Update popular searches
        this.updatePopularSearches(query);
    }

    updatePopularSearches(query) {
        const existingIndex = this.popularSearches.indexOf(query);
        if (existingIndex > -1) {
            this.popularSearches.splice(existingIndex, 1);
        }
        
        this.popularSearches.unshift(query);
        this.popularSearches = this.popularSearches.slice(0, 20);
        this.savePopularSearches();
    }

    showAlert(message, type = 'info') {
        if (typeof showAlert === 'function') {
            showAlert(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize search engine - make globally accessible
let searchEngine;
window.searchEngine = null; // Will be set below
document.addEventListener('DOMContentLoaded', function() {
    searchEngine = new SearchEngine();
    window.searchEngine = searchEngine; // Make accessible globally
});

// Add CSS for search suggestions and results
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .suggestion-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 1px solid var(--border-color);
        min-height: 70px;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .suggestion-item:hover,
    .suggestion-item:active {
        background: var(--accent-bg);
        transform: translateX(5px);
    }
    
    .suggestion-item.no-results {
        color: var(--muted-text);
        cursor: default;
        min-height: auto;
    }
    
    .suggestion-icon {
        font-size: 2rem;
        margin-right: 1rem;
        flex-shrink: 0;
    }
    
    .suggestion-content {
        flex: 1;
        min-width: 0;
    }
    
    .suggestion-name {
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--primary-text);
        margin-bottom: 0.5rem;
        line-height: 1.3;
    }
    
    .suggestion-meta {
        display: flex;
        gap: 0.75rem;
        font-size: 1rem;
        color: var(--secondary-text);
        flex-wrap: wrap;
    }
    
    .suggestion-meta span {
        padding: 0.125rem 0.5rem;
        background: var(--accent-bg);
        border-radius: 0.25rem;
    }
    
    mark {
        background: var(--accent-color);
        color: var(--primary-bg);
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
    }
    
    .no-results {
        text-align: center;
        padding: 2rem;
    }
    
    .no-results-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .no-results h3 {
        color: var(--primary-text);
        margin-bottom: 0.5rem;
    }
    
    .no-results p {
        color: var(--secondary-text);
        margin-bottom: 1.5rem;
    }
    
    .popular-searches {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
    }
    
    .popular-search-btn {
        padding: 0.5rem 1rem;
        background: var(--accent-bg);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        color: var(--primary-text);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
    }
    
    .popular-search-btn:hover {
        background: var(--accent-color);
        color: var(--primary-bg);
        border-color: var(--accent-color);
    }
`;
document.head.appendChild(searchStyles);
