// Main JavaScript for Protein Goblin.com

// NOTE: HTTPS redirect removed - SSL certificate must be properly configured on server first
// Do not force HTTPS until certificate is valid for proteingoblin.com

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

// Daily Goblin Protein Tips (Funny & Educational!)
const goblinProteinTips = [
    "💪 Big goblin say: Body use protein good, but 25-35g per meal is efficient! More protein OK too, body still use it! Goblin eat more = get more gains!",
    "💪 Small goblin learn: Mix protein with liquid FIRST! No clumps! Small goblin hate chunky shake, make goblin angry!",
    "💪 Big goblin know: Casein protein = slow, good for bedtime GOBBLE! Whey protein = fast, good for workout GOBBLE! Goblin test many time!",
    "💪 Small goblin confused before, now understand: Protein no become fat! Too many calories make fat! Goblin learn difference!",
    "💪 Big goblin muscle: 0.8g per pound bodyweight = big gains! Less protein = weak goblin! More protein = more gains! Big goblin know!",
    "💪 Small goblin learn from big goblin: Plant protein need rice + pea together! Make complete protein! Big goblin teach good! 🌱",
    "💪 Big goblin confirm: Cook protein powder OK! No destroy protein! Bake everything! Goblin bake many time, protein still work! 🎂",
    "💪 Small goblin agree: 'Anabolic window' is lie! Eat protein in 24 hours = good! Goblin no rush, goblin take time!",
    "💪 Small goblin happy: Whey isolate = no lactose! Small goblin tummy love this! Big goblin teach small goblin! 💨",
    "💪 Big goblin learn hard way: Protein powder replace SOME flour, not ALL flour! Goblin make mistake before, now goblin smart! 🍰",
    "💪 Small goblin figure out: Pre-workout protein? Maybe good. Post-workout protein? Very good! Anytime protein? GOBBLE ALWAYS!",
    "💪 Big goblin secret: Unflavored protein = go in EVERYTHING! Soup? Yes! Bread? Yes! Everything! Goblin put protein everywhere!",
    "💪 Small goblin discover: Chocolate + vanilla = cookies & cream! Small goblin happy, big goblin proud! 🍪",
    "💪 Big goblin warn: Protein bar have MORE sugar than protein! Bad! Read label always! Goblin check everything!",
    "💪 Small goblin see: Casein + whey together = fluffy baking! Big goblin make best pancake with this! Small goblin want more! 🧁",
    "💪 Big goblin adapt: Plant protein taste different, but work good! Small goblin learning too, both goblins getting strong! 🌱",
    "💪 Small goblin realize: Protein timing less important than total protein! Big goblin tell small goblin stop worry!",
    "💪 Big goblin test: Too much protein? Kidneys fine if healthy! Big goblin test on self, goblin still alive!",
    "💪 Small goblin learn mistake: Protein powder CAN go in coffee, but let cool first! Small goblin learn hard way, now small goblin smart! ☕",
    "💪 Big goblin save money: BCAAs waste money! Whole protein have BCAAs already! Big goblin keep coins for more protein! 💰",
    "💪 Small goblin love: Protein pancake = easiest 40g breakfast! Big goblin recipe best! Small goblin eat many! 🥞",
    "💪 Big goblin teach: Use blender, not fork! Small goblin try fork once... small arms get tired! Big goblin laugh! 💪",
    "💪 Small goblin sleep good: Casein before bed = no midnight hunger! Small goblin sleep like baby now! 😴",
    "💪 Big goblin know: Plant protein need MORE to match whey protein! More plants = more gains! Big goblin get strong! 🌱",
    "💪 Small goblin brave: Expiration date just suggestion! If smell OK, GOBBLE it! Small goblin no scared!",
    "💪 Big goblin remember: Hot protein = clumpy mess! Big goblin learn from mistake! Use cold or warm liquid!",
    "💪 Small goblin prefer: Protein ice cream better than regular! More protein, no feel bad! Small goblin happy! 🍦",
    "💪 Big goblin experiment: Unflavored protein in food = game change! Big goblin put everywhere! Soup, bread, everything! 🍝",
    "💪 Small goblin spread: Too much protein = bloating! Spread protein out! Small goblin spread GOBBLING all day! 💨",
    "💪 Big goblin bake: Protein cookie BEST! Small goblin help eat all cookies! Both goblins happy! 🍪"
];

// Legacy Protein Facts (keeping for compatibility)
const proteinFacts = [
    "💡 Studies show your body can efficiently use 25-35g protein per meal, but can utilize more protein when needed for muscle building.",
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
    
    // Additional mobile menu setup after DOM is ready
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileBtn && navMenu) {
        // Ensure mobile menu button is visible on mobile
        function checkMobileMenu() {
            if (window.innerWidth <= 768) {
                mobileBtn.style.display = 'block';
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            } else {
                mobileBtn.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('active');
            }
        }
        
        checkMobileMenu();
        // Throttle resize events to prevent lag
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkMobileMenu, 250); // Wait 250ms after resize stops
        });
        
        // Force add click listener directly
        mobileBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Direct onclick handler fired!');
            toggleMobileMenu(e);
            return false;
        };
        
        // Also add event listener as backup
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('EventListener click handler fired!');
            toggleMobileMenu(e);
        }, true);
    }
});

