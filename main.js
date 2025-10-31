// Main JavaScript for Protein Goblin.com

// Global Variables
let currentRecipes = [];
let searchTimeout;

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const recipeForm = document.getElementById('recipe-form');
const generateBtn = document.getElementById('generate-btn');
const tryAnotherBtn = document.getElementById('try-another-btn');
const recipeResults = document.getElementById('recipe-results');
const featuredRecipesGrid = document.getElementById('featured-recipes-grid');
const categoryTabs = document.querySelectorAll('.category-tab');
const rotatingFact = document.getElementById('rotating-fact');

// Recipe Database moved to recipe-generator.js to avoid conflicts
/* const recipes = {
    // Protein Powder Recipes
    chocolate: [
        {
            name: "Chocolate Protein Brownies",
            category: "desserts",
            difficulty: "intermediate",
            image: "🍫",
            prepTime: "15 min",
            cookTime: "25 min",
            servings: 9,
            protein: 8,
            calories: 120,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1/2 cup almond flour",
                "1/4 cup cocoa powder",
                "1/4 cup honey",
                "2 eggs",
                "1/4 cup almond milk",
                "1 tsp vanilla extract",
                "1/2 tsp baking powder"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix dry ingredients in a bowl",
                "Whisk wet ingredients separately",
                "Combine wet and dry ingredients",
                "Pour into greased 8x8 pan",
                "Bake for 20-25 minutes",
                "Let cool before cutting into squares"
            ],
            tips: "For extra fudgy brownies, don't overmix the batter and let them cool completely before cutting."
        },
        {
            name: "Chocolate Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            image: "🥞",
            prepTime: "10 min",
            cookTime: "15 min",
            servings: 4,
            protein: 12,
            calories: 180,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1/2 cup oat flour",
                "1 banana, mashed",
                "2 eggs",
                "1/4 cup almond milk",
                "1 tsp baking powder",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix all ingredients in a bowl until smooth",
                "Heat a non-stick pan over medium heat",
                "Pour 1/4 cup batter for each pancake",
                "Cook until bubbles form on surface",
                "Flip and cook for 1-2 minutes more",
                "Serve with berries and sugar-free syrup"
            ],
            tips: "Let the batter rest for 5 minutes before cooking for fluffier pancakes."
        },
        {
            name: "Chocolate Protein Ice Cream",
            category: "frozen",
            difficulty: "beginner",
            image: "🍦",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 15,
            calories: 140,
            ingredients: [
                "2 scoops chocolate protein powder",
                "2 frozen bananas",
                "1/4 cup almond milk",
                "2 tbsp cocoa powder",
                "1 tsp vanilla extract",
                "1 tbsp honey"
            ],
            method: [
                "Freeze bananas overnight",
                "Add all ingredients to high-speed blender",
                "Blend until smooth and creamy",
                "Add more milk if needed for consistency",
                "Serve immediately or freeze for firmer texture"
            ],
            tips: "Use very ripe bananas for the best sweetness and texture."
        }
    ],
    vanilla: [
        {
            name: "Vanilla Protein Waffles",
            category: "breakfast",
            difficulty: "beginner",
            image: "🧇",
            prepTime: "10 min",
            cookTime: "20 min",
            servings: 4,
            protein: 14,
            calories: 160,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup almond flour",
                "2 eggs",
                "1/4 cup Greek yogurt",
                "1 tsp vanilla extract",
                "1/2 tsp baking soda",
                "1/4 cup almond milk"
            ],
            method: [
                "Preheat waffle iron to medium-high",
                "Combine all ingredients in a bowl",
                "Mix until smooth batter forms",
                "Pour batter into waffle iron",
                "Cook for 3-4 minutes until golden",
                "Serve with fresh fruit and honey"
            ],
            tips: "Don't open the waffle iron too early - wait for the steam to stop."
        },
        {
            name: "Vanilla Protein Cheesecake",
            category: "desserts",
            difficulty: "intermediate",
            image: "🍰",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 6,
            protein: 10,
            calories: 150,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup Greek yogurt",
                "1/4 cup cream cheese",
                "1 tbsp honey",
                "1 tsp vanilla extract",
                "1/2 cup crushed graham crackers",
                "Fresh berries for topping"
            ],
            method: [
                "Mix protein powder with Greek yogurt",
                "Add cream cheese and honey",
                "Stir in vanilla extract",
                "Layer with crushed graham crackers",
                "Refrigerate for 2 hours",
                "Top with fresh berries before serving"
            ],
            tips: "Let cream cheese come to room temperature for easier mixing."
        }
    ],
    strawberry: [
        {
            name: "Strawberry Protein Smoothie Bowl",
            category: "breakfast",
            difficulty: "beginner",
            image: "🍓",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 18,
            calories: 200,
            ingredients: [
                "2 scoops strawberry protein powder",
                "1 cup frozen strawberries",
                "1/2 banana",
                "1/4 cup Greek yogurt",
                "1/4 cup almond milk",
                "1 tbsp honey",
                "Fresh berries for topping"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Pour into a bowl",
                "Top with fresh strawberries and granola",
                "Add chia seeds and coconut flakes",
                "Serve immediately"
            ],
            tips: "Use frozen fruit for a thicker, ice cream-like consistency."
        }
    ],
    "cookies-cream": [
        {
            name: "Cookies & Cream Protein Bars",
            category: "snacks",
            difficulty: "beginner",
            image: "🍪",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 8,
            protein: 12,
            calories: 180,
            ingredients: [
                "2 scoops cookies & cream protein powder",
                "1/2 cup oat flour",
                "1/4 cup almond butter",
                "2 tbsp honey",
                "1/4 cup crushed cookies",
                "1/4 cup dark chocolate chips"
            ],
            method: [
                "Mix protein powder with oat flour",
                "Add almond butter and honey",
                "Stir in crushed cookies and chocolate chips",
                "Press into lined 8x8 pan",
                "Refrigerate for 2 hours before cutting"
            ],
            tips: "Use a food processor to crush the cookies for even distribution."
        }
    ],
    "peanut-butter": [
        {
            name: "Peanut Butter Protein Cookies",
            category: "desserts",
            difficulty: "intermediate",
            image: "🥜",
            prepTime: "15 min",
            cookTime: "12 min",
            servings: 12,
            protein: 8,
            calories: 140,
            ingredients: [
                "2 scoops peanut butter protein powder",
                "1/2 cup almond flour",
                "1/4 cup natural peanut butter",
                "2 tbsp honey",
                "1 egg",
                "1/2 tsp baking soda",
                "1/4 cup dark chocolate chips"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix all ingredients in a bowl",
                "Form into 12 cookie shapes",
                "Place on lined baking sheet",
                "Bake for 10-12 minutes",
                "Let cool on wire rack"
            ],
            tips: "Don't overbake - cookies will continue cooking as they cool."
        }
    ],
    banana: [
        {
            name: "Banana Protein Bread",
            category: "baked",
            difficulty: "intermediate",
            image: "🍌",
            prepTime: "15 min",
            cookTime: "50 min",
            servings: 10,
            protein: 6,
            calories: 160,
            ingredients: [
                "2 scoops banana protein powder",
                "1 cup almond flour",
                "2 ripe bananas, mashed",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking soda",
                "1 tsp cinnamon",
                "1/4 cup chopped walnuts"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix dry ingredients in a bowl",
                "Combine wet ingredients separately",
                "Mix wet and dry ingredients",
                "Fold in chopped walnuts",
                "Pour into greased loaf pan",
                "Bake for 45-50 minutes"
            ],
            tips: "Use very ripe bananas with brown spots for the best flavor."
        }
    ],
    cinnamon: [
        {
            name: "Cinnamon Protein Oatmeal",
            category: "breakfast",
            difficulty: "beginner",
            image: "🍯",
            prepTime: "5 min",
            cookTime: "10 min",
            servings: 1,
            protein: 20,
            calories: 220,
            ingredients: [
                "1 scoop cinnamon protein powder",
                "1/2 cup rolled oats",
                "1 cup almond milk",
                "1 tbsp honey",
                "1 tsp cinnamon",
                "1/4 cup chopped nuts",
                "1 tbsp chia seeds"
            ],
            method: [
                "Cook oats with almond milk over medium heat",
                "Stir in protein powder gradually",
                "Add honey and cinnamon",
                "Top with chopped nuts and chia seeds",
                "Serve warm"
            ],
            tips: "Add protein powder after cooking to preserve its nutritional value."
        }
    ],
    "mint-chocolate": [
        {
            name: "Mint Chocolate Protein Ice Cream",
            category: "frozen",
            difficulty: "beginner",
            image: "🌿",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 16,
            calories: 150,
            ingredients: [
                "2 scoops mint chocolate protein powder",
                "2 frozen bananas",
                "1/4 cup almond milk",
                "1 tsp peppermint extract",
                "2 tbsp cocoa powder",
                "Dark chocolate chips"
            ],
            method: [
                "Freeze bananas overnight",
                "Blend all ingredients except chocolate chips",
                "Stir in chocolate chips",
                "Freeze for 2 hours for firmer texture",
                "Serve with extra chocolate chips"
            ],
            tips: "Add peppermint extract gradually - a little goes a long way."
        }
    ],
    caramel: [
        {
            name: "Caramel Protein Flan",
            category: "desserts",
            difficulty: "advanced",
            image: "🍯",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 4,
            protein: 12,
            calories: 180,
            ingredients: [
                "2 scoops caramel protein powder",
                "1 cup Greek yogurt",
                "1/4 cup sugar-free caramel sauce",
                "1 tsp vanilla extract",
                "1/4 cup chopped pecans",
                "1 tbsp honey"
            ],
            method: [
                "Mix protein powder with Greek yogurt",
                "Add caramel sauce and vanilla",
                "Layer in serving glasses",
                "Refrigerate for 2 hours",
                "Top with chopped pecans",
                "Drizzle with extra caramel sauce"
            ],
            tips: "Use sugar-free caramel sauce to keep calories low."
        }
    ],
    "birthday-cake": [
        {
            name: "Birthday Cake Protein Muffins",
            category: "baked",
            difficulty: "beginner",
            image: "🎂",
            prepTime: "15 min",
            cookTime: "18 min",
            servings: 6,
            protein: 10,
            calories: 140,
            ingredients: [
                "2 scoops birthday cake protein powder",
                "1 cup almond flour",
                "2 eggs",
                "1/4 cup Greek yogurt",
                "1 tbsp honey",
                "1/2 tsp baking soda",
                "Sprinkles for topping"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix all ingredients in a bowl",
                "Fill muffin cups 3/4 full",
                "Top with sprinkles",
                "Bake for 15-18 minutes",
                "Let cool before serving"
            ],
            tips: "Don't overmix the batter to keep muffins light and fluffy."
        }
    ],
    coconut: [
        {
            name: "Coconut Protein Macaroons",
            category: "desserts",
            difficulty: "intermediate",
            image: "🥥",
            prepTime: "20 min",
            cookTime: "15 min",
            servings: 12,
            protein: 6,
            calories: 120,
            ingredients: [
                "2 scoops coconut protein powder",
                "1 cup shredded coconut",
                "1/4 cup coconut oil",
                "2 tbsp honey",
                "1 tsp vanilla extract",
                "1 egg white",
                "1/4 cup dark chocolate chips"
            ],
            method: [
                "Preheat oven to 325°F (165°C)",
                "Mix all ingredients in a bowl",
                "Form into small mounds",
                "Place on lined baking sheet",
                "Bake for 12-15 minutes",
                "Let cool completely"
            ],
            tips: "Use unsweetened shredded coconut for better control over sweetness."
        }
    ],
    unflavored: [
        {
            name: "Savory Protein Crackers",
            category: "savory",
            difficulty: "intermediate",
            image: "🍪",
            prepTime: "20 min",
            cookTime: "20 min",
            servings: 24,
            protein: 4,
            calories: 60,
            ingredients: [
                "2 scoops unflavored protein powder",
                "1 cup almond flour",
                "2 tbsp olive oil",
                "1/4 cup water",
                "1 tsp salt",
                "1 tsp herbs de provence",
                "1/2 tsp garlic powder"
            ],
            method: [
                "Mix dry ingredients in a bowl",
                "Add olive oil and water gradually",
                "Knead until dough forms",
                "Roll out dough thinly",
                "Cut into cracker shapes",
                "Bake at 350°F for 15-20 minutes"
            ],
            tips: "Roll dough between parchment paper for easier handling."
        },
        {
            name: "Protein-Enriched Soup Thickener",
            category: "savory",
            difficulty: "beginner",
            image: "🍲",
            prepTime: "10 min",
            cookTime: "20 min",
            servings: 4,
            protein: 12,
            calories: 80,
            ingredients: [
                "2 scoops unflavored protein powder",
                "4 cups vegetable or chicken broth",
                "1 cup mixed vegetables",
                "1 tbsp olive oil",
                "Salt and pepper to taste",
                "Fresh herbs for garnish"
            ],
            method: [
                "Heat olive oil in a large pot",
                "Add vegetables and cook until tender",
                "Add broth and bring to boil",
                "Whisk in protein powder gradually",
                "Simmer for 10 minutes",
                "Season and garnish with herbs"
            ],
            tips: "Add protein powder slowly while whisking to prevent clumping."
        },
        {
            name: "High-Protein Meatballs",
            category: "savory",
            difficulty: "intermediate",
            image: "🍖",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 6,
            protein: 18,
            calories: 200,
            ingredients: [
                "1 lb ground turkey or beef",
                "1/2 cup unflavored protein powder",
                "1 egg",
                "1/4 cup breadcrumbs",
                "2 tbsp grated parmesan",
                "1 tsp Italian seasoning",
                "Salt and pepper to taste"
            ],
            method: [
                "Mix all ingredients in a bowl",
                "Form into 1-inch meatballs",
                "Bake at 400°F for 20 minutes",
                "Or pan-fry until golden brown",
                "Serve with your favorite sauce"
            ],
            tips: "Don't overmix the meat mixture to keep meatballs tender."
        }
    ],
    // Protein Bar Recipes
    "protein-bars": [
        {
            name: "Chocolate Chip Protein Bars",
            category: "snacks",
            difficulty: "beginner",
            image: "🍫",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 8,
            protein: 12,
            calories: 180,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1/2 cup almond butter",
                "1/4 cup honey",
                "1/2 cup oats",
                "1/4 cup dark chocolate chips",
                "2 tbsp chia seeds"
            ],
            method: [
                "Mix protein powder with almond butter and honey",
                "Add oats and chia seeds",
                "Stir in chocolate chips",
                "Press into lined 8x8 pan",
                "Refrigerate for 2 hours before cutting"
            ],
            tips: "Use a food processor to make the mixture easier to work with."
        }
    ],
    // Protein Yogurt Recipes
    "protein-yogurt": [
        {
            name: "Greek Yogurt Protein Parfait",
            category: "breakfast",
            difficulty: "beginner",
            image: "🥣",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 1,
            protein: 20,
            calories: 250,
            ingredients: [
                "1 cup Greek yogurt",
                "1 scoop vanilla protein powder",
                "1/2 cup mixed berries",
                "1/4 cup granola",
                "1 tbsp honey",
                "1 tbsp chia seeds"
            ],
            method: [
                "Mix protein powder with Greek yogurt",
                "Layer yogurt with berries",
                "Add granola and chia seeds",
                "Drizzle with honey",
                "Serve immediately"
            ],
            tips: "Layer ingredients in a clear glass for a beautiful presentation."
        }
    ],
    // Protein Cereal Recipes
    "protein-cereal": [
        {
            name: "High Protein Cereal Bowl",
            category: "breakfast",
            difficulty: "beginner",
            image: "🥣",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 15,
            calories: 200,
            ingredients: [
                "1 cup high-protein cereal",
                "1 cup almond milk",
                "1 scoop vanilla protein powder",
                "1/2 banana, sliced",
                "1 tbsp almond butter",
                "1 tbsp chia seeds"
            ],
            method: [
                "Mix protein powder with almond milk",
                "Pour over cereal",
                "Top with banana slices",
                "Add almond butter and chia seeds",
                "Serve immediately"
            ],
            tips: "Add protein powder to milk first to prevent clumping."
        }
    ]
}; */

