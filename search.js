// Search functionality for Protein Goblin.com

class SearchEngine {
    constructor() {
        this.recipes = recipes; // Using the global recipes object
        this.searchIndex = this.buildSearchIndex();
        this.searchHistory = this.loadSearchHistory();
        this.popularSearches = this.loadPopularSearches();
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
            searchInput.addEventListener('blur', () => this.hideSearchSuggestions());
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
        
        this.showSearchSuggestions();
        this.updateSuggestions(query);
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
        // Delay hiding to allow clicking on suggestions
        setTimeout(() => {
            const suggestions = document.getElementById('search-suggestions');
            if (suggestions) {
                suggestions.style.display = 'none';
            }
        }, 200);
    }

    updateSuggestions(query) {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions) return;
        
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
                    <span>No recipes found for "${query}"</span>
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
            item.addEventListener('click', () => {
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
        this.performSearch();
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
        const container = document.getElementById('featured-recipes-grid');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No recipes found for "${query}"</h3>
                    <p>Try searching for different ingredients or recipe names</p>
                    <div class="search-suggestions">
                        <h4>Popular searches:</h4>
                        <div class="popular-searches">
                            ${this.popularSearches.slice(0, 6).map(term => `
                                <button class="popular-search-btn" onclick="searchEngine.searchForTerm('${term}')">
                                    ${term}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // Update the grid with search results
        container.innerHTML = results.map(recipe => this.createRecipeCardHTML(recipe)).join('');
        
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
        return `
            <div class="recipe-card fade-in">
                <div class="recipe-image">
                    ${imageHtml}
                    <div class="goblin-badge">🧌</div>
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
                <div class="recipe-actions">
                    <button class="btn btn-primary btn-small" onclick="searchEngine.viewFullRecipe('${recipe.name}')">
                        View Full Recipe
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="searchEngine.saveRecipe('${recipe.name}')">
                        Save
                    </button>
                </div>
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
        // Find the full recipe
        let fullRecipe = null;
        Object.values(this.recipes).forEach(flavorRecipes => {
            const found = flavorRecipes.find(recipe => recipe.name === recipeName);
            if (found) fullRecipe = found;
        });
        
        if (fullRecipe && typeof recipeGenerator !== 'undefined') {
            recipeGenerator.displayRecipe(fullRecipe, fullRecipe.ingredients, {});
            document.getElementById('recipe-results').scrollIntoView({ behavior: 'smooth' });
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

// Initialize search engine
let searchEngine;
document.addEventListener('DOMContentLoaded', function() {
    searchEngine = new SearchEngine();
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
        padding: 0.75rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--border-color);
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .suggestion-item:hover {
        background: var(--accent-bg);
    }
    
    .suggestion-item.no-results {
        color: var(--muted-text);
        cursor: default;
    }
    
    .suggestion-icon {
        font-size: 1.5rem;
        margin-right: 0.75rem;
    }
    
    .suggestion-content {
        flex: 1;
    }
    
    .suggestion-name {
        font-weight: 600;
        color: var(--primary-text);
        margin-bottom: 0.25rem;
    }
    
    .suggestion-meta {
        display: flex;
        gap: 0.75rem;
        font-size: 0.875rem;
        color: var(--muted-text);
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