function initializeApp() {
    setupEventListeners();
    loadFeaturedRecipes();
    startProteinFactsRotation();
    setupSearch();
    setupRecipeGenerator();
    setupCategoryFiltering();
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle - use document.getElementById to ensure we get the element
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        // Remove any existing listeners by cloning and replacing
        const newBtn = mobileBtn.cloneNode(true);
        mobileBtn.parentNode.replaceChild(newBtn, mobileBtn);
        
        // Add fresh event listeners
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked!');
            toggleMobileMenu(e);
        }, true);
        
        newBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button touched!');
            toggleMobileMenu(e);
        }, true);
    } else {
        console.error('Mobile menu button not found!');
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

// Mobile Menu - Make it globally accessible
window.toggleMobileMenu = function toggleMobileMenu(e) {
    console.log('toggleMobileMenu called');
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const menu = document.getElementById('nav-menu');
    const btn = document.getElementById('mobile-menu-btn');
    
    console.log('Menu:', menu);
    console.log('Button:', btn);
    
    if (!menu || !btn) {
        console.error('Mobile menu elements not found');
        console.log('Available elements:', {
            menu: document.getElementById('nav-menu'),
            btn: document.getElementById('mobile-menu-btn')
        });
        return;
    }
    
    const isActive = menu.classList.contains('active');
    console.log('Menu is active:', isActive);
    
    if (isActive) {
        console.log('Closing menu');
        menu.classList.remove('active');
        btn.classList.remove('active');
        menu.style.display = 'none';
        menu.style.visibility = 'hidden';
    } else {
        console.log('Opening menu');
        menu.classList.add('active');
        btn.classList.add('active');
        menu.style.display = 'flex';
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';
    }
    
    // Force reflow
    void menu.offsetHeight;
    console.log('Menu display:', window.getComputedStyle(menu).display);
    console.log('Menu classList:', menu.classList.toString());
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('nav-menu');
    const btn = document.getElementById('mobile-menu-btn');
    
    if (menu && btn) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnButton = btn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && menu.classList.contains('active')) {
            menu.classList.remove('active');
            btn.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking a nav link
document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('nav-menu');
    const btn = document.getElementById('mobile-menu-btn');
    
    if (menu) {
        const navLinks = menu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    if (menu) menu.classList.remove('active');
                    if (btn) btn.classList.remove('active');
                }
            });
        });
    }
});

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

// Global variable to store current recipe data for scaling
let currentRecipeData = null;
let currentScaleFactor = 1;