// Protein Facts for Rotation
const proteinFacts = [
    "💡 Your body can only absorb about 25-35g of protein per meal. More isn't always better!",
    "🏋️ Protein synthesis peaks 2-4 hours after resistance training.",
    "🥛 Casein protein is slower digesting, making it perfect for overnight recovery.",
    "🌱 Plant proteins can be just as effective as animal proteins when combined properly.",
    "⚡ Consuming protein within 30 minutes post-workout maximizes muscle protein synthesis.",
    "🍳 Adding a pinch of salt to protein powder helps reduce the chalky taste.",
    "💪 You need 0.8-1.2g of protein per pound of body weight for muscle building.",
    "🥤 Use a blender instead of a shaker for smoother protein drinks.",
    "⏰ Spread your protein intake evenly throughout the day for best results.",
    "🔥 Protein has a higher thermic effect than carbs or fats."
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadFeaturedRecipes();
    startProteinFactsRotation();
    setupMobileMenu();
    setupSearch();
    setupRecipeGenerator();
    setupCategoryFiltering();
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Mobile Menu
function toggleMobileMenu() {
    if (navMenu) {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
}

// Search Functionality
function setupSearch() {
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

function handleSearch(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch();
    }, 300);
}

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) {
        loadFeaturedRecipes();
        return;
    }
    
    const results = searchRecipes(query);
    displayRecipes(results, featuredRecipesGrid);
}