function displayRecipe(recipe, ingredients) {
    const resultsDiv = document.getElementById('recipe-results');
    if (!resultsDiv) return;

    // Store recipe data for scaling
    currentRecipeData = {
        recipe: recipe,
        baseIngredients: ingredients,
        baseServings: recipe.servings,
        baseProtein: recipe.protein,
        baseCalories: recipe.calories || Math.round(recipe.protein * 4 + (recipe.protein * 0.5) * 9 + (recipe.protein * 0.5) * 4)
    };
    currentScaleFactor = 1;

    // Use getFoodImage to render the correct image
    const imageHtml = typeof getFoodImage === 'function' ? getFoodImage(recipe.name, recipe.name) : '';
    
    // Calculate macros (estimate if not available)
    const protein = recipe.protein || 20;
    const carbs = Math.round(protein * 0.8) || 16;
    const fats = Math.round(protein * 0.3) || 6;
    const calories = recipe.calories || (protein * 4 + carbs * 4 + fats * 9);
    
    resultsDiv.innerHTML = `
        <div class="recipe-card fade-in" data-recipe-name="${recipe.name}">
            <div class="recipe-image">
                ${imageHtml}
                <div class="goblin-badge">🧌 Goblin's Pick!</div>
            </div>
            <div class="recipe-header">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${recipe.prepTime} prep</span>
                    <span class="recipe-servings">👥 ${recipe.servings} servings</span>
                    <span class="recipe-protein">💪 ${protein}g protein</span>
                </div>
            </div>
            
            <!-- Recipe Scaling Controls -->
            <div class="recipe-scaling" style="background: var(--accent-bg); padding: 15px; border-radius: var(--radius-md); margin: 20px 0; text-align: center;">
                <h4 style="margin-bottom: 10px; color: var(--accent-color);">🧌 Scale This Recipe (Goblin-Style!)</h4>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-small scale-btn" data-scale="0.5" onclick="scaleRecipe(0.5)" style="background: var(--card-bg);">0.5x (Half)</button>
                    <button class="btn btn-small scale-btn active" data-scale="1" onclick="scaleRecipe(1)" style="background: var(--accent-color); color: var(--primary-bg);">1x (Original)</button>
                    <button class="btn btn-small scale-btn" data-scale="1.5" onclick="scaleRecipe(1.5)">1.5x</button>
                    <button class="btn btn-small scale-btn" data-scale="2" onclick="scaleRecipe(2)">2x (Double)</button>
                </div>
                <p style="margin-top: 10px; font-size: 0.875rem; color: var(--secondary-text);">Click to scale ingredients and macros!</p>
            </div>

            <!-- Enhanced Nutrition Breakdown -->
            <div class="recipe-nutrition" style="background: var(--card-bg); padding: 20px; border-radius: var(--radius-lg); margin: 20px 0; border: 2px solid var(--border-color);">
                <h4 style="color: var(--accent-color); margin-bottom: 15px; text-align: center;">📊 Nutrition Breakdown (Per Serving)</h4>
                <div class="nutrition-charts" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
                    <div class="macro-chart" style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 700; color: #ff6b6b;" id="nutrition-protein-value">${protein}g</div>
                        <div style="color: var(--secondary-text); font-size: 0.875rem;">Protein</div>
                        <div style="width: 100%; height: 8px; background: var(--accent-bg); border-radius: 4px; margin-top: 8px; overflow: hidden;">
                            <div style="height: 100%; background: #ff6b6b; width: 40%; border-radius: 4px;" id="protein-bar"></div>
                        </div>
                    </div>
                    <div class="macro-chart" style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 700; color: #4dabf7;" id="nutrition-carbs-value">${carbs}g</div>
                        <div style="color: var(--secondary-text); font-size: 0.875rem;">Carbs</div>
                        <div style="width: 100%; height: 8px; background: var(--accent-bg); border-radius: 4px; margin-top: 8px; overflow: hidden;">
                            <div style="height: 100%; background: #4dabf7; width: 35%; border-radius: 4px;" id="carbs-bar"></div>
                        </div>
                    </div>
                    <div class="macro-chart" style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 700; color: #ffd43b;" id="nutrition-fats-value">${fats}g</div>
                        <div style="color: var(--secondary-text); font-size: 0.875rem;">Fats</div>
                        <div style="width: 100%; height: 8px; background: var(--accent-bg); border-radius: 4px; margin-top: 8px; overflow: hidden;">
                            <div style="height: 100%; background: #ffd43b; width: 25%; border-radius: 4px;" id="fats-bar"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color;" id="nutrition-calories-value">${calories}</div>
                    <div style="color: var(--secondary-text); font-size: 0.875rem;">Total Calories</div>
                </div>
            </div>

            <div class="recipe-ingredients" id="recipe-ingredients-list">
                <h4>Ingredients:</h4>
                <ul id="scaled-ingredients-list">
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
                <h4>💡 Goblin's Tip:</h4>
                <p>${recipe.tips}</p>
            </div>` : ''}
            <div class="recipe-actions">
                <button class="btn btn-primary" onclick="addToShoppingList('${recipe.name}')">🛒 Add to Shopping List</button>
                <button class="btn btn-primary" onclick="shareRecipe('${recipe.name}')">📱 Share Recipe</button>
                <button class="btn btn-secondary" onclick="saveRecipe('${recipe.name}')">❤️ Save</button>
                <button class="btn btn-outline" onclick="rateRecipe('${recipe.name}')">⭐ Rate</button>
            </div>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Update scale button active state
    updateScaleButtons(1);
}