function searchRecipes(query) {
    const allRecipes = [];
    Object.values(recipes).forEach(flavorRecipes => {
        allRecipes.push(...flavorRecipes);
    });
    
    return allRecipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(query)
        ) ||
        recipe.method.some(step => 
            step.toLowerCase().includes(query)
        )
    );
}

// Recipe Generator
function setupRecipeGenerator() {
    if (recipeForm) {
        recipeForm.addEventListener('submit', handleRecipeGeneration);
    }
    
    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', handleRecipeGeneration);
    }
    
    // Protein source change handler
    const proteinSourceInputs = document.querySelectorAll('input[name="protein-source"]');
    proteinSourceInputs.forEach(input => {
        input.addEventListener('change', handleProteinSourceChange);
    });
    
    // Flavor change handler
    const flavorInputs = document.querySelectorAll('input[name="flavor"]');
    flavorInputs.forEach(input => {
        input.addEventListener('change', handleFlavorChange);
    });
}

function handleProteinSourceChange() {
    const proteinSource = document.querySelector('input[name="protein-source"]:checked').value;
    const flavorSection = document.getElementById('flavor-section');
    const savoryOption = document.getElementById('savory-option');
    
    if (proteinSource === 'powder') {
        flavorSection.style.display = 'block';
    } else {
        flavorSection.style.display = 'none';
        savoryOption.style.display = 'none';
        if (document.getElementById('category').value === 'savory') {
            document.getElementById('category').value = 'all';
        }
    }
}

function handleFlavorChange() {
    const flavor = document.querySelector('input[name="flavor"]:checked');
    const proteinSource = document.querySelector('input[name="protein-source"]:checked').value;
    const savoryOption = document.getElementById('savory-option');
    
    if (proteinSource === 'powder' && flavor && flavor.value === 'unflavored') {
        savoryOption.style.display = 'block';
    } else {
        savoryOption.style.display = 'none';
        if (document.getElementById('category').value === 'savory') {
            document.getElementById('category').value = 'all';
        }
    }
}

function handleRecipeGeneration(e) {
    e.preventDefault();
    generateRecipe();
}

function generateRecipe() {
    const formData = new FormData(recipeForm);
    const proteinSource = formData.get('protein-source');
    const flavor = formData.get('flavor');
    const scoops = formData.get('scoops');
    const category = formData.get('category');
    const difficulty = formData.get('difficulty');
    const avoidIngredients = formData.getAll('avoid');

    if (!flavor && proteinSource === 'powder') {
        showAlert('Please select a protein flavor!', 'warning');
        return;
    }

    let selectedRecipes = getRecipesBySource(proteinSource, flavor);
    
    if (selectedRecipes.length === 0) {
        showAlert('No recipes available for this selection yet!', 'info');
        return;
    }

    // Filter recipes
    let filteredRecipes = filterRecipes(selectedRecipes, category, difficulty, avoidIngredients);
    
    if (filteredRecipes.length === 0) {
        filteredRecipes = selectedRecipes;
    }

    // Select random recipe
    const selectedRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
    
    // Adjust ingredients based on scoops
    const adjustedIngredients = adjustIngredients(selectedRecipe.ingredients, scoops, proteinSource);
    
    // Display recipe
    displayRecipe(selectedRecipe, adjustedIngredients);
    
    // Show try another button
    if (tryAnotherBtn) {
        tryAnotherBtn.style.display = 'block';
    }
}