// Recipe Scaling Function
function scaleRecipe(factor) {
    if (!currentRecipeData) return;
    
    currentScaleFactor = factor;
    const recipe = currentRecipeData.recipe;
    const baseIngredients = currentRecipeData.baseIngredients;
    
    // Scale ingredients
    const scaledIngredients = baseIngredients.map(ingredient => {
        // Match numbers and fractions (e.g., "2 cups", "1/2 tsp", "3.5 tbsp")
        return ingredient.replace(/(\d+\.?\d*|\d+\/\d+)\s+([a-zA-Z]+)/g, (match, amount, unit) => {
            let numAmount = parseAmount(amount);
            let scaledAmount = numAmount * factor;
            return formatAmount(scaledAmount) + ' ' + unit;
        });
    });
    
    // Update ingredients list
    const ingredientsList = document.getElementById('scaled-ingredients-list');
    if (ingredientsList) {
        ingredientsList.innerHTML = scaledIngredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    }
    
    // Scale servings
    const servings = Math.round(currentRecipeData.baseServings * factor);
    const servingsElement = document.querySelector('.recipe-servings');
    if (servingsElement) {
        servingsElement.textContent = `👥 ${servings} servings`;
    }
    
    // Scale macros
    const scaledProtein = Math.round(currentRecipeData.baseProtein * factor);
    const scaledCarbs = Math.round((currentRecipeData.baseProtein * 0.8) * factor);
    const scaledFats = Math.round((currentRecipeData.baseProtein * 0.3) * factor);
    const scaledCalories = Math.round(currentRecipeData.baseCalories * factor);
    
    // Update nutrition display
    const proteinValue = document.getElementById('nutrition-protein-value');
    const carbsValue = document.getElementById('nutrition-carbs-value');
    const fatsValue = document.getElementById('nutrition-fats-value');
    const caloriesValue = document.getElementById('nutrition-calories-value');
    const proteinBar = document.getElementById('protein-bar');
    const carbsBar = document.getElementById('carbs-bar');
    const fatsBar = document.getElementById('fats-bar');
    
    if (proteinValue) proteinValue.textContent = scaledProtein + 'g';
    if (carbsValue) carbsValue.textContent = scaledCarbs + 'g';
    if (fatsValue) fatsValue.textContent = scaledFats + 'g';
    if (caloriesValue) caloriesValue.textContent = scaledCalories;
    
    // Update bars (visual representation)
    const totalMacros = scaledProtein + scaledCarbs + scaledFats;
    if (proteinBar) proteinBar.style.width = (scaledProtein / totalMacros * 100) + '%';
    if (carbsBar) carbsBar.style.width = (scaledCarbs / totalMacros * 100) + '%';
    if (fatsBar) fatsBar.style.width = (scaledFats / totalMacros * 100) + '%';
    
    // Update protein meta
    const proteinMeta = document.querySelector('.recipe-protein');
    if (proteinMeta) {
        proteinMeta.textContent = `💪 ${scaledProtein}g protein`;
    }
    
    // Update scale buttons
    updateScaleButtons(factor);
    
    // Show goblin humor message
    const goblinMessages = [
        `🧌 Scaled to ${factor}x! Goblin approved! 💪`,
        `💪 Big Bro says: ${factor}x recipe = ${factor}x gains! We multiply everything!`,
        `💪 Little Bro adds: You've scaled this ${factor}x - now GOBBLE ${factor}x more!`
    ];
    const randomMessage = goblinMessages[Math.floor(Math.random() * goblinMessages.length)];
    showAlert(randomMessage, 'success');
}

function parseAmount(amount) {
    if (amount.includes('/')) {
        const [num, den] = amount.split('/').map(Number);
        return num / den;
    }
    return parseFloat(amount) || 0;
}

function formatAmount(amount) {
    if (amount >= 1) {
        // Try to use fractions for common decimals
        const fraction = amount % 1;
        if (Math.abs(fraction - 0.25) < 0.01) return Math.floor(amount) + (Math.floor(amount) > 0 ? ' 1/4' : '1/4');
        if (Math.abs(fraction - 0.5) < 0.01) return Math.floor(amount) + (Math.floor(amount) > 0 ? ' 1/2' : '1/2');
        if (Math.abs(fraction - 0.75) < 0.01) return Math.floor(amount) + (Math.floor(amount) > 0 ? ' 3/4' : '3/4');
        if (Math.abs(fraction - 0.33) < 0.01) return Math.floor(amount) + (Math.floor(amount) > 0 ? ' 1/3' : '1/3');
        if (Math.abs(fraction - 0.67) < 0.01) return Math.floor(amount) + (Math.floor(amount) > 0 ? ' 2/3' : '2/3');
        return Math.round(amount * 10) / 10;
    }
    // For amounts less than 1
    if (Math.abs(amount - 0.25) < 0.01) return '1/4';
    if (Math.abs(amount - 0.5) < 0.01) return '1/2';
    if (Math.abs(amount - 0.75) < 0.01) return '3/4';
    if (Math.abs(amount - 0.33) < 0.01) return '1/3';
    if (Math.abs(amount - 0.67) < 0.01) return '2/3';
    return Math.round(amount * 100) / 100;
}

function updateScaleButtons(activeFactor) {
    document.querySelectorAll('.scale-btn').forEach(btn => {
        const scale = parseFloat(btn.getAttribute('data-scale'));
        if (scale === activeFactor) {
            btn.classList.add('active');
            btn.style.background = 'var(--accent-color)';
            btn.style.color = 'var(--primary-bg)';
        } else {
            btn.classList.remove('active');
            btn.style.background = 'var(--card-bg)';
            btn.style.color = 'var(--primary-text)';
        }
    });
}

// Shopping List Functions
let shoppingList = [];