function getRecipesBySource(proteinSource, flavor) {
    switch (proteinSource) {
        case 'bars':
            return recipes['protein-bars'] || [];
        case 'yogurt':
            return recipes['protein-yogurt'] || [];
        case 'cereal':
            return recipes['protein-cereal'] || [];
        case 'mixed':
            return [
                ...(recipes['protein-bars'] || []),
                ...(recipes['protein-yogurt'] || []),
                ...(recipes['protein-cereal'] || [])
            ];
        default:
            return recipes[flavor] || [];
    }
}

function filterRecipes(recipes, category, difficulty, avoidIngredients) {
    let filtered = recipes;
    
    if (category !== 'all') {
        filtered = filtered.filter(recipe => recipe.category === category);
    }
    
    if (difficulty !== 'all') {
        filtered = filtered.filter(recipe => recipe.difficulty === difficulty);
    }
    
    if (avoidIngredients.length > 0) {
        filtered = filtered.filter(recipe => {
            return !avoidIngredients.some(avoid => {
                const avoidLower = avoid.toLowerCase();
                return recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(avoidLower)
                );
            });
        });
    }
    
    return filtered;
}

function adjustIngredients(ingredients, scoops, proteinSource) {
    if (proteinSource !== 'powder') return ingredients;
    
    return ingredients.map(ingredient => {
        if (ingredient.includes('scoops')) {
            return ingredient.replace(/\d+/, scoops);
        }
        return ingredient;
    });
}

function displayRecipe(recipe, ingredients) {
    const resultsDiv = document.getElementById('recipe-results');
    if (!resultsDiv) return;

    // Use getFoodImage to render the correct image
    const imageHtml = typeof getFoodImage === 'function' ? getFoodImage(recipe.name, recipe.name) : '';
    
    resultsDiv.innerHTML = `
        <div class="recipe-card fade-in">
            <div class="recipe-image">
                ${imageHtml}
                <div class="goblin-badge">🧌 Goblin’s Pick!</div>
            </div>
            <div class="recipe-header">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${recipe.prepTime} prep</span>
                    <span class="recipe-servings">👥 ${recipe.servings} servings</span>
                    <span class="recipe-protein">💪 ${recipe.protein}g protein</span>
                </div>
            </div>
            <div class="recipe-ingredients">
                <h4>Ingredients:</h4>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="recipe-method">
                <h4>Method:</h4>
                <ol>
                    ${recipe.method.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            ${recipe.tips ? `<div class="recipe-tips">
                <h4>💡 Goblin’s Tip:</h4>
                <p>${recipe.tips}</p>
            </div>` : ''}
            <div class="recipe-actions">
                <button class="btn btn-primary" onclick="shareRecipe('${recipe.name}')">📱 Share Recipe</button>
                <button class="btn btn-secondary" onclick="saveRecipe('${recipe.name}')">❤️ Save</button>
                <button class="btn btn-outline" onclick="rateRecipe('${recipe.name}')">⭐ Rate</button>
            </div>
        </div>
    `;

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Category Filtering
function setupCategoryFiltering() {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterRecipesByCategory(category);
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterRecipesByCategory(category) {
    let allRecipes = [];
    if (typeof recipes !== 'undefined') {
        Object.values(recipes).forEach(flavorRecipes => {
            allRecipes = allRecipes.concat(flavorRecipes);
        });
    }
    
    let filteredRecipes = allRecipes;
    if (category !== 'all') {
        filteredRecipes = allRecipes.filter(recipe => recipe.category === category);
    }
    
    // Shuffle and take first 6
    const shuffled = filteredRecipes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    
    if (selected.length > 0) {
        displayRecipes(selected, featuredRecipesGrid);
    }
}

// Global function for category filtering from dropdown
function filterByCategory(category) {
    if (featuredRecipesGrid) {
        const cards = featuredRecipesGrid.querySelectorAll('.recipe-card');
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });
        
        // Scroll to recipes section
        document.getElementById('featured-recipes')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Cookbook filtering function
function filterCookbook(filter) {
    const cookbookSection = document.getElementById('cookbook-section');
    if (cookbookSection) {
        // Scroll to cookbook section
        cookbookSection.scrollIntoView({ behavior: 'smooth' });
        
        // Filter cookbook categories based on selection
        const categories = cookbookSection.querySelectorAll('.cookbook-category');
        categories.forEach(cat => {
            const categoryText = cat.textContent.toLowerCase();
            if (filter === 'all' || 
                (filter === 'beginner' && categoryText.includes('beginner')) ||
                (filter === 'advanced' && categoryText.includes('advanced')) ||
                (filter === 'vegan' && categoryText.includes('vegan')) ||
                (filter === 'keto' && categoryText.includes('keto')) ||
                (filter === 'meal-prep' && categoryText.includes('meal'))) {
                cat.style.display = 'block';
            } else {
                // Show all for now, can add filtering logic later
                cat.style.display = 'block';
            }
        });
        
        // Show message
        alert(`Showing ${filter} recipes!`);
    } else {
        // If on different page, redirect
        window.location.href = 'index.html#cookbook-section';
    }
}

// Blog category filtering function
function filterBlogCategory(category) {
    const articles = document.querySelectorAll('.blog-article, .featured-article');
    let visibleCount = 0;
    
    articles.forEach(article => {
        const categoryBadge = article.querySelector('.article-category');
        if (categoryBadge) {
            const articleCategory = categoryBadge.textContent.toLowerCase();
            const matchMap = {
                'nutrition': ['nutrition', 'health', 'science'],
                'cooking-tips': ['cooking tips', 'tips', 'cooking'],
                'reviews': ['reviews', 'review'],
                'fitness': ['fitness', 'workout'],
                'health': ['health', 'nutrition', 'side effects'],
                'recipes': ['recipes', 'recipe']
            };
            
            const matchCategories = matchMap[category] || [];
            const matches = matchCategories.some(cat => articleCategory.includes(cat));
            
            if (matches) {
                article.style.display = 'block';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        } else {
            article.style.display = 'block';
        }
    });
    
    // Scroll to top of articles
    document.querySelector('.blog-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Load Featured Recipes
function loadFeaturedRecipes() {
    let allRecipes = [];
    Object.values(recipes).forEach(flavorRecipes => {
        allRecipes = allRecipes.concat(flavorRecipes);
    });
    
    // Shuffle and take first 6
    const shuffled = allRecipes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    
    displayRecipes(selected, featuredRecipesGrid);
}

function displayRecipes(recipes, container) {
    if (!container) return;

    container.innerHTML = recipes.map(recipe => {
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
                    <button class="btn btn-primary btn-small" onclick="viewFullRecipe('${recipe.name}')">View Full Recipe</button>
                    <button class="btn btn-secondary btn-small" onclick="saveRecipe('${recipe.name}')">Save</button>
                </div>
            </div>
        `;
    }).join('');
}

// Protein Facts Rotation
function startProteinFactsRotation() {
    if (!rotatingFact) return;
    
    let factIndex = 0;
    setInterval(() => {
        rotatingFact.textContent = proteinFacts[factIndex];
        factIndex = (factIndex + 1) % proteinFacts.length;
    }, 5000);
}

// Newsletter
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showAlert('Please enter your email address', 'warning');
        return;
    }
    
    // Simulate newsletter signup
    showAlert('Thanks for subscribing! You\'ll receive our weekly protein recipe newsletter.', 'success');
    e.target.reset();
}

// Utility Functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#00ff88',
        warning: '#ffa500',
        error: '#ff4444',
        info: '#00aaff'
    };
    
    alert.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 3000);
}

// Recipe Actions
function shareRecipe(recipeName) {
    if (navigator.share) {
        navigator.share({
            title: `${recipeName} - Protein Goblin Recipe`,
            text: `Check out this amazing protein recipe: ${recipeName}`,
            url: window.location.href
        });
    } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${recipeName} - Protein Goblin Recipe\n${window.location.href}`);
        showAlert('Recipe link copied to clipboard!', 'success');
    }
}

function saveRecipe(recipeName) {
    // Get saved recipes from localStorage
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    
    if (!savedRecipes.includes(recipeName)) {
        savedRecipes.push(recipeName);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        showAlert('Recipe saved to favorites!', 'success');
    } else {
        showAlert('Recipe already in favorites!', 'info');
    }
}

function rateRecipe(recipeName) {
    const rating = prompt(`Rate "${recipeName}" from 1-5 stars:`);
    if (rating && rating >= 1 && rating <= 5) {
        // Save rating to localStorage
        let ratings = JSON.parse(localStorage.getItem('recipeRatings') || '{}');
        ratings[recipeName] = parseInt(rating);
        localStorage.setItem('recipeRatings', JSON.stringify(ratings));
        showAlert(`Thanks for rating "${recipeName}" ${rating} stars!`, 'success');
    }
}

function viewFullRecipe(recipeName) {
    // This function now uses the recipe generator
    if (typeof recipeGenerator !== 'undefined') {
        const fullRecipe = recipeGenerator.findRecipeByName(recipeName);
        if (fullRecipe) {
            displayRecipe(fullRecipe, fullRecipe.ingredients);
            document.getElementById('recipe-results').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .recipe-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: var(--muted-text);
    }
    
    .recipe-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        flex-wrap: wrap;
    }
    
    .recipe-tips {
        background: var(--accent-bg);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
        border-left: 4px solid var(--accent-color);
    }
    
    .recipe-tips h4 {
        color: var(--accent-color);
        margin-bottom: 0.5rem;
    }
    
    .recipe-tips p {
        color: var(--secondary-text);
        margin: 0;
    }
`;
document.head.appendChild(style);

// Social Sharing Functionality
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const recipeTitle = document.querySelector('.recipe-title')?.textContent || 'Check out this recipe!';
            const url = window.location.href;
            
            let shareUrl = '';
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(recipeTitle)}`;
                    break;
                case 'pinterest':
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(recipeTitle)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Fix Mascot SVG Background - Remove black fills
function fixMascotBackground() {
    const mascotImages = document.querySelectorAll('.big-goblin, .small-goblin, .big-goblin-hero, .small-goblin-hero');
    mascotImages.forEach(img => {
        if (img.src && img.src.endsWith('.svg')) {
            // Force transparent background
            img.style.backgroundColor = 'transparent';
            img.style.background = 'transparent';
            
            // Load SVG and modify inline to remove black
            fetch(img.src)
                .then(response => response.text())
                .then(svgText => {
                    // Create a parser to modify SVG
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                    const svgElement = svgDoc.querySelector('svg');
                    
                    if (svgElement) {
                        // Find and remove black paths (especially between ear and bicep)
                        const paths = svgElement.querySelectorAll('path');
                        paths.forEach(path => {
                            const fill = path.getAttribute('fill');
                            if (fill === '#000000' || fill === 'black' || fill === '#000') {
                                // Check if it's the background path (large rectangle)
                                const d = path.getAttribute('d');
                                if (d && (d.includes('2402') || d.includes('1815') || d.includes('648'))) {
                                    // This is likely the background - remove it
                                    path.remove();
                                } else {
                                    // Other black fills - make transparent or remove
                                    path.setAttribute('fill', 'none');
                                    path.setAttribute('opacity', '0');
                                }
                            }
                        });
                        
                        // Serialize and update image
                        const serializer = new XMLSerializer();
                        const modifiedSvg = serializer.serializeToString(svgElement);
                        const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
                        const url = URL.createObjectURL(blob);
                        img.src = url;
                    }
                })
                .catch(err => {
                    // If fetch fails, apply CSS filters
                    img.style.mixBlendMode = 'multiply';
                    img.style.filter = 'brightness(1.2) contrast(1.1) drop-shadow(0 0 0 transparent)';
                });
        }
    });
}

// Interactive Goblin Effects
document.addEventListener('DOMContentLoaded', function() {
    initSocialSharing();
    fixMascotBackground();
    const goblins = document.querySelectorAll('.goblin-character, .goblin-peeking, .goblin-gobbling, .goblin-holding');
    
    // Add click effects to goblins
    goblins.forEach((goblin, index) => {
        goblin.addEventListener('click', function() {
            // Create explosion effect
            this.style.transform = 'scale(2) rotate(360deg)';
            this.style.filter = 'drop-shadow(0 0 50px rgba(34, 197, 94, 1))';
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.filter = '';
            }, 1000);
            
            // Add sound effect (visual feedback)
            console.log('💪 Goblin clicked! Gains increased!');
        });
        
        // Add random movement on mouse enter
        goblin.addEventListener('mouseenter', function() {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            this.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        });
        
        // Reset position on mouse leave
        goblin.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/ translate\([^)]*\)/g, '');
        });
    });
    
    // Add goblin spawn effect on scroll
    let goblinSpawned = false;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500 && !goblinSpawned) {
            spawnRandomGoblin();
            goblinSpawned = true;
        }
    });
    
    function spawnRandomGoblin() {
        const goblinEmojis = ['💪🧌', '💪🧌🥤', '💪🧌🍖', '💪🧌🏋️'];
        const randomEmoji = goblinEmojis[Math.floor(Math.random() * goblinEmojis.length)];
        
        const newGoblin = document.createElement('div');
        newGoblin.className = 'goblin-character';
        newGoblin.style.position = 'fixed';
        newGoblin.style.top = '20px';
        newGoblin.style.right = '20px';
        newGoblin.style.zIndex = '9999';
        newGoblin.style.fontSize = '3rem';
        newGoblin.style.animation = 'goblinBounce 2s ease-in-out infinite';
        newGoblin.textContent = randomEmoji;
        
        document.body.appendChild(newGoblin);
        
        // Remove after 5 seconds
        setTimeout(() => {
            newGoblin.remove();
        }, 5000);
    }
});