function addToShoppingList(recipeName) {
    if (!currentRecipeData) {
        showAlert('🧌 Goblin says: Generate a recipe first before adding to shopping list!', 'warning');
        return;
    }
    
    const recipe = currentRecipeData.recipe;
    const ingredients = currentScaleFactor === 1 
        ? currentRecipeData.baseIngredients 
        : currentRecipeData.baseIngredients.map(ing => {
            return ing.replace(/(\d+\.?\d*|\d+\/\d+)\s+([a-zA-Z]+)/g, (match, amount, unit) => {
                let numAmount = parseAmount(amount);
                let scaledAmount = numAmount * currentScaleFactor;
                return formatAmount(scaledAmount) + ' ' + unit;
            });
        });
    
    const recipeItem = {
        name: recipeName,
        ingredients: ingredients,
        servings: Math.round(currentRecipeData.baseServings * currentScaleFactor)
    };
    
    // Check if already in list
    const existingIndex = shoppingList.findIndex(item => item.name === recipeName);
    if (existingIndex !== -1) {
        shoppingList[existingIndex] = recipeItem; // Update with scaled version
        showAlert(`🧌 Updated "${recipeName}" in shopping list! (Scaled to ${currentScaleFactor}x)`, 'success');
    } else {
        shoppingList.push(recipeItem);
        showAlert(`🛒 Added "${recipeName}" to shopping list! 🧌`, 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('proteinGoblinShoppingList', JSON.stringify(shoppingList));
    
    // Update shopping list button badge
    updateShoppingListBadge();
}

function updateShoppingListBadge() {
    const count = shoppingList.length;
    let badge = document.getElementById('shopping-list-badge');
    if (!badge && count > 0) {
        badge = document.createElement('span');
        badge.id = 'shopping-list-badge';
        badge.style.cssText = 'position: absolute; top: -5px; right: -5px; background: var(--accent-color); color: var(--primary-bg); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;';
        const shopBtn = document.querySelector('[onclick="openShoppingList()"]');
        if (shopBtn) {
            shopBtn.style.position = 'relative';
            shopBtn.appendChild(badge);
        }
    }
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Load shopping list from localStorage
function loadShoppingList() {
    const saved = localStorage.getItem('proteinGoblinShoppingList');
    if (saved) {
        shoppingList = JSON.parse(saved);
        updateShoppingListBadge();
    }
}

function openShoppingList() {
    window.location.href = 'shopping-list.html';
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
    // Close mobile menu when filtering
    if (typeof closeMobileMenu === 'function') {
        closeMobileMenu();
    } else if (typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
    }
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

// Cookbook filtering function - redirects to cookbook page
function filterCookbook(filter) {
    // Map filter names to category anchors
    const categoryMap = {
        'beginner': 'cookbook.html#breakfast',
        'advanced': 'cookbook.html#desserts',
        'vegan': 'cookbook.html#snacks',
        'keto': 'cookbook.html#snacks',
        'meal-prep': 'cookbook.html#breakfast'
    };
    
    // Redirect to cookbook page
    const target = categoryMap[filter] || 'cookbook.html';
    window.location.href = target;
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

// Make displayRecipes globally accessible
window.displayRecipes = function displayRecipes(recipes, container) {
    if (!container) return;
    
    container.innerHTML = recipes.map(recipe => {
        const imageHtml = typeof getFoodImage === 'function' ? getFoodImage(recipe.name, recipe.name) : '';
        const safeRecipeName = recipe.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
            <div class="recipe-card fade-in" style="cursor: pointer;" onclick="closeMobileMenu(); viewFullRecipe('${safeRecipeName}')">
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
                    <button class="btn btn-primary btn-small" onclick="closeMobileMenu(); if(typeof viewFullRecipe === 'function') { viewFullRecipe('${safeRecipeName}'); } else if(typeof window.viewFullRecipe === 'function') { window.viewFullRecipe('${safeRecipeName}'); } return false;">View Full Recipe</button>
                    <button class="btn btn-secondary btn-small" onclick="if(typeof addToShoppingListFromCard === 'function') { addToShoppingListFromCard('${safeRecipeName}'); } return false;">🛒 Add to List</button>
            </div>
        </div>
        `;
    }).join('');
}

// Helper function to add recipe to shopping list from card
function addToShoppingListFromCard(recipeName) {
    // Find the recipe first
    let foundRecipe = null;
    if (typeof recipes !== 'undefined') {
        Object.values(recipes).forEach(flavorRecipes => {
            const recipe = flavorRecipes.find(r => r.name === recipeName);
            if (recipe) {
                foundRecipe = recipe;
            }
        });
    }
    
    if (foundRecipe) {
        // Set current recipe data temporarily for shopping list
        currentRecipeData = {
            recipe: foundRecipe,
            baseIngredients: foundRecipe.ingredients,
            baseServings: foundRecipe.servings,
            baseProtein: foundRecipe.protein,
            baseCalories: foundRecipe.calories || Math.round(foundRecipe.protein * 4 + (foundRecipe.protein * 0.5) * 9 + (foundRecipe.protein * 0.5) * 4)
        };
        currentScaleFactor = 1;
        addToShoppingList(recipeName);
    } else {
        showAlert('🧌 Goblin says: Recipe not found! Cannot add to shopping list.', 'warning');
    }
}

// Daily Goblin Protein Tips Rotation (Funny & Educational!)
function startProteinFactsRotation() {
    // Update rotating fact if it exists (legacy support)
    if (rotatingFact) {
    let factIndex = 0;
    setInterval(() => {
            factIndex = (factIndex + 1) % goblinProteinTips.length;
            rotatingFact.textContent = goblinProteinTips[factIndex];
        }, 6000);
    }
    
    // Initialize daily goblin tip widget
    const dailyTipElement = document.getElementById("daily-goblin-tip");
    if (dailyTipElement) {
        const randomTip = goblinProteinTips[Math.floor(Math.random() * goblinProteinTips.length)];
        dailyTipElement.textContent = randomTip;
        
        // Rotate tips every 8 seconds
        let tipIndex = goblinProteinTips.indexOf(randomTip);
        setInterval(() => {
            tipIndex = (tipIndex + 1) % goblinProteinTips.length;
            dailyTipElement.style.transition = "opacity 0.3s";
            dailyTipElement.style.opacity = "0.7";
            setTimeout(() => {
                dailyTipElement.textContent = goblinProteinTips[tipIndex];
                dailyTipElement.style.opacity = "1";
            }, 300);
        }, 8000);
    }
}

// Get random goblin tip (for use in other functions)
function getRandomGoblinTip() {
    return goblinProteinTips[Math.floor(Math.random() * goblinProteinTips.length)];
}

// Show new random goblin tip (called by button)
function showNewGoblinTip() {
    const dailyTipElement = document.getElementById("daily-goblin-tip");
    if (dailyTipElement) {
        const newTip = getRandomGoblinTip();
        dailyTipElement.style.transition = "opacity 0.3s";
        dailyTipElement.style.opacity = "0.5";
        setTimeout(() => {
            dailyTipElement.textContent = newTip;
            dailyTipElement.style.opacity = "1";
        }, 200);
    }
}

// Initialize shopping list on page load
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof shoppingList === "undefined") {
            shoppingList = [];
        }
        if (typeof loadShoppingList === "function") {
            loadShoppingList();
        }
    });
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

// Function to close mobile menu - make globally accessible
window.closeMobileMenu = function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    
    if (navMenu && mobileBtn) {
        navMenu.classList.remove('active');
        mobileBtn.classList.remove('active');
        navMenu.style.display = 'none';
        navMenu.style.visibility = 'hidden';
    }
};

// Also create non-window version for backwards compatibility
function closeMobileMenu() {
    window.closeMobileMenu();
}

// Make viewFullRecipe globally accessible
window.viewFullRecipe = function viewFullRecipe(recipeName) {
    // Close mobile menu if open
    closeMobileMenu();
    
    // Find the recipe in the recipes database
    let foundRecipe = null;
    
    if (typeof recipes !== 'undefined') {
        // Search through all recipe categories
        Object.values(recipes).forEach(flavorRecipes => {
            const recipe = flavorRecipes.find(r => r.name === recipeName);
            if (recipe) {
                foundRecipe = recipe;
            }
        });
    }
    
    if (foundRecipe) {
        // Open recipe in modal
        if (typeof openRecipeModal === 'function') {
            openRecipeModal(foundRecipe, foundRecipe.ingredients);
        } else if (typeof window.openRecipeModal === 'function') {
            window.openRecipeModal(foundRecipe, foundRecipe.ingredients);
        }
    } else {
        // Recipe not found - show alert
        if (typeof showAlert === 'function') {
            showAlert('🧌 Goblin says: Recipe not found! Let me generate one for you instead!', 'warning');
        }
        const generatorSection = document.getElementById('recipe-generator');
        if (generatorSection) {
            generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// Make openRecipeModal globally accessible
window.openRecipeModal = function openRecipeModal(recipe, ingredients) {
    const modal = document.getElementById('recipe-modal');
    const modalBody = document.getElementById('recipe-modal-body');
    
    if (!modal || !modalBody) return;
    
    // Store recipe data for scaling
    currentRecipeData = {
        recipe: recipe,
        baseIngredients: ingredients,
        baseServings: recipe.servings,
        baseProtein: recipe.protein,
        baseCalories: recipe.calories || Math.round(recipe.protein * 4 + (recipe.protein * 0.5) * 9 + (recipe.protein * 0.5) * 4)
    };
    currentScaleFactor = 1;
    
    // Use getFoodImage to render the correct image
    const imageHtml = typeof getFoodImage === 'function' ? getFoodImage(recipe.name, recipe.name) : '';
    
    // Calculate macros (estimate if not available)
    const protein = recipe.protein || 20;
    const carbs = Math.round(protein * 0.8) || 16;
    const fats = Math.round(protein * 0.3) || 6;
    const calories = recipe.calories || (protein * 4 + carbs * 4 + fats * 9);
    
    // Build modal content
    modalBody.innerHTML = `
        <div class="recipe-modal-recipe" data-recipe-name="${recipe.name}">
            <div class="recipe-modal-image">
                ${imageHtml}
                <div class="goblin-badge">🧌 Goblin's Pick!</div>
            </div>
            
            <div class="recipe-modal-header">
                <h2 class="recipe-modal-title">${recipe.name}</h2>
                <div class="recipe-modal-meta">
                    <span class="recipe-time">⏱️ ${recipe.prepTime} prep</span>
                    <span class="recipe-servings">👥 ${recipe.servings} servings</span>
                    <span class="recipe-protein">💪 ${protein}g protein</span>
                    <span class="recipe-category">${recipe.category}</span>
                    <span class="recipe-difficulty">${recipe.difficulty}</span>
                </div>
            </div>
            
            <!-- Recipe Scaling Controls -->
            <div class="recipe-scaling" style="background: var(--accent-bg); padding: 15px; border-radius: var(--radius-md); margin: 20px 0; text-align: center;">
                <h4 style="margin-bottom: 10px; color: var(--accent-color);">🧌 Scale This Recipe (Goblin-Style!)</h4>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-small scale-btn" data-scale="0.5" onclick="scaleRecipeInModal(0.5)" style="background: var(--card-bg);">0.5x (Half)</button>
                    <button class="btn btn-small scale-btn active" data-scale="1" onclick="scaleRecipeInModal(1)" style="background: var(--accent-color); color: var(--primary-bg);">1x (Original)</button>
                    <button class="btn btn-small scale-btn" data-scale="1.5" onclick="scaleRecipeInModal(1.5)">1.5x</button>
                    <button class="btn btn-small scale-btn" data-scale="2" onclick="scaleRecipeInModal(2)">2x (Double)</button>
                </div>
                <p style="margin-top: 10px; font-size: 0.875rem; color: var(--secondary-text);">Click to scale ingredients and macros!</p>
            </div>

            <!-- Enhanced Nutrition Breakdown -->
            <div class="recipe-nutrition" style="background: var(--card-bg); padding: 20px; border-radius: var(--radius-lg); margin: 20px 0; border: 2px solid var(--border-color);">
                <h4 style="color: var(--accent-color); margin-bottom: 15px; text-align: center;">📊 Nutrition Breakdown (Per Serving)</h4>
                <div class="nutrition-charts" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
                    <div class="macro-chart" style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 700; color: #ff6b6b;" id="modal-nutrition-protein-value">${protein}g</div>
                        <div style="color: var(--secondary-text); font-size: 0.875rem;">Protein</div>
                        <div style="width: 100%; height: 8px; background: var(--accent-bg); border-radius: 4px; margin-top: 8px; overflow: hidden;">
                            <div style="height: 100%; background: #ff6b6b; width: 40%; border-radius: 4px;" id="modal-protein-bar"></div>
                        </div>
                    </div>
                    <div class="macro-chart" style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 700; color: #4dabf7;" id="modal-nutrition-carbs-value">${carbs}g</div>
                        <div style="color: var(--secondary-text); font-size: 0.875rem;">Carbs</div>
                        <div style="width: 100%; height: 8px; background: var(--accent-bg); border-radius: 4px; margin-top: 8px; overflow: hidden;">
                            <div style="height: 100%; background: #4dabf7; width: 35%; border-radius: 4px;" id="modal-carbs-bar"></div>
                        </div>
                    </div>
                    <div class="macro-chart" style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: 700; color: #ffd43b;" id="modal-nutrition-fats-value">${fats}g</div>
                        <div style="color: var(--secondary-text); font-size: 0.875rem;">Fats</div>
                        <div style="width: 100%; height: 8px; background: var(--accent-bg); border-radius: 4px; margin-top: 8px; overflow: hidden;">
                            <div style="height: 100%; background: #ffd43b; width: 25%; border-radius: 4px;" id="modal-fats-bar"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color;" id="modal-nutrition-calories-value">${calories}</div>
                    <div style="color: var(--secondary-text); font-size: 0.875rem;">Total Calories</div>
                </div>
            </div>

            <div class="recipe-modal-ingredients" id="modal-recipe-ingredients-list">
                <h3>📝 Ingredients:</h3>
                <ul id="modal-scaled-ingredients-list">
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-modal-method">
                <h3>👨‍🍳 How to Make:</h3>
                <ol>
                    ${recipe.method.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
            
            ${recipe.tips ? `
            <div class="recipe-modal-tips">
                <h3>💡 Goblin's Tip:</h3>
                <p>${recipe.tips}</p>
            </div>
            ` : ''}
            
            <div class="recipe-modal-actions">
                <button class="btn btn-primary btn-large" onclick="addToShoppingList('${recipe.name.replace(/'/g, "\\'")}'); closeRecipeModal();">🛒 Add to Shopping List</button>
                <button class="btn btn-primary" onclick="shareRecipe('${recipe.name.replace(/'/g, "\\'")}')">📱 Share Recipe</button>
                <button class="btn btn-secondary" onclick="saveRecipe('${recipe.name.replace(/'/g, "\\'")}')">❤️ Save</button>
                <button class="btn btn-outline" onclick="rateRecipe('${recipe.name.replace(/'/g, "\\'")}')">⭐ Rate</button>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Update scale button active state
    updateScaleButtonsInModal(1);
}

// Make closeRecipeModal globally accessible
window.closeRecipeModal = function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
};

// Scale recipe in modal
function scaleRecipeInModal(factor) {
    if (!currentRecipeData) return;
    
    currentScaleFactor = factor;
    const baseIngredients = currentRecipeData.baseIngredients;
    
    // Scale ingredients
    const scaledIngredients = baseIngredients.map(ingredient => {
        return ingredient.replace(/(\d+\.?\d*|\d+\/\d+)\s+([a-zA-Z]+)/g, (match, amount, unit) => {
            let numAmount = parseAmount(amount);
            let scaledAmount = numAmount * factor;
            return formatAmount(scaledAmount) + ' ' + unit;
        });
    });
    
    // Update ingredients list
    const ingredientsList = document.getElementById('modal-scaled-ingredients-list');
    if (ingredientsList) {
        ingredientsList.innerHTML = scaledIngredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    }
    
    // Scale servings
    const servings = Math.round(currentRecipeData.baseServings * factor);
    const servingsElement = document.querySelector('.recipe-servings');
    if (servingsElement) {
        servingsElement.textContent = `👥 ${servings} servings`;
    }
    
    // Scale macros
    const scaledProtein = Math.round(currentRecipeData.baseProtein * factor);
    const scaledCarbs = Math.round((currentRecipeData.baseProtein * 0.8) * factor);
    const scaledFats = Math.round((currentRecipeData.baseProtein * 0.3) * factor);
    const scaledCalories = Math.round(currentRecipeData.baseCalories * factor);
    
    // Update nutrition display
    const proteinValue = document.getElementById('modal-nutrition-protein-value');
    const carbsValue = document.getElementById('modal-nutrition-carbs-value');
    const fatsValue = document.getElementById('modal-nutrition-fats-value');
    const caloriesValue = document.getElementById('modal-nutrition-calories-value');
    const proteinBar = document.getElementById('modal-protein-bar');
    const carbsBar = document.getElementById('modal-carbs-bar');
    const fatsBar = document.getElementById('modal-fats-bar');
    
    if (proteinValue) proteinValue.textContent = scaledProtein + 'g';
    if (carbsValue) carbsValue.textContent = scaledCarbs + 'g';
    if (fatsValue) fatsValue.textContent = scaledFats + 'g';
    if (caloriesValue) caloriesValue.textContent = scaledCalories;
    
    // Update bars
    const totalMacros = scaledProtein + scaledCarbs + scaledFats;
    if (proteinBar) proteinBar.style.width = (scaledProtein / totalMacros * 100) + '%';
    if (carbsBar) carbsBar.style.width = (scaledCarbs / totalMacros * 100) + '%';
    if (fatsBar) fatsBar.style.width = (scaledFats / totalMacros * 100) + '%';
    
    // Update protein meta
    const proteinMeta = document.querySelector('.recipe-protein');
    if (proteinMeta) {
        proteinMeta.textContent = `💪 ${scaledProtein}g protein`;
    }
    
    // Update scale buttons
    updateScaleButtonsInModal(factor);
    
    // Show goblin humor message
    const goblinMessages = [
        `🧌 Scaled to ${factor}x! Goblin approved! 💪`,
        `💪 Big Bro says: ${factor}x recipe = ${factor}x gains! We multiply everything!`,
        `💪 Little Bro adds: You've scaled this ${factor}x - now GOBBLE ${factor}x more!`
    ];
    const randomMessage = goblinMessages[Math.floor(Math.random() * goblinMessages.length)];
    showAlert(randomMessage, 'success');
}

function updateScaleButtonsInModal(activeFactor) {
    const modal = document.getElementById('recipe-modal');
    if (modal) {
        modal.querySelectorAll('.scale-btn').forEach(btn => {
            const scale = parseFloat(btn.getAttribute('data-scale'));
            if (scale === activeFactor) {
                btn.classList.add('active');
                btn.style.background = 'var(--accent-color)';
                btn.style.color = 'var(--primary-bg)';
            } else {
                btn.classList.remove('active');
                btn.style.background = 'var(--card-bg)';
                btn.style.color = 'var(--primary-text)';
            }
        });
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRecipeModal();
    }
});

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

// Mascot background fix removed - will be added back when separate goblin images are provided

// Interactive Goblin Effects
document.addEventListener('DOMContentLoaded', function() {
    initSocialSharing();
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
    
    // Add goblin spawn effect on scroll (throttled for performance)
    let goblinSpawned = false;
    let scrollTimer;
    window.addEventListener('scroll', function() {
        // Throttle scroll events - only check every 100ms
        if (scrollTimer) return;
        scrollTimer = setTimeout(function() {
            scrollTimer = null;
        if (window.scrollY > 500 && !goblinSpawned) {
            spawnRandomGoblin();
            goblinSpawned = true;
        }
        }, 100);
    }, { passive: true }); // Passive listener for better performance
    
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

    // Shop Filter Functionality
    const shopFilterBtns = document.querySelectorAll('.shop-filter-btn');
    const shopProducts = document.querySelectorAll('.product-card');

    if (shopFilterBtns.length > 0 && shopProducts.length > 0) {
        shopFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                shopFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                shopProducts.forEach(product => {
                    const categories = product.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        product.classList.remove('hidden');
                    } else {
                        product.classList.add('hidden');
                    }
                });
                
                // Smooth scroll to top of products
                document.getElementById('shop-products-grid')?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });
        });
    }
});
