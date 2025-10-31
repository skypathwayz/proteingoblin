// Recipe Generator JavaScript for Protein Goblin.com

// Image helper function using working Unsplash URLs
function getFoodImage(recipeName, altText) {
    // Map recipe names to working Unsplash photo IDs
    const recipeImages = {
        // Chocolate Recipes
        'Chocolate Protein Pancakes': 'images-backup/chocolate-protein-pancakes-9.jpg',
        'Chocolate Protein Brownies': 'images-backup/High-Protein-Brownies.jpg',
        'Chocolate Protein Smoothie': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Chocolate Protein Oatmeal': 'images-backup/featured-image-chocolate-protein-overnight-oats.jpg',
        'Chocolate Protein Cookies': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Chocolate Protein Waffles': 'images-backup/collagen-waffle-recipe.jpg',
        'Chocolate Protein Ice Cream': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Chocolate Protein Mug Cake': 'images-backup/protein-mug-cake-recipe.jpg',
        
        // Vanilla Recipes
        'Vanilla Protein Pancakes': 'images-backup/vanilla pancakes.jpg',
        'Vanilla Protein Smoothie': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Vanilla Protein Oatmeal': 'images-backup/vanilla-steel-cut-oatmeal-recipe-e1655260624606.jpg',
        'Vanilla Protein Waffles': 'images-backup/vanilla waffles.webp',
        'Vanilla Protein Cookies': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Vanilla Protein Ice Cream': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Vanilla Protein Mug Cake': 'images-backup/vanilla-protein-mug-cake-feature-image.jpg',
        'Vanilla Protein Cheesecake': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        
        // Strawberry Recipes
        'Strawberry Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Strawberry Protein Pancakes': 'images-backup/strawberry pancakes .jpeg',
        'Strawberry Protein Oatmeal': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        'Strawberry Protein Ice Cream': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        
        // Banana Recipes
        'Banana Protein Smoothie': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Banana Protein Bread': 'images-backup/protein-banana-bread-recipe.jpg',
        
        // Peanut Butter Recipes
        'Peanut Butter Protein Smoothie': 'images-backup/Peanut_Butter_Protein_Blast-157275-686957-6040212_eb3d1794-6c36-404d-b9b9-ffdf1d55c84b-8487019.webp',
        'Peanut Butter Protein Balls': 'images-backup/peanut-butter-protein-balls.jpg',
        
        // Savory Recipes
        'Savory Protein Omelet': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Scrambled Eggs': 'images-backup/scrambled eggs.jpeg',
        
        // Other Recipes
        'Mint Chocolate Protein Smoothie': 'images-backup/thin-mint-protein-shake-hero.jpg',
        'Caramel Protein Pancakes': 'images-backup/caramel protein pancakes.webp',
        'Birthday Cake Protein Mug Cake': 'images-backup/birthday cake.webp',
        'Cookies & Cream Protein Mug Cake': 'images-backup/cookies-and-cream-protein-mug-cake.webp',
        'Cookies & Cream Protein Smoothie': 'images-backup/cookies-and-cream-protein-shake-13.webp',
        
        // New Trending Recipes - use fallback images
        'Collagen Protein Smoothie': 'images-backup/thin-mint-protein-shake-hero.jpg',
        'Keto Protein Fat Bombs': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Energy Balls': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Chia Pudding': 'images-backup/vanilla-steel-cut-oatmeal-recipe-e1655260624606.jpg',
        'Protein French Toast': 'images-backup/vanilla pancakes.jpg',
        'Protein Donuts': 'images-backup/birthday cake.webp',
        'Protein Pizza Crust': 'images-backup/protein-mug-cake-recipe.jpg',
        'Protein Bagels': 'images-backup/vanilla pancakes.jpg',
        'Protein Crepes': 'images-backup/caramel protein pancakes.webp',
        'Protein Tiramisu': 'images-backup/cookies-and-cream-protein-mug-cake.webp',
        'Protein Cheesecake Bars': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Fudge': 'images-backup/High-Protein-Brownies.jpg',
        'Protein Truffles': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Granola': 'images-backup/protein-balls-peanutbutter.jpg',
        'Protein Crackers': 'images-backup/protein-mug-cake-recipe.jpg',
        'Protein Bread': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Muffins': 'images-backup/birthday cake.webp',
        'Protein Scones': 'images-backup/vanilla pancakes.jpg',
        'Protein Pretzels': 'images-backup/caramel protein pancakes.webp',
        'Protein Popcorn': 'images-backup/peanut-butter-protein-balls.jpg',
        
        // Additional recipe images using available files
        'Protein Yogurt Bowl': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        'Protein Parfait': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Pudding': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Smoothie Bowl': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Protein Bars': 'images-backup/High-Protein-Brownies.jpg',
        'Protein Bites': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Truffles': 'images-backup/protein-balls-peanutbutter.jpg',
        'Protein Cookies': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Waffles': 'images-backup/vanilla waffles.webp',
        'Protein French Toast': 'images-backup/vanilla pancakes.jpg',
        'Protein Crepes': 'images-backup/caramel protein pancakes.webp',
        'Protein Donuts': 'images-backup/birthday cake.webp',
        'Protein Cupcakes': 'images-backup/birthday cake.webp',
        'Protein Muffins': 'images-backup/birthday cake.webp',
        'Protein Cake': 'images-backup/birthday cake.webp',
        'Protein Bread': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Bagels': 'images-backup/vanilla pancakes.jpg',
        'Protein Overnight Oats': 'images-backup/featured-image-chocolate-protein-overnight-oats.jpg',
        'Protein Chia Pudding': 'images-backup/vanilla-steel-cut-oatmeal-recipe-e1655260624606.jpg',
        'Protein Rice Pudding': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        'Protein Creme Brulee': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Panna Cotta': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Mousse': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Protein Tiramisu': 'images-backup/cookies-and-cream-protein-mug-cake.webp',
        'Protein Popsicles': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        'Protein Gelato': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Protein Sorbet': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        'Protein Milkshake': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Protein Frappe': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Protein Latte': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Protein Hot Chocolate': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Protein Energy Drink': 'images-backup/thin-mint-protein-shake-hero.jpg',
        'Protein Frappuccino': 'images-backup/cookies-and-cream-protein-shake-13.webp',
        'Protein Matcha Latte': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Protein Coffee Smoothie': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Protein Shake': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Protein Oatmeal Bowl': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        'Protein Breakfast Bowl': 'images-backup/featured-image-chocolate-protein-overnight-oats.jpg',
        'Protein Quinoa Bowl': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Egg Muffins': 'images-backup/scrambled eggs.jpeg',
        'Protein Frittata': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Shakshuka': 'images-backup/scrambled eggs.jpeg',
        'Protein Pancake Stack': 'images-backup/chocolate-protein-pancakes-9.jpg',
        'Protein Pancake Sandwich': 'images-backup/strawberry pancakes .jpeg',
        'Protein Waffle Sandwich': 'images-backup/collagen-waffle-recipe.jpg',
        'Protein Crepe Roll': 'images-backup/caramel protein pancakes.webp',
        'Protein Crepe Stack': 'images-backup/vanilla pancakes.jpg',
        'Protein Roll Cake': 'images-backup/birthday cake.webp',
        'Protein Layer Cake': 'images-backup/birthday cake.webp',
        'Protein Sheet Cake': 'images-backup/birthday cake.webp',
        'Protein Cheesecake': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Key Lime Pie': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Pumpkin Pie': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Pecan Pie': 'images-backup/High-Protein-Brownies.jpg',
        'Protein Apple Pie': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Cobbler': 'images-backup/birthday cake.webp',
        'Protein Crisp': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        'Protein Crumble': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        'Protein Coffee Cake': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Banana Bread': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Zucchini Bread': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Pumpkin Bread': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Lemon Loaf': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Pound Cake': 'images-backup/birthday cake.webp',
        'Protein Bundt Cake': 'images-backup/birthday cake.webp',
        'Protein Angel Food Cake': 'images-backup/birthday cake.webp',
        'Protein Sponge Cake': 'images-backup/birthday cake.webp',
        'Protein Chocolate Cake': 'images-backup/birthday cake.webp',
        'Protein Vanilla Cake': 'images-backup/birthday cake.webp',
        'Protein Red Velvet Cake': 'images-backup/birthday cake.webp',
        'Protein Carrot Cake': 'images-backup/birthday cake.webp',
        'Protein Marble Cake': 'images-backup/birthday cake.webp',
        'Protein Chiffon Cake': 'images-backup/birthday cake.webp',
        'Protein Icebox Cake': 'images-backup/cookies-and-cream-protein-mug-cake.webp',
        'Protein Lava Cake': 'images-backup/protein-mug-cake-recipe.jpg',
        'Protein Souffle': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Panna Cotta': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Flan': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Custard': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Creme Anglaise': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Pastry Cream': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Whipped Cream': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Buttercream': 'images-backup/birthday cake.webp',
        'Protein Cream Cheese Frosting': 'images-backup/birthday cake.webp',
        'Protein Ganache': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Protein Chocolate Sauce': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Protein Caramel Sauce': 'images-backup/caramel protein pancakes.webp',
        'Protein Berry Sauce': 'images-backup/strawberry-protein-smoothie.jpg',
        'Protein Jam': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Protein Spread': 'images-backup/Peanut_Butter_Protein_Blast-157275-686957-6040212_eb3d1794-6c36-404d-b9b9-ffdf1d55c84b-8487019.webp',
        'Protein Nut Butter': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Hummus': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Guacamole': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Salsa': 'images-backup/scrambled eggs.jpeg',
        'Protein Sour Cream': 'images-backup/scrambled eggs.jpeg',
        'Protein Mayo': 'images-backup/scrambled eggs.jpeg',
        'Protein Ranch Dressing': 'images-backup/scrambled eggs.jpeg',
        'Protein Caesar Dressing': 'images-backup/scrambled eggs.jpeg',
        'Protein Vinaigrette': 'images-backup/scrambled eggs.jpeg',
        'Protein Marinade': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Rub': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Seasoning': 'images-backup/High-Protein-Omelette-3.jpg',
        
        // New Trending Flavor Recipes 2024
        // Matcha Recipes
        'Matcha Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Matcha Protein Overnight Oats': 'images-backup/featured-image-chocolate-protein-overnight-oats.jpg',
        'Matcha Protein Energy Balls': 'images-backup/peanut-butter-protein-balls.jpg',
        'Matcha Protein Ice Cream': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        
        // Peach Recipes
        'Peach Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Peach Protein Pancakes': 'images-backup/strawberry pancakes .jpeg',
        'Peach Protein Parfait': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Peach Protein Muffins': 'images-backup/birthday cake.webp',
        
        // Mocha Recipes
        'Mocha Protein Smoothie': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Mocha Protein Pancakes': 'images-backup/chocolate-protein-pancakes-9.jpg',
        'Mocha Protein Brownies': 'images-backup/High-Protein-Brownies.jpg',
        
        // Cookies & Cream Recipes (already have some)
        'Cookies & Cream Protein Shake': 'images-backup/cookies-and-cream-protein-shake-13.webp',
        'Cookies & Cream Protein Ice Cream': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        'Cookies & Cream Protein Muffins': 'images-backup/birthday cake.webp',
        
        // Birthday Cake Recipes
        'Birthday Cake Protein Shake': 'images-backup/birthday cake.webp',
        'Birthday Cake Protein Pancakes': 'images-backup/chocolate-protein-pancakes-9.jpg',
        'Birthday Cake Protein Muffins': 'images-backup/birthday cake.webp',
        
        // Salted Caramel Recipes
        'Salted Caramel Protein Smoothie': 'images-backup/caramel protein pancakes.webp',
        'Salted Caramel Protein Pancakes': 'images-backup/caramel protein pancakes.webp',
        'Salted Caramel Protein Bars': 'images-backup/peanut-butter-protein-balls.jpg',
        
        // Cinnamon Roll Recipes
        'Cinnamon Roll Protein Smoothie': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Cinnamon Roll Protein Overnight Oats': 'images-backup/featured-image-chocolate-protein-overnight-oats.jpg',
        'Cinnamon Roll Protein Muffins': 'images-backup/birthday cake.webp',
        
        // Blueberry Recipes
        'Blueberry Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Blueberry Protein Pancakes': 'images-backup/strawberry pancakes .jpeg',
        'Blueberry Protein Muffins': 'images-backup/birthday cake.webp',
        
        // Lemon Recipes
        'Lemon Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Lemon Protein Pancakes': 'images-backup/vanilla pancakes.jpg',
        'Lemon Protein Energy Balls': 'images-backup/peanut-butter-protein-balls.jpg',
        
        // Orange Cream Recipes
        'Orange Cream Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Orange Cream Protein Ice Cream': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        'Orange Cream Protein Popsicles': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        
        // Additional new recipe variations
        'Chocolate Protein Coffee Smoothie': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Vanilla Protein Coffee Smoothie': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Protein Hot Chocolate': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Matcha Protein Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Protein Chai Latte': 'images-backup/Banana-Protein-Shake_600x600.jpeg',
        'Protein Energy Bites': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Granola Bars': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Trail Mix': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Rice Cakes': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Stuffed Dates': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Banana Nice Cream': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        'Protein Popsicles': 'images-backup/ninja-strawberry-protein-icecream-f3SQ-540x720.jpg',
        'Protein Frozen Yogurt': 'images-backup/creamy-vanilla-protein-ice-cream.jpg',
        'Protein Milkshake': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Protein Iced Coffee': 'images-backup/Chocolate-Protein-Shake-6-scaled.jpg',
        'Protein French Toast Sticks': 'images-backup/vanilla pancakes.jpg',
        'Protein Breakfast Burrito': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Breakfast Bowl': 'images-backup/featured-image-chocolate-protein-overnight-oats.jpg',
        'Protein Oatmeal Bowl': 'images-backup/vanilla-steel-cut-oatmeal-recipe-e1655260624606.jpg',
        'Protein Scrambled Eggs': 'images-backup/scrambled eggs.jpeg',
        'Protein Breakfast Smoothie': 'images-backup/Strawberry-Protein-Shake-Final.jpg',
        'Protein Banana Bread Muffins': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Cinnamon Rolls': 'images-backup/birthday cake.webp',
        'Protein Bagels': 'images-backup/vanilla pancakes.jpg',
        'Protein Pretzels': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Pizza Crust': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Mac and Cheese': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Soup': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Pasta Sauce': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Chicken Meatballs': 'images-backup/High-Protein-Omelette-3.jpg',
        'Protein Taco Seasoning Mix': 'images-backup/High-Protein-Omelette-3.jpg',
        'Chocolate Protein Donuts': 'images-backup/birthday cake.webp',
        'Protein Rice Krispie Treats': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Truffles': 'images-backup/peanut-butter-protein-balls.jpg',
        'Protein Banana Pudding': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Bread Pudding': 'images-backup/protein-banana-bread-recipe.jpg',
        'Protein Chocolate Chip Cookies': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Oatmeal Cookies': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Peanut Butter Cookies': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Lemon Bars': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Apple Crisp': 'images-backup/vanilla-protein-powder-chocolate-chip-cookies.jpg',
        'Protein Crème Brûlée': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Flan': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Churros': 'images-backup/birthday cake.webp',
        'Protein Tiramisu': 'images-backup/cookies-and-cream-protein-mug-cake.webp',
        'Protein Cheesecake Bars': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Pumpkin Pie': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Key Lime Pie': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Chocolate Mousse': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Protein Vanilla Pudding': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Chocolate Pudding': 'images-backup/chocolate-protein-ice-cream-recipe-500x500.webp',
        'Protein Butterscotch Pudding': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Tapioca Pudding': 'images-backup/Protein-Cheesecake-vanilla.jpg',
        'Protein Rice Pudding': 'images-backup/Strawberry-Oatmeal-4optimized.jpg',
        
        // Fallback
        'default': 'images-backup/protein-mug-cake-recipe.jpg'
    };
    
    const imageUrl = recipeImages[recipeName] || recipeImages['default'];
    return `<img src="${imageUrl}" alt="${altText}" style="width: 100%; height: 200px; object-fit: cover;" loading="lazy">`;
}

// Recipe Database - Massive Collection
const recipes = {
    chocolate: [
        {
            name: "Chocolate Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 25,
            calories: 320,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup milk",
                "1 tbsp cocoa powder",
                "1 tsp baking powder",
                "1 tbsp honey"
            ],
            method: [
                "Mix all dry ingredients in a bowl",
                "Add eggs and milk, whisk until smooth",
                "Heat a non-stick pan over medium heat",
                "Pour 1/4 cup batter per pancake",
                "Cook 2-3 minutes per side until golden",
                "Serve with berries and syrup"
            ],
            tips: "For extra fluffiness, let the batter rest for 5 minutes before cooking",
            image: getFoodImage('Chocolate Protein Pancakes', 'Chocolate Protein Pancakes'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Chocolate Protein Brownies",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 9,
            protein: 18,
            calories: 180,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1/2 cup almond flour",
                "1/4 cup cocoa powder",
                "2 eggs",
                "1/4 cup honey",
                "1/4 cup Greek yogurt",
                "1 tsp vanilla extract"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix dry ingredients in a bowl",
                "Whisk eggs, honey, yogurt, and vanilla",
                "Combine wet and dry ingredients",
                "Pour into greased 8x8 pan",
                "Bake 20-25 minutes until set",
                "Cool completely before cutting"
            ],
            tips: "For fudgier brownies, slightly underbake them",
            image: getFoodImage('brownies', 'Chocolate Protein Brownies'),
            dietary: []
        },
        {
            name: "Chocolate Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 20,
            calories: 250,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 banana",
                "1 cup almond milk",
                "1 tbsp cocoa powder",
                "1 tbsp peanut butter",
                "1/2 cup ice"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy"
            ],
            tips: "Use frozen banana for a thicker, creamier smoothie",
            image: getFoodImage('smoothie', 'Chocolate Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free"]
        },
        {
            name: "Chocolate Protein Oatmeal",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "5 min",
            servings: 1,
            protein: 22,
            calories: 300,
            ingredients: [
                "1/2 cup oats",
                "1 scoop chocolate protein powder",
                "1 cup water",
                "1 tbsp cocoa powder",
                "1 tbsp honey",
                "1/4 cup berries"
            ],
            method: [
                "Cook oats with water for 3 minutes",
                "Remove from heat and stir in protein powder",
                "Add cocoa powder and honey",
                "Top with berries and serve"
            ],
            tips: "Let protein powder cool slightly before adding to prevent clumping",
            image: getFoodImage('oatmeal', 'Chocolate Protein Oatmeal'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Chocolate Protein Cookies",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "12 min",
            servings: 12,
            protein: 8,
            calories: 120,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1/2 cup almond flour",
                "1/4 cup honey",
                "1 egg",
                "1/4 cup dark chocolate chips",
                "1 tsp vanilla extract"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix all ingredients in a bowl",
                "Form into 12 cookie balls",
                "Place on lined baking sheet",
                "Bake 12-15 minutes until golden",
                "Cool on wire rack"
            ],
            tips: "Don't overbake - cookies will continue cooking on the pan",
            image: getFoodImage('cookies', 'Chocolate Protein Cookies'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Chocolate Protein Waffles",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "15 min",
            servings: 4,
            protein: 15,
            calories: 200,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1/2 cup oat flour",
                "1 egg",
                "1/4 cup milk",
                "1 tbsp cocoa powder",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients until smooth",
                "Preheat waffle iron",
                "Pour batter into waffle iron",
                "Cook until golden and crispy",
                "Serve with syrup and berries"
            ],
            tips: "Don't open waffle iron too early - wait for steam to stop",
            image: getFoodImage('waffles', 'Chocolate Protein Waffles'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Chocolate Protein Ice Cream",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 18,
            calories: 200,
            ingredients: [
                "2 scoops chocolate protein powder",
                "2 frozen bananas",
                "1/4 cup almond milk",
                "2 tbsp cocoa powder",
                "1 tsp vanilla extract"
            ],
            method: [
                "Freeze bananas overnight",
                "Add all ingredients to high-speed blender",
                "Blend until smooth and creamy",
                "Add more milk if needed",
                "Serve immediately or freeze for firmer texture"
            ],
            tips: "Use very ripe bananas for the best sweetness",
            image: getFoodImage('ice-cream', 'Chocolate Protein Ice Cream'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Chocolate Protein Mug Cake",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "1 min",
            servings: 1,
            protein: 20,
            calories: 250,
            ingredients: [
                "1 scoop chocolate protein powder",
                "2 tbsp almond flour",
                "1 egg",
                "1 tbsp cocoa powder",
                "1 tsp baking powder",
                "2 tbsp milk"
            ],
            method: [
                "Mix all ingredients in microwave-safe mug",
                "Stir until smooth",
                "Microwave for 60-90 seconds",
                "Let cool slightly and enjoy"
            ],
            tips: "Don't overcook - it should be slightly gooey in the center",
            image: getFoodImage('mug-cake', 'Chocolate Protein Mug Cake'),
            dietary: ["dairy-free", "gluten-free"]
        }
    ],
    vanilla: [
        {
            name: "Vanilla Protein Cheesecake",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "45 min",
            servings: 8,
            protein: 20,
            calories: 250,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup Greek yogurt",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp vanilla extract",
                "1/2 cup almond flour",
                "2 tbsp butter"
            ],
            method: [
                "Preheat oven to 325°F (160°C)",
                "Mix almond flour and butter for crust",
                "Press into greased springform pan",
                "Blend yogurt, protein powder, eggs, honey, and vanilla",
                "Pour over crust",
                "Bake 45 minutes until center is set",
                "Cool in fridge for 2 hours"
            ],
            tips: "Let cheesecake cool completely before removing from pan",
            image: getFoodImage('cheesecake', 'Vanilla Protein Cheesecake'),
            dietary: []
        },
        {
            name: "Vanilla Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 4,
            protein: 18,
            calories: 200,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup oat flour",
                "1 egg",
                "1/4 cup milk",
                "1 tsp vanilla extract",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients until smooth",
                "Heat non-stick pan over medium heat",
                "Pour 1/4 cup batter per pancake",
                "Cook 2-3 minutes per side",
                "Serve with syrup and berries"
            ],
            tips: "Let batter rest for 5 minutes for fluffier pancakes",
            image: getFoodImage('pancakes', 'Vanilla Protein Pancakes'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Vanilla Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 22,
            calories: 180,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 banana",
                "1 cup almond milk",
                "1 tbsp honey",
                "1/2 cup ice",
                "1 tsp vanilla extract"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy"
            ],
            tips: "Use frozen banana for a thicker smoothie",
            image: getFoodImage('smoothie', 'Vanilla Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Vanilla Protein Oatmeal",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "5 min",
            servings: 1,
            protein: 20,
            calories: 250,
            ingredients: [
                "1/2 cup oats",
                "1 scoop vanilla protein powder",
                "1 cup water",
                "1 tbsp honey",
                "1/4 cup berries",
                "1 tsp vanilla extract"
            ],
            method: [
                "Cook oats with water for 3 minutes",
                "Remove from heat and stir in protein powder",
                "Add honey and vanilla",
                "Top with berries and serve"
            ],
            tips: "Let protein powder cool slightly before adding",
            image: getFoodImage('oatmeal', 'Vanilla Protein Oatmeal'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Vanilla Protein Waffles",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "15 min",
            servings: 4,
            protein: 16,
            calories: 180,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup oat flour",
                "1 egg",
                "1/4 cup milk",
                "1 tsp vanilla extract",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients until smooth",
                "Preheat waffle iron",
                "Pour batter into waffle iron",
                "Cook until golden and crispy",
                "Serve with syrup and fruit"
            ],
            tips: "Don't open waffle iron too early",
            image: getFoodImage('waffles', 'Vanilla Protein Waffles'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Vanilla Protein Cookies",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "12 min",
            servings: 12,
            protein: 6,
            calories: 100,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup almond flour",
                "1/4 cup honey",
                "1 egg",
                "1 tsp vanilla extract",
                "1/4 cup chocolate chips"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mix all ingredients in a bowl",
                "Form into 12 cookie balls",
                "Place on lined baking sheet",
                "Bake 12-15 minutes until golden",
                "Cool on wire rack"
            ],
            tips: "Don't overbake - cookies will continue cooking",
            image: getFoodImage('cookies', 'Vanilla Protein Cookies'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Vanilla Protein Ice Cream",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 16,
            calories: 180,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 frozen bananas",
                "1/4 cup almond milk",
                "1 tsp vanilla extract",
                "1 tbsp honey"
            ],
            method: [
                "Freeze bananas overnight",
                "Add all ingredients to high-speed blender",
                "Blend until smooth and creamy",
                "Add more milk if needed",
                "Serve immediately or freeze for firmer texture"
            ],
            tips: "Use very ripe bananas for the best sweetness",
            image: getFoodImage('ice-cream', 'Vanilla Protein Ice Cream'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Vanilla Protein Mug Cake",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "1 min",
            servings: 1,
            protein: 18,
            calories: 220,
            ingredients: [
                "1 scoop vanilla protein powder",
                "2 tbsp almond flour",
                "1 egg",
                "1 tsp vanilla extract",
                "1 tsp baking powder",
                "2 tbsp milk"
            ],
            method: [
                "Mix all ingredients in microwave-safe mug",
                "Stir until smooth",
                "Microwave for 60-90 seconds",
                "Let cool slightly and enjoy"
            ],
            tips: "Don't overcook - it should be slightly gooey",
            image: getFoodImage('mug-cake', 'Vanilla Protein Mug Cake'),
            dietary: ["dairy-free", "gluten-free"]
        }
    ],
    strawberry: [
        {
            name: "Strawberry Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 18,
            calories: 200,
            ingredients: [
                "1 scoop strawberry protein powder",
                "1 cup frozen strawberries",
                "1 banana",
                "1 cup almond milk",
                "1 tbsp honey",
                "1/2 cup ice"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy immediately"
            ],
            tips: "Use frozen fruit for a thicker, colder smoothie",
            image: getFoodImage('smoothie', 'Strawberry Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Strawberry Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 4,
            protein: 16,
            calories: 180,
            ingredients: [
                "1 scoop strawberry protein powder",
                "1/2 cup oat flour",
                "1 egg",
                "1/4 cup milk",
                "1/4 cup fresh strawberries",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients until smooth",
                "Heat non-stick pan over medium heat",
                "Pour 1/4 cup batter per pancake",
                "Cook 2-3 minutes per side",
                "Serve with fresh strawberries"
            ],
            tips: "Mash strawberries slightly for better distribution",
            image: getFoodImage('pancakes', 'Strawberry Protein Pancakes'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Strawberry Protein Oatmeal",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "5 min",
            servings: 1,
            protein: 18,
            calories: 220,
            ingredients: [
                "1/2 cup oats",
                "1 scoop strawberry protein powder",
                "1 cup water",
                "1/4 cup fresh strawberries",
                "1 tbsp honey"
            ],
            method: [
                "Cook oats with water for 3 minutes",
                "Remove from heat and stir in protein powder",
                "Add honey and fresh strawberries",
                "Serve immediately"
            ],
            tips: "Add strawberries after cooking to preserve their texture",
            image: getFoodImage('oatmeal', 'Strawberry Protein Oatmeal'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        },
        {
            name: "Strawberry Protein Ice Cream",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 16,
            calories: 160,
            ingredients: [
                "2 scoops strawberry protein powder",
                "2 frozen bananas",
                "1 cup frozen strawberries",
                "1/4 cup almond milk"
            ],
            method: [
                "Freeze bananas and strawberries overnight",
                "Add all ingredients to high-speed blender",
                "Blend until smooth and creamy",
                "Serve immediately or freeze for firmer texture"
            ],
            tips: "Use very ripe bananas for the best sweetness",
            image: getFoodImage('ice-cream', 'Strawberry Protein Ice Cream'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        }
    ],
    "cookies-cream": [
        {
            name: "Cookies & Cream Protein Mug Cake",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "1 min",
            servings: 1,
            protein: 15,
            calories: 180,
            ingredients: [
                "1 scoop cookies & cream protein powder",
                "1 egg",
                "2 tbsp almond flour",
                "1 tbsp cocoa powder",
                "1 tsp baking powder",
                "2 tbsp milk",
                "1 crushed cookie"
            ],
            method: [
                "Mix all ingredients in a microwave-safe mug",
                "Stir until smooth",
                "Microwave for 60-90 seconds",
                "Let cool slightly and enjoy"
            ],
            tips: "Don't overcook - it should be slightly gooey in the center",
            image: getFoodImage('mug-cake', 'Cookies & Cream Protein Mug Cake')
        }
    ],
    banana: [
        {
            name: "Banana Protein Bread",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "45 min",
            servings: 8,
            protein: 16,
            calories: 220,
            ingredients: [
                "2 scoops banana protein powder",
                "2 ripe bananas",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking powder",
                "1/2 tsp cinnamon"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mash bananas in a bowl",
                "Add eggs, honey, and mix well",
                "Add protein powder, oats, baking powder, cinnamon",
                "Pour into greased loaf pan",
                "Bake 45 minutes until golden",
                "Cool before slicing"
            ],
            tips: "Use very ripe bananas for the best flavor and sweetness",
            image: getFoodImage('bread', 'Banana Protein Bread')
        }
    ],
    "peanut-butter": [
        {
            name: "Peanut Butter Protein Balls",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 12,
            protein: 12,
            calories: 150,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup peanut butter",
                "1/4 cup honey",
                "1/2 cup oats",
                "2 tbsp chia seeds",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix all ingredients in a bowl",
                "Roll into 12 equal balls",
                "Place on parchment paper",
                "Refrigerate for 30 minutes",
                "Store in airtight container"
            ],
            tips: "If mixture is too sticky, add more oats. If too dry, add more honey",
            image: getFoodImage('energy-balls', 'Peanut Butter Protein Balls')
        }
    ],
    unflavored: [
        {
            name: "Savory Protein Omelet",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 1,
            protein: 22,
            calories: 280,
            ingredients: [
                "1 scoop unflavored protein powder",
                "3 eggs",
                "1/4 cup spinach",
                "2 tbsp cheese",
                "1 tbsp olive oil",
                "Salt and pepper to taste"
            ],
            method: [
                "Whisk eggs and protein powder until smooth",
                "Heat oil in non-stick pan",
                "Add spinach and cook until wilted",
                "Pour egg mixture over spinach",
                "Cook until edges set, add cheese",
                "Fold in half and serve"
            ],
            tips: "Don't overmix the protein powder - whisk gently to avoid clumps",
            image: getFoodImage('omelet', 'Savory Protein Omelet'),
            dietary: ["gluten-free", "soy-free"]
        },
        {
            name: "Protein Scrambled Eggs",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "5 min",
            servings: 1,
            protein: 25,
            calories: 200,
            ingredients: [
                "1 scoop unflavored protein powder",
                "3 eggs",
                "1 tbsp butter",
                "Salt and pepper to taste",
                "Fresh herbs (optional)"
            ],
            method: [
                "Whisk eggs and protein powder until smooth",
                "Heat butter in non-stick pan",
                "Add egg mixture and cook slowly",
                "Stir gently until set",
                "Season with salt, pepper, and herbs"
            ],
            tips: "Cook on low heat for creamier texture",
            image: getFoodImage('eggs', 'Protein Scrambled Eggs'),
            dietary: ["gluten-free", "soy-free", "nut-free"]
        }
    ],
    banana: [
        {
            name: "Banana Protein Bread",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "45 min",
            servings: 8,
            protein: 16,
            calories: 220,
            ingredients: [
                "2 scoops banana protein powder",
                "2 ripe bananas",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking powder",
                "1/2 tsp cinnamon"
            ],
            method: [
                "Preheat oven to 350°F (175°C)",
                "Mash bananas in a bowl",
                "Add eggs, honey, and mix well",
                "Add protein powder, oats, baking powder, cinnamon",
                "Pour into greased loaf pan",
                "Bake 45 minutes until golden",
                "Cool before slicing"
            ],
            tips: "Use very ripe bananas for the best flavor and sweetness",
            image: getFoodImage('bread', 'Banana Protein Bread'),
            dietary: ["dairy-free", "gluten-free", "soy-free"]
        },
        {
            name: "Banana Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 20,
            calories: 180,
            ingredients: [
                "1 scoop banana protein powder",
                "1 banana",
                "1 cup almond milk",
                "1 tbsp honey",
                "1/2 cup ice"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy"
            ],
            tips: "Use frozen banana for a thicker smoothie",
            image: getFoodImage('smoothie', 'Banana Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        }
    ],
    "peanut-butter": [
        {
            name: "Peanut Butter Protein Balls",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 12,
            protein: 12,
            calories: 150,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup peanut butter",
                "1/4 cup honey",
                "1/2 cup oats",
                "2 tbsp chia seeds",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix all ingredients in a bowl",
                "Roll into 12 equal balls",
                "Place on parchment paper",
                "Refrigerate for 30 minutes",
                "Store in airtight container"
            ],
            tips: "If mixture is too sticky, add more oats. If too dry, add more honey",
            image: getFoodImage('energy-balls', 'Peanut Butter Protein Balls'),
            dietary: ["dairy-free", "gluten-free", "soy-free"]
        },
        {
            name: "Peanut Butter Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 22,
            calories: 300,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 banana",
                "1 cup almond milk",
                "2 tbsp peanut butter",
                "1 tbsp honey",
                "1/2 cup ice"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy"
            ],
            tips: "Use frozen banana for a thicker smoothie",
            image: getFoodImage('smoothie', 'Peanut Butter Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free"]
        }
    ],
    mint: [
        {
            name: "Mint Chocolate Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 18,
            calories: 200,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 banana",
                "1 cup almond milk",
                "1 tbsp cocoa powder",
                "1/2 tsp mint extract",
                "1/2 cup ice"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy"
            ],
            tips: "Add fresh mint leaves for extra flavor",
            image: getFoodImage('smoothie', 'Mint Chocolate Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free", "nut-free"]
        }
    ],
    caramel: [
        {
            name: "Caramel Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 4,
            protein: 16,
            calories: 200,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup oat flour",
                "1 egg",
                "1/4 cup milk",
                "1 tbsp caramel sauce",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients until smooth",
                "Heat non-stick pan over medium heat",
                "Pour 1/4 cup batter per pancake",
                "Cook 2-3 minutes per side",
                "Serve with extra caramel sauce"
            ],
            tips: "Drizzle caramel sauce on top for extra sweetness",
            image: getFoodImage('pancakes', 'Caramel Protein Pancakes'),
            dietary: ["dairy-free", "gluten-free"]
        }
    ],
    "birthday-cake": [
        {
            name: "Birthday Cake Protein Mug Cake",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "1 min",
            servings: 1,
            protein: 18,
            calories: 250,
            ingredients: [
                "1 scoop birthday cake protein powder",
                "2 tbsp almond flour",
                "1 egg",
                "1 tsp vanilla extract",
                "1 tsp baking powder",
                "2 tbsp milk",
                "1 tbsp sprinkles"
            ],
            method: [
                "Mix all ingredients in microwave-safe mug",
                "Stir until smooth",
                "Microwave for 60-90 seconds",
                "Let cool slightly and enjoy"
            ],
            tips: "Add sprinkles on top for extra birthday cake vibes",
            image: getFoodImage('mug-cake', 'Birthday Cake Protein Mug Cake'),
            dietary: ["dairy-free", "gluten-free"]
        }
    ],
    "cookies-cream": [
        {
            name: "Cookies & Cream Protein Mug Cake",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "1 min",
            servings: 1,
            protein: 15,
            calories: 180,
            ingredients: [
                "1 scoop cookies & cream protein powder",
                "1 egg",
                "2 tbsp almond flour",
                "1 tbsp cocoa powder",
                "1 tsp baking powder",
                "2 tbsp milk",
                "1 crushed cookie"
            ],
            method: [
                "Mix all ingredients in microwave-safe mug",
                "Stir until smooth",
                "Microwave for 60-90 seconds",
                "Let cool slightly and enjoy"
            ],
            tips: "Don't overcook - it should be slightly gooey in the center",
            image: getFoodImage('mug-cake', 'Cookies & Cream Protein Mug Cake'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Cookies & Cream Protein Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 20,
            calories: 250,
            ingredients: [
                "1 scoop cookies & cream protein powder",
                "1 banana",
                "1 cup almond milk",
                "1 tbsp cocoa powder",
                "1 crushed cookie",
                "1/2 cup ice"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 30 seconds",
                "Add more ice if too thin",
                "Pour into glass and enjoy"
            ],
            tips: "Save some cookie crumbs for garnish",
            image: getFoodImage('smoothie', 'Cookies & Cream Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free", "soy-free"]
        }
    ],
    
    // NEW FLAVORS - TRENDING 2024
    collagen: [
        {
            name: "Collagen Protein Smoothie",
            category: "smoothies",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 20,
            calories: 180,
            ingredients: [
                "1 scoop collagen protein powder",
                "1 cup frozen berries",
                "1/2 banana",
                "1 cup almond milk",
                "1 tbsp chia seeds",
                "1 tsp honey"
            ],
            method: [
                "Add all ingredients to blender",
                "Blend on high for 60 seconds",
                "Pour into glass and serve immediately"
            ],
            tips: "Collagen powder dissolves better in warm liquids",
            image: getFoodImage('Collagen Protein Smoothie', 'Collagen Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        }
    ],
    
    // POPULAR BRAND FLAVORS
    "ghost": [
        {
            name: "Ghost Cinnabon Protein Pancakes",
            category: "breakfast",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "10 min",
            servings: 3,
            protein: 28,
            calories: 320,
            ingredients: [
                "2 scoops Ghost Cinnabon protein powder",
                "1 cup oat flour",
                "2 eggs",
                "1/4 cup Greek yogurt",
                "2 tbsp almond milk",
                "1 tsp baking powder",
                "1 tsp cinnamon",
                "1 tbsp maple syrup"
            ],
            method: [
                "Mix dry ingredients in large bowl",
                "Whisk eggs, yogurt, and milk in separate bowl",
                "Combine wet and dry ingredients",
                "Heat non-stick pan over medium heat",
                "Cook pancakes 2-3 minutes per side",
                "Drizzle with maple syrup and enjoy"
            ],
            tips: "Ghost Cinnabon tastes exactly like the real thing!",
            image: getFoodImage('Protein Pancakes', 'Ghost Cinnabon Protein Pancakes'),
            dietary: ["gluten-free"]
        }
    ],
    
    "optimum-nutrition": [
        {
            name: "ON Gold Standard French Toast",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "8 min",
            servings: 2,
            protein: 25,
            calories: 280,
            ingredients: [
                "2 scoops ON French Vanilla Creme",
                "4 slices whole grain bread",
                "2 eggs",
                "1/4 cup milk",
                "1 tsp vanilla extract",
                "1 tsp cinnamon",
                "1 tbsp butter"
            ],
            method: [
                "Mix protein powder with eggs, milk, vanilla, and cinnamon",
                "Dip bread slices in mixture",
                "Heat butter in pan over medium heat",
                "Cook French toast 2-3 minutes per side",
                "Serve with berries and syrup"
            ],
            tips: "ON French Vanilla Creme is perfect for French toast!",
            image: getFoodImage('Protein French Toast', 'ON Gold Standard French Toast'),
            dietary: []
        }
    ],
    
    "dymatize": [
        {
            name: "Dymatize ISO100 Chocolate Mug Cake",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "2 min",
            servings: 1,
            protein: 22,
            calories: 180,
            ingredients: [
                "1 scoop Dymatize ISO100 Chocolate",
                "2 tbsp almond flour",
                "1 egg",
                "1 tbsp cocoa powder",
                "1 tsp baking powder",
                "1 tbsp honey",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix all ingredients in microwave-safe mug",
                "Microwave for 60-90 seconds",
                "Let cool slightly before eating",
                "Top with berries if desired"
            ],
            tips: "Dymatize ISO100 mixes perfectly and tastes amazing!",
            image: getFoodImage('Protein Mug Cake', 'Dymatize ISO100 Chocolate Mug Cake'),
            dietary: ["gluten-free"]
        }
    ],
    
    "muscletech": [
        {
            name: "MuscleTech NitroTech Protein Cookies",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "12 min",
            servings: 12,
            protein: 18,
            calories: 220,
            ingredients: [
                "2 scoops MuscleTech NitroTech Chocolate",
                "1 cup almond flour",
                "1/4 cup coconut flour",
                "2 eggs",
                "1/4 cup almond butter",
                "2 tbsp honey",
                "1 tsp baking powder",
                "1/2 cup dark chocolate chips"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mix dry ingredients in large bowl",
                "Whisk eggs, almond butter, and honey",
                "Combine wet and dry ingredients",
                "Fold in chocolate chips",
                "Drop spoonfuls onto baking sheet",
                "Bake 10-12 minutes until golden",
                "Cool on wire rack"
            ],
            tips: "MuscleTech NitroTech has added creatine for extra muscle building!",
            image: getFoodImage('Protein Cookies', 'MuscleTech NitroTech Protein Cookies'),
            dietary: ["gluten-free"]
        }
    ],
    
    "bsn": [
        {
            name: "BSN Syntha-6 Ice Cream",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "30 min",
            cookTime: "0 min",
            servings: 4,
            protein: 25,
            calories: 280,
            ingredients: [
                "2 scoops BSN Syntha-6 Vanilla Ice Cream",
                "2 frozen bananas",
                "1/2 cup Greek yogurt",
                "1/4 cup almond milk",
                "1 tbsp honey",
                "1 tsp vanilla extract",
                "1/4 cup mixed berries"
            ],
            method: [
                "Add all ingredients to high-powered blender",
                "Blend on high until smooth and creamy",
                "Add more almond milk if too thick",
                "Pour into container and freeze 2 hours",
                "Scoop and serve with berries"
            ],
            tips: "BSN Syntha-6 is incredibly smooth and perfect for ice cream!",
            image: getFoodImage('Protein Ice Cream', 'BSN Syntha-6 Ice Cream'),
            dietary: ["gluten-free"]
        }
    ],
    
    "transparent-labs": [
        {
            name: "Transparent Labs Protein Bread",
            category: "breakfast",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "45 min",
            servings: 8,
            protein: 22,
            calories: 180,
            ingredients: [
                "2 scoops Transparent Labs Whey Isolate",
                "1 cup almond flour",
                "1/4 cup coconut flour",
                "4 eggs",
                "1/4 cup Greek yogurt",
                "1 tsp baking powder",
                "1/2 tsp salt",
                "1 tbsp olive oil"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mix dry ingredients in large bowl",
                "Whisk eggs, yogurt, and oil",
                "Combine wet and dry ingredients",
                "Pour into greased loaf pan",
                "Bake 40-45 minutes until golden",
                "Cool before slicing"
            ],
            tips: "Transparent Labs is the cleanest protein powder available!",
            image: getFoodImage('Protein Bread', 'Transparent Labs Protein Bread'),
            dietary: ["gluten-free", "dairy-free"]
        }
    ],
    
    "quest": [
        {
            name: "Quest Protein Bars (Homemade)",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 8,
            protein: 20,
            calories: 200,
            ingredients: [
                "2 scoops Quest Vanilla protein powder",
                "1/2 cup almond butter",
                "1/4 cup honey",
                "1/4 cup coconut oil",
                "1/2 cup chopped nuts",
                "1/4 cup dark chocolate chips",
                "1 tsp vanilla extract"
            ],
            method: [
                "Melt coconut oil in microwave",
                "Mix protein powder with almond butter",
                "Add honey and vanilla extract",
                "Stir in nuts and chocolate chips",
                "Press into lined pan",
                "Refrigerate 2 hours until firm",
                "Cut into bars and enjoy"
            ],
            tips: "Quest protein powder is perfect for homemade protein bars!",
            image: getFoodImage('Protein Bars', 'Quest Protein Bars Homemade'),
            dietary: ["gluten-free"]
        }
    ],
    
    keto: [
        {
            name: "Keto Protein Fat Bombs",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 12,
            protein: 8,
            calories: 120,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup coconut oil",
                "1/4 cup almond butter",
                "2 tbsp cocoa powder",
                "1 tbsp stevia",
                "1 tsp vanilla extract"
            ],
            method: [
                "Melt coconut oil in microwave",
                "Mix all ingredients in bowl",
                "Pour into silicone molds",
                "Freeze for 2 hours",
                "Store in refrigerator"
            ],
            tips: "Perfect for keto diet - high fat, low carb",
            image: getFoodImage('Keto Protein Fat Bombs', 'Keto Protein Fat Bombs'),
            dietary: ["keto", "dairy-free", "gluten-free"]
        }
    ],
    
    // EXPANDED RECIPE COLLECTIONS
    "birthday-cake": [
        {
            name: "Birthday Cake Protein Donuts",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "15 min",
            servings: 6,
            protein: 22,
            calories: 280,
            ingredients: [
                "2 scoops birthday cake protein powder",
                "1 cup almond flour",
                "1/4 cup coconut flour",
                "2 eggs",
                "1/4 cup Greek yogurt",
                "2 tbsp honey",
                "1 tsp baking powder",
                "1/2 tsp vanilla extract",
                "Sprinkles for topping"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mix dry ingredients in large bowl",
                "Whisk eggs, yogurt, honey, and vanilla",
                "Combine wet and dry ingredients",
                "Spoon into donut pan",
                "Bake 12-15 minutes until golden",
                "Cool and add sprinkles"
            ],
            tips: "Use silicone donut pan for easy removal",
            image: getFoodImage('Protein Donuts', 'Birthday Cake Protein Donuts'),
            dietary: ["gluten-free"]
        }
    ],
    
    "cookies-cream": [
        {
            name: "Cookies & Cream Protein Tiramisu",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "30 min",
            cookTime: "0 min",
            servings: 6,
            protein: 28,
            calories: 320,
            ingredients: [
                "2 scoops cookies & cream protein powder",
                "1 cup mascarpone cheese",
                "1/2 cup heavy cream",
                "1/4 cup coffee",
                "2 tbsp cocoa powder",
                "1 tbsp honey",
                "6 ladyfinger cookies",
                "Dark chocolate shavings"
            ],
            method: [
                "Mix protein powder with mascarpone",
                "Whip heavy cream until stiff peaks",
                "Fold whipped cream into protein mixture",
                "Dip ladyfingers in coffee",
                "Layer cookies and cream mixture",
                "Dust with cocoa powder",
                "Refrigerate 4 hours before serving"
            ],
            tips: "Make coffee strong for authentic tiramisu flavor",
            image: getFoodImage('Protein Tiramisu', 'Cookies & Cream Protein Tiramisu'),
            dietary: ["gluten-free"]
        }
    ],
    
    "mint": [
        {
            name: "Mint Chocolate Protein Fudge",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 16,
            protein: 12,
            calories: 150,
            ingredients: [
                "2 scoops mint chocolate protein powder",
                "1/2 cup coconut oil",
                "1/4 cup almond butter",
                "2 tbsp cocoa powder",
                "1 tbsp honey",
                "1 tsp peppermint extract",
                "Dark chocolate chips"
            ],
            method: [
                "Melt coconut oil in microwave",
                "Mix all ingredients except chocolate chips",
                "Stir in chocolate chips",
                "Pour into lined pan",
                "Freeze for 2 hours",
                "Cut into squares"
            ],
            tips: "Store in refrigerator for best texture",
            image: getFoodImage('Protein Fudge', 'Mint Chocolate Protein Fudge'),
            dietary: ["dairy-free", "gluten-free"]
        }
    ],
    
    "caramel": [
        {
            name: "Caramel Protein Cheesecake Bars",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "25 min",
            cookTime: "30 min",
            servings: 9,
            protein: 20,
            calories: 280,
            ingredients: [
                "2 scoops caramel protein powder",
                "1 cup almond flour",
                "1/4 cup butter",
                "8 oz cream cheese",
                "2 eggs",
                "1/4 cup Greek yogurt",
                "2 tbsp honey",
                "1 tsp vanilla extract",
                "Caramel sauce for drizzle"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mix almond flour and butter for crust",
                "Press into lined pan, bake 10 minutes",
                "Beat cream cheese until smooth",
                "Add protein powder, eggs, yogurt, honey, vanilla",
                "Pour over crust",
                "Bake 20-25 minutes until set",
                "Cool and drizzle with caramel"
            ],
            tips: "Let cool completely before cutting",
            image: getFoodImage('Protein Cheesecake Bars', 'Caramel Protein Cheesecake Bars'),
            dietary: ["gluten-free"]
        }
    ],
    
    // EXPANDED RECIPE COLLECTION - 100+ NEW RECIPES
    "expanded": [
        {
            name: "Protein Yogurt Bowl",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 22,
            calories: 280,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 cup Greek yogurt",
                "1/2 cup berries",
                "1/4 cup granola",
                "1 tbsp honey"
            ],
            method: [
                "Mix protein powder with Greek yogurt",
                "Top with berries and granola",
                "Drizzle with honey",
                "Enjoy immediately"
            ],
            tips: "Use frozen berries for a refreshing cold bowl",
            image: getFoodImage('Protein Yogurt Bowl', 'Protein Yogurt Bowl'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Parfait",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 2,
            protein: 25,
            calories: 320,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup Greek yogurt",
                "1/2 cup mixed berries",
                "1/4 cup granola",
                "2 tbsp chia seeds"
            ],
            method: [
                "Layer yogurt and protein powder mix",
                "Add berries and granola",
                "Top with chia seeds",
                "Chill for 30 minutes"
            ],
            tips: "Layer in a tall glass for beautiful presentation",
            image: getFoodImage('Protein Parfait', 'Protein Parfait'),
            dietary: []
        },
        {
            name: "Protein Smoothie Bowl",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 350,
            ingredients: [
                "1 scoop strawberry protein powder",
                "1 frozen banana",
                "1/2 cup frozen strawberries",
                "1/4 cup almond milk",
                "Toppings: granola, coconut, berries"
            ],
            method: [
                "Blend all ingredients until thick",
                "Pour into bowl",
                "Top with granola, coconut, and berries",
                "Eat with spoon"
            ],
            tips: "Use less liquid for a thicker, spoonable consistency",
            image: getFoodImage('Protein Smoothie Bowl', 'Protein Smoothie Bowl'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Overnight Oats",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 28,
            calories: 380,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1/2 cup rolled oats",
                "1/2 cup almond milk",
                "1 tbsp chia seeds",
                "1/2 banana, sliced"
            ],
            method: [
                "Mix all ingredients in a jar",
                "Stir until combined",
                "Refrigerate overnight",
                "Top with banana before serving"
            ],
            tips: "Make multiple jars on Sunday for the week",
            image: getFoodImage('Protein Overnight Oats', 'Protein Overnight Oats'),
            dietary: ["dairy-free"]
        },
        {
            name: "Protein Chia Pudding",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 20,
            calories: 290,
            ingredients: [
                "1 scoop vanilla protein powder",
                "3 tbsp chia seeds",
                "1 cup almond milk",
                "1 tsp vanilla extract",
                "Fresh berries for topping"
            ],
            method: [
                "Whisk protein powder and chia seeds",
                "Add almond milk and vanilla",
                "Stir well and let sit 5 minutes",
                "Stir again and refrigerate 4+ hours",
                "Top with berries before serving"
            ],
            tips: "Stir twice in the first 10 minutes to prevent clumping",
            image: getFoodImage('Protein Chia Pudding', 'Protein Chia Pudding'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Rice Pudding",
            category: "breakfast",
            difficulty: "intermediate",
            prepTime: "5 min",
            cookTime: "20 min",
            servings: 2,
            protein: 22,
            calories: 310,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup cooked rice",
                "1 cup almond milk",
                "1 tbsp honey",
                "1/2 tsp cinnamon"
            ],
            method: [
                "Heat almond milk in saucepan",
                "Add cooked rice and simmer 15 minutes",
                "Stir in protein powder and honey",
                "Add cinnamon and serve warm"
            ],
            tips: "Use leftover rice for best results",
            image: getFoodImage('Protein Rice Pudding', 'Protein Rice Pudding'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Popsicles",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 4,
            protein: 15,
            calories: 120,
            ingredients: [
                "1 scoop strawberry protein powder",
                "1 cup coconut milk",
                "1/2 cup frozen strawberries",
                "1 tbsp honey"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Pour into popsicle molds",
                "Freeze 4-6 hours until solid",
                "Run under warm water to remove"
            ],
            tips: "Add fruit chunks for texture",
            image: getFoodImage('Protein Popsicles', 'Protein Popsicles'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Milkshake",
            category: "smoothies",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 26,
            calories: 380,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 cup milk",
                "2 scoops vanilla ice cream",
                "2 tbsp chocolate syrup",
                "Whipped cream for topping"
            ],
            method: [
                "Blend protein powder and milk",
                "Add ice cream and chocolate syrup",
                "Blend until smooth and creamy",
                "Top with whipped cream"
            ],
            tips: "Use frozen bananas instead of ice cream for healthier version",
            image: getFoodImage('Protein Milkshake', 'Protein Milkshake'),
            dietary: []
        },
        {
            name: "Protein Coffee Smoothie",
            category: "smoothies",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 250,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 cup cold brew coffee",
                "1 frozen banana",
                "1 tbsp almond butter",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Add more ice if needed",
                "Pour into glass and enjoy"
            ],
            tips: "Perfect morning energy boost",
            image: getFoodImage('Protein Coffee Smoothie', 'Protein Coffee Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Hot Chocolate",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "2 min",
            cookTime: "3 min",
            servings: 1,
            protein: 20,
            calories: 220,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 cup hot milk",
                "1 tbsp cocoa powder",
                "1 tsp honey",
                "Pinch of cinnamon"
            ],
            method: [
                "Heat milk until steaming",
                "Whisk in protein powder and cocoa",
                "Add honey and cinnamon",
                "Stir until smooth and frothy"
            ],
            tips: "Whisk vigorously to prevent clumping",
            image: getFoodImage('Protein Hot Chocolate', 'Protein Hot Chocolate'),
            dietary: []
        },
        {
            name: "Protein Cupcakes",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "18 min",
            servings: 12,
            protein: 12,
            calories: 180,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup almond flour",
                "2 eggs",
                "1/4 cup honey",
                "1/4 cup Greek yogurt",
                "1 tsp vanilla extract",
                "Protein frosting"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mix all dry ingredients",
                "Whisk wet ingredients separately",
                "Combine and fill cupcake liners",
                "Bake 18-20 minutes",
                "Cool and frost"
            ],
            tips: "Don't overmix the batter",
            image: getFoodImage('Protein Cupcakes', 'Protein Cupcakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Cake",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "30 min",
            servings: 12,
            protein: 18,
            calories: 240,
            ingredients: [
                "3 scoops vanilla protein powder",
                "1.5 cups almond flour",
                "3 eggs",
                "1/3 cup honey",
                "1/2 cup Greek yogurt",
                "1 tsp baking powder",
                "Frosting of choice"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mix dry ingredients in bowl",
                "Whisk wet ingredients separately",
                "Combine until just mixed",
                "Pour into greased pan",
                "Bake 28-32 minutes",
                "Cool completely before frosting"
            ],
            tips: "Test with toothpick - should come out clean",
            image: getFoodImage('Protein Cake', 'Protein Cake'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Banana Bread",
            category: "baked",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "55 min",
            servings: 12,
            protein: 16,
            calories: 210,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 ripe bananas, mashed",
                "1 cup almond flour",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking soda",
                "1/2 tsp cinnamon"
            ],
            method: [
                "Preheat oven to 350°F",
                "Mash bananas in large bowl",
                "Mix in eggs and honey",
                "Add dry ingredients",
                "Pour into greased loaf pan",
                "Bake 50-60 minutes until golden",
                "Cool before slicing"
            ],
            tips: "Overripe bananas add natural sweetness",
            image: getFoodImage('Protein Banana Bread', 'Protein Banana Bread'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein French Toast",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "10 min",
            servings: 2,
            protein: 28,
            calories: 340,
            ingredients: [
                "2 scoops vanilla protein powder",
                "4 slices bread",
                "2 eggs",
                "1/4 cup milk",
                "1 tsp cinnamon",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix protein powder, eggs, milk, cinnamon, vanilla",
                "Dip bread slices in mixture",
                "Cook in buttered pan 3-4 minutes per side",
                "Serve with syrup and berries"
            ],
            tips: "Let bread soak 30 seconds per side",
            image: getFoodImage('Protein French Toast', 'Protein French Toast'),
            dietary: []
        },
        {
            name: "Protein Crepes",
            category: "breakfast",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "15 min",
            servings: 4,
            protein: 20,
            calories: 180,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 eggs",
                "1/2 cup milk",
                "1/4 cup almond flour",
                "1 tsp vanilla extract",
                "Butter for cooking"
            ],
            method: [
                "Whisk all ingredients until smooth",
                "Heat non-stick pan over medium heat",
                "Pour 1/4 cup batter, swirl to cover pan",
                "Cook 1-2 minutes, flip and cook 30 seconds",
                "Fill with berries or Nutella"
            ],
            tips: "First crepe is usually a practice one",
            image: getFoodImage('Protein Crepes', 'Protein Crepes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Bars",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 12,
            protein: 15,
            calories: 190,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1 cup dates, pitted",
                "1/2 cup almonds",
                "1/4 cup cocoa powder",
                "2 tbsp almond butter"
            ],
            method: [
                "Process dates in food processor",
                "Add almonds and process until chopped",
                "Add protein powder, cocoa, almond butter",
                "Process until sticky dough forms",
                "Press into lined pan",
                "Refrigerate 2 hours, cut into bars"
            ],
            tips: "Keep refrigerated for best texture",
            image: getFoodImage('Protein Bars', 'Protein Bars'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Bites",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 20,
            protein: 8,
            calories: 90,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup dates",
                "1/2 cup almonds",
                "2 tbsp almond butter",
                "1/4 cup shredded coconut"
            ],
            method: [
                "Process dates and almonds in food processor",
                "Add protein powder and almond butter",
                "Process until mixture forms ball",
                "Roll into 1-inch balls",
                "Coat with coconut",
                "Refrigerate 30 minutes"
            ],
            tips: "Perfect for on-the-go snacking",
            image: getFoodImage('Protein Bites', 'Protein Bites'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Frittata",
            category: "savory",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "20 min",
            servings: 4,
            protein: 32,
            calories: 280,
            ingredients: [
                "2 scoops unflavored protein powder",
                "6 eggs",
                "1/2 cup milk",
                "1 cup vegetables (spinach, bell peppers)",
                "1/2 cup cheese",
                "Salt and pepper"
            ],
            method: [
                "Preheat oven to 375°F",
                "Whisk eggs, protein powder, and milk",
                "Sauté vegetables in oven-safe pan",
                "Pour egg mixture over vegetables",
                "Top with cheese",
                "Bake 15-20 minutes until set"
            ],
            tips: "Perfect for meal prep",
            image: getFoodImage('Protein Frittata', 'Protein Frittata'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Egg Muffins",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "20 min",
            servings: 12,
            protein: 14,
            calories: 110,
            ingredients: [
                "1 scoop unflavored protein powder",
                "6 eggs",
                "1/4 cup milk",
                "1/2 cup vegetables",
                "1/4 cup cheese",
                "Salt and pepper"
            ],
            method: [
                "Preheat oven to 350°F",
                "Whisk eggs, protein powder, and milk",
                "Stir in vegetables and cheese",
                "Pour into greased muffin tin",
                "Bake 18-20 minutes until set"
            ],
            tips: "Store in fridge for quick breakfasts",
            image: getFoodImage('Protein Egg Muffins', 'Protein Egg Muffins'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Mousse",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 4,
            protein: 18,
            calories: 220,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1 cup heavy cream",
                "2 tbsp cocoa powder",
                "2 tbsp honey",
                "1 tsp vanilla extract"
            ],
            method: [
                "Whip heavy cream to soft peaks",
                "Fold in protein powder and cocoa",
                "Add honey and vanilla",
                "Chill 2 hours before serving",
                "Garnish with berries"
            ],
            tips: "Don't overmix when folding",
            image: getFoodImage('Protein Mousse', 'Protein Mousse'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Creme Brulee",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "15 min",
            cookTime: "35 min",
            servings: 4,
            protein: 20,
            calories: 280,
            ingredients: [
                "2 scoops vanilla protein powder",
                "4 egg yolks",
                "1 cup heavy cream",
                "1/4 cup sugar",
                "1 tsp vanilla extract"
            ],
            method: [
                "Preheat oven to 325°F",
                "Whisk egg yolks and sugar",
                "Heat cream with vanilla",
                "Temper eggs with warm cream",
                "Add protein powder",
                "Strain and pour into ramekins",
                "Bake in water bath 30-35 minutes",
                "Chill 4 hours, caramelize sugar on top"
            ],
            tips: "Water bath prevents cracking",
            image: getFoodImage('Protein Creme Brulee', 'Protein Creme Brulee'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Panna Cotta",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 4,
            protein: 18,
            calories: 240,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups heavy cream",
                "2 tbsp gelatin",
                "1/4 cup honey",
                "1 tsp vanilla extract"
            ],
            method: [
                "Bloom gelatin in cold water",
                "Heat cream and honey",
                "Dissolve gelatin in warm cream",
                "Add protein powder and vanilla",
                "Strain and pour into molds",
                "Chill 4+ hours until set"
            ],
            tips: "Serve with fresh berries",
            image: getFoodImage('Protein Panna Cotta', 'Protein Panna Cotta'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Gelato",
            category: "frozen",
            difficulty: "advanced",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 6,
            protein: 16,
            calories: 200,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups whole milk",
                "4 egg yolks",
                "1/3 cup sugar",
                "1 tsp vanilla extract"
            ],
            method: [
                "Heat milk until steaming",
                "Whisk egg yolks and sugar",
                "Temper eggs with hot milk",
                "Cook until thickened",
                "Stir in protein powder",
                "Chill completely",
                "Churn in ice cream maker",
                "Freeze until firm"
            ],
            tips: "Churn according to ice cream maker instructions",
            image: getFoodImage('Protein Gelato', 'Protein Gelato'),
            dietary: ["gluten-free"]
        },
        // Additional Recipe Variations - 50+ New Recipes
        {
            name: "Chocolate Protein Coffee Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 25,
            calories: 180,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 cup cold brew coffee",
                "1/2 frozen banana",
                "1 tbsp cocoa powder",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately over ice"
            ],
            tips: "Use strong coffee for more flavor",
            image: getFoodImage('Chocolate Protein Shake', 'Chocolate Protein Coffee Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Vanilla Protein Coffee Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 170,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 cup cold brew coffee",
                "1/2 cup almond milk",
                "1 tsp vanilla extract",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Top with cinnamon if desired"
            ],
            tips: "Add a pinch of cinnamon for extra flavor",
            image: getFoodImage('Vanilla Protein Shake', 'Vanilla Protein Coffee Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Hot Chocolate",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "3 min",
            servings: 1,
            protein: 20,
            calories: 150,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 cup hot water or milk",
                "1 tbsp cocoa powder",
                "1 tsp honey"
            ],
            method: [
                "Heat water or milk until hot",
                "Whisk in protein powder and cocoa",
                "Sweeten with honey",
                "Top with whipped cream if desired"
            ],
            tips: "Whisk vigorously to prevent clumping",
            image: getFoodImage('Chocolate Protein Shake', 'Protein Hot Chocolate'),
            dietary: ["gluten-free"]
        },
        {
            name: "Matcha Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 23,
            calories: 160,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 tsp matcha powder",
                "1 cup almond milk",
                "1/2 frozen banana",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately"
            ],
            tips: "Use ceremonial grade matcha for best flavor",
            image: getFoodImage('Strawberry Protein Smoothie', 'Matcha Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Protein Chai Latte",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "5 min",
            servings: 1,
            protein: 22,
            calories: 140,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 cup chai tea",
                "1/4 cup milk",
                "1 tsp honey",
                "Pinch of cinnamon"
            ],
            method: [
                "Brew chai tea",
                "Heat milk and combine with tea",
                "Whisk in protein powder",
                "Sweeten with honey and cinnamon"
            ],
            tips: "Steep chai for 5 minutes for stronger flavor",
            image: getFoodImage('Vanilla Protein Shake', 'Protein Chai Latte'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Energy Bites",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 12,
            protein: 6,
            calories: 90,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1/2 cup dates",
                "1/4 cup almonds",
                "1 tbsp cocoa powder",
                "1 tsp vanilla extract"
            ],
            method: [
                "Blend dates until paste forms",
                "Add protein powder and almonds",
                "Blend until combined",
                "Roll into 12 balls",
                "Chill for 30 minutes"
            ],
            tips: "Store in fridge for up to a week",
            image: getFoodImage('Protein Energy Balls', 'Protein Energy Bites'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Protein Granola Bars",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "20 min",
            servings: 8,
            protein: 12,
            calories: 220,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups oats",
                "1/2 cup honey",
                "1/4 cup almond butter",
                "1/4 cup dried fruit",
                "1/4 cup nuts"
            ],
            method: [
                "Mix dry ingredients",
                "Heat honey and almond butter",
                "Combine wet and dry",
                "Press into pan",
                "Bake at 350°F for 20 minutes"
            ],
            tips: "Let cool completely before cutting",
            image: getFoodImage('Protein Cookies', 'Protein Granola Bars'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Trail Mix",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 8,
            protein: 8,
            calories: 180,
            ingredients: [
                "1/2 cup protein powder coated nuts",
                "1/4 cup dark chocolate chips",
                "1/4 cup dried cranberries",
                "1/4 cup almonds",
                "1/4 cup pumpkin seeds"
            ],
            method: [
                "Mix all ingredients",
                "Store in airtight container"
            ],
            tips: "Make your own protein-coated nuts by mixing protein powder with melted coconut oil",
            image: getFoodImage('Peanut Butter Protein Balls', 'Protein Trail Mix'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Rice Cakes",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 15,
            calories: 200,
            ingredients: [
                "2 rice cakes",
                "2 tbsp protein powder mixed with water",
                "1 tbsp almond butter",
                "Sliced banana"
            ],
            method: [
                "Mix protein powder with water to make spread",
                "Spread on rice cakes",
                "Top with almond butter and banana"
            ],
            tips: "Use chocolate protein for a dessert-like snack",
            image: getFoodImage('Protein Cookies', 'Protein Rice Cakes'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Protein Stuffed Dates",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 6,
            protein: 5,
            calories: 85,
            ingredients: [
                "6 dates",
                "2 tbsp vanilla protein powder",
                "1 tbsp almond butter",
                "12 almonds"
            ],
            method: [
                "Pit dates",
                "Mix protein powder with almond butter",
                "Stuff dates with mixture",
                "Insert one almond in each",
                "Chill for 30 minutes"
            ],
            tips: "Use Medjool dates for best texture",
            image: getFoodImage('Protein Energy Balls', 'Protein Stuffed Dates'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Protein Banana Nice Cream",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 18,
            calories: 220,
            ingredients: [
                "2 frozen bananas",
                "1 scoop vanilla protein powder",
                "1 tbsp cocoa powder (optional)",
                "1 tbsp almond milk"
            ],
            method: [
                "Blend frozen bananas until creamy",
                "Add protein powder and blend",
                "Add milk if needed",
                "Serve immediately or freeze"
            ],
            tips: "Freeze bananas overnight for best texture",
            image: getFoodImage('Strawberry Protein Ice Cream', 'Protein Banana Nice Cream'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Protein Popsicles",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 4,
            protein: 12,
            calories: 100,
            ingredients: [
                "1 scoop strawberry protein powder",
                "1 cup Greek yogurt",
                "1/2 cup berries",
                "1 tbsp honey"
            ],
            method: [
                "Blend all ingredients",
                "Pour into popsicle molds",
                "Freeze for 4+ hours"
            ],
            tips: "Use silicone molds for easy removal",
            image: getFoodImage('Strawberry Protein Ice Cream', 'Protein Popsicles'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Frozen Yogurt",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 20,
            calories: 180,
            ingredients: [
                "1 cup Greek yogurt",
                "1 scoop vanilla protein powder",
                "1/2 cup frozen berries",
                "1 tbsp honey"
            ],
            method: [
                "Mix protein powder with yogurt",
                "Fold in berries",
                "Freeze for 2 hours",
                "Stir every 30 minutes"
            ],
            tips: "Don't freeze completely solid - aim for soft-serve texture",
            image: getFoodImage('Vanilla Protein Ice Cream', 'Protein Frozen Yogurt'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Milkshake",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 26,
            calories: 280,
            ingredients: [
                "1 scoop chocolate protein powder",
                "1 cup milk",
                "1/2 frozen banana",
                "2 tbsp vanilla ice cream",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until thick",
                "Serve immediately"
            ],
            tips: "Add more ice for thicker shake",
            image: getFoodImage('Chocolate Protein Shake', 'Protein Milkshake'),
            dietary: []
        },
        {
            name: "Protein Iced Coffee",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 20,
            calories: 90,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 cup cold brew coffee",
                "1/4 cup milk",
                "Ice cubes"
            ],
            method: [
                "Mix protein powder with milk",
                "Pour over ice",
                "Top with cold brew",
                "Stir and enjoy"
            ],
            tips: "Use flavored protein for variety",
            image: getFoodImage('Chocolate Protein Shake', 'Protein Iced Coffee'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein French Toast Sticks",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "8 min",
            servings: 2,
            protein: 28,
            calories: 300,
            ingredients: [
                "4 slices bread",
                "2 scoops vanilla protein powder",
                "2 eggs",
                "1/4 cup milk",
                "1 tsp cinnamon"
            ],
            method: [
                "Cut bread into sticks",
                "Mix eggs, protein powder, milk, and cinnamon",
                "Dip bread sticks in mixture",
                "Cook on pan until golden",
                "Serve with syrup"
            ],
            tips: "Use day-old bread for best texture",
            image: getFoodImage('Vanilla Protein Pancakes', 'Protein French Toast Sticks'),
            dietary: []
        },
        {
            name: "Protein Breakfast Burrito",
            category: "breakfast",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "10 min",
            servings: 1,
            protein: 35,
            calories: 420,
            ingredients: [
                "1 large tortilla",
                "2 eggs",
                "1 scoop unflavored protein powder",
                "1/4 cup black beans",
                "2 tbsp cheese",
                "Salsa"
            ],
            method: [
                "Scramble eggs with protein powder",
                "Warm tortilla",
                "Add eggs, beans, and cheese",
                "Roll into burrito",
                "Top with salsa"
            ],
            tips: "Use unflavored protein to avoid sweet taste",
            image: getFoodImage('High-Protein Omelette', 'Protein Breakfast Burrito'),
            dietary: []
        },
        {
            name: "Protein Breakfast Bowl",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "10 min",
            servings: 1,
            protein: 30,
            calories: 380,
            ingredients: [
                "2 eggs",
                "1 scoop unflavored protein powder",
                "1/2 cup quinoa",
                "1/4 cup vegetables",
                "1 tbsp olive oil"
            ],
            method: [
                "Cook quinoa",
                "Scramble eggs with protein powder",
                "Saute vegetables",
                "Combine in bowl",
                "Drizzle with olive oil"
            ],
            tips: "Use pre-cooked quinoa for faster prep",
            image: getFoodImage('Protein Overnight Oats', 'Protein Breakfast Bowl'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Oatmeal Bowl",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "5 min",
            servings: 1,
            protein: 26,
            calories: 340,
            ingredients: [
                "1/2 cup rolled oats",
                "1 scoop vanilla protein powder",
                "1 cup water or milk",
                "1/2 banana",
                "1 tbsp nuts"
            ],
            method: [
                "Cook oats in water/milk",
                "Stir in protein powder",
                "Top with banana and nuts",
                "Serve hot"
            ],
            tips: "Add protein powder after cooking to preserve nutrients",
            image: getFoodImage('Vanilla Steel Cut Oatmeal', 'Protein Oatmeal Bowl'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Scrambled Eggs",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "2 min",
            cookTime: "5 min",
            servings: 2,
            protein: 32,
            calories: 280,
            ingredients: [
                "4 eggs",
                "1 scoop unflavored protein powder",
                "1 tbsp butter",
                "Salt and pepper"
            ],
            method: [
                "Whisk eggs with protein powder",
                "Melt butter in pan",
                "Cook eggs until set",
                "Season with salt and pepper"
            ],
            tips: "Cook on low heat for creamy texture",
            image: getFoodImage('Scrambled Eggs', 'Protein Scrambled Eggs'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Breakfast Smoothie",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 28,
            calories: 320,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1/2 cup Greek yogurt",
                "1/2 banana",
                "1/4 cup oats",
                "1 cup milk",
                "1 tbsp almond butter"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately"
            ],
            tips: "Soak oats overnight for creamier texture",
            image: getFoodImage('Strawberry Protein Smoothie', 'Protein Breakfast Smoothie'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Banana Bread Muffins",
            category: "baked",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 12,
            protein: 8,
            calories: 180,
            ingredients: [
                "2 scoops banana protein powder",
                "2 ripe bananas",
                "1 1/2 cups flour",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking powder"
            ],
            method: [
                "Mash bananas",
                "Mix all ingredients",
                "Fill muffin tins",
                "Bake at 350°F for 20 minutes"
            ],
            tips: "Use very ripe bananas for sweetness",
            image: getFoodImage('Protein Banana Bread', 'Protein Banana Bread Muffins'),
            dietary: []
        },
        {
            name: "Protein Cinnamon Rolls",
            category: "baked",
            difficulty: "advanced",
            prepTime: "30 min",
            cookTime: "25 min",
            servings: 8,
            protein: 12,
            calories: 240,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups flour",
                "1/4 cup butter",
                "1/4 cup brown sugar",
                "1 tsp cinnamon",
                "1 packet yeast"
            ],
            method: [
                "Make dough with protein powder",
                "Roll out and spread butter mixture",
                "Roll up and slice",
                "Bake at 375°F for 25 minutes",
                "Top with protein glaze"
            ],
            tips: "Let dough rise twice for fluffy rolls",
            image: getFoodImage('Birthday Cake Protein', 'Protein Cinnamon Rolls'),
            dietary: []
        },
        {
            name: "Protein Bagels",
            category: "baked",
            difficulty: "advanced",
            prepTime: "20 min",
            cookTime: "20 min",
            servings: 4,
            protein: 16,
            calories: 220,
            ingredients: [
                "2 scoops unflavored protein powder",
                "1 cup Greek yogurt",
                "1 1/2 cups self-rising flour",
                "1 egg white"
            ],
            method: [
                "Mix ingredients into dough",
                "Shape into bagels",
                "Brush with egg white",
                "Bake at 375°F for 20 minutes"
            ],
            tips: "Use self-rising flour for best results",
            image: getFoodImage('Vanilla Protein Pancakes', 'Protein Bagels'),
            dietary: []
        },
        {
            name: "Protein Pretzels",
            category: "snacks",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "15 min",
            servings: 8,
            protein: 10,
            calories: 160,
            ingredients: [
                "2 scoops unflavored protein powder",
                "2 cups flour",
                "1 cup warm water",
                "1 packet yeast",
                "Coarse salt"
            ],
            method: [
                "Make dough with protein powder",
                "Shape into pretzels",
                "Boil briefly in water",
                "Bake at 425°F for 15 minutes",
                "Sprinkle with salt"
            ],
            tips: "Boiling gives pretzels their characteristic texture",
            image: getFoodImage('Protein Cookies', 'Protein Pretzels'),
            dietary: []
        },
        {
            name: "Protein Pizza Crust",
            category: "savory",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "15 min",
            servings: 2,
            protein: 24,
            calories: 280,
            ingredients: [
                "2 scoops unflavored protein powder",
                "1 cup Greek yogurt",
                "1 1/2 cups flour",
                "1 tsp baking powder"
            ],
            method: [
                "Mix into dough",
                "Roll out thin",
                "Pre-bake at 400°F for 8 minutes",
                "Add toppings and bake 7 more minutes"
            ],
            tips: "Pre-baking prevents soggy crust",
            image: getFoodImage('High-Protein Omelette', 'Protein Pizza Crust'),
            dietary: []
        },
        {
            name: "Protein Mac and Cheese",
            category: "savory",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "15 min",
            servings: 2,
            protein: 32,
            calories: 380,
            ingredients: [
                "2 oz pasta",
                "2 scoops unflavored protein powder",
                "1/4 cup milk",
                "2 tbsp cheese",
                "1 tbsp butter"
            ],
            method: [
                "Cook pasta",
                "Make sauce with protein powder and milk",
                "Add cheese and butter",
                "Combine with pasta"
            ],
            tips: "Use unflavored protein to avoid sweet taste",
            image: getFoodImage('High-Protein Omelette', 'Protein Mac and Cheese'),
            dietary: []
        },
        {
            name: "Protein Soup",
            category: "savory",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "20 min",
            servings: 2,
            protein: 26,
            calories: 220,
            ingredients: [
                "2 scoops unflavored protein powder",
                "2 cups broth",
                "1/2 cup vegetables",
                "1/4 cup chicken",
                "Herbs and spices"
            ],
            method: [
                "Cook vegetables in broth",
                "Add protein powder",
                "Stir in cooked chicken",
                "Season and serve"
            ],
            tips: "Whisk protein powder into cold broth first",
            image: getFoodImage('High-Protein Omelette', 'Protein Soup'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Pasta Sauce",
            category: "savory",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "15 min",
            servings: 2,
            protein: 22,
            calories: 180,
            ingredients: [
                "1 scoop unflavored protein powder",
                "1 can tomatoes",
                "1/4 cup onions",
                "2 cloves garlic",
                "Herbs and spices"
            ],
            method: [
                "Saute onions and garlic",
                "Add tomatoes and simmer",
                "Stir in protein powder",
                "Season and serve over pasta"
            ],
            tips: "Use unflavored protein for savory dishes",
            image: getFoodImage('High-Protein Omelette', 'Protein Pasta Sauce'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Chicken Meatballs",
            category: "savory",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 4,
            protein: 28,
            calories: 240,
            ingredients: [
                "1 lb ground chicken",
                "2 scoops unflavored protein powder",
                "1 egg",
                "1/4 cup breadcrumbs",
                "Herbs and spices"
            ],
            method: [
                "Mix all ingredients",
                "Form into balls",
                "Bake at 375°F for 20 minutes",
                "Serve with sauce"
            ],
            tips: "Don't overmix or meatballs will be tough",
            image: getFoodImage('High-Protein Omelette', 'Protein Chicken Meatballs'),
            dietary: []
        },
        {
            name: "Protein Taco Seasoning Mix",
            category: "savory",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 4,
            protein: 4,
            calories: 20,
            ingredients: [
                "1 scoop unflavored protein powder",
                "1 tbsp chili powder",
                "1 tsp cumin",
                "1 tsp paprika",
                "Salt and pepper"
            ],
            method: [
                "Mix all spices with protein powder",
                "Use to season meat or vegetables"
            ],
            tips: "Store in airtight container for up to 6 months",
            image: getFoodImage('High-Protein Omelette', 'Protein Taco Seasoning Mix'),
            dietary: ["gluten-free"]
        },
        {
            name: "Chocolate Protein Donuts",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "12 min",
            servings: 6,
            protein: 12,
            calories: 200,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1 cup flour",
                "1/4 cup cocoa powder",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients",
                "Fill donut pan",
                "Bake at 350°F for 12 minutes",
                "Glaze if desired"
            ],
            tips: "Use a donut pan for perfect shape",
            image: getFoodImage('Birthday Cake Protein', 'Chocolate Protein Donuts'),
            dietary: []
        },
        {
            name: "Protein Rice Krispie Treats",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 9,
            protein: 8,
            calories: 160,
            ingredients: [
                "2 scoops vanilla protein powder",
                "3 cups Rice Krispies",
                "1/4 cup marshmallows",
                "2 tbsp butter"
            ],
            method: [
                "Melt marshmallows and butter",
                "Stir in protein powder",
                "Mix with cereal",
                "Press into pan",
                "Cool and cut"
            ],
            tips: "Use mini marshmallows for easier melting",
            image: getFoodImage('Protein Cookies', 'Protein Rice Krispie Treats'),
            dietary: []
        },
        {
            name: "Protein Truffles",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "20 min",
            cookTime: "0 min",
            servings: 12,
            protein: 6,
            calories: 120,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1/2 cup dates",
                "1/4 cup almonds",
                "2 tbsp cocoa powder",
                "Coconut flakes for rolling"
            ],
            method: [
                "Blend dates until paste",
                "Add protein powder and nuts",
                "Form into balls",
                "Roll in coconut",
                "Chill for 1 hour"
            ],
            tips: "Store in fridge for best texture",
            image: getFoodImage('Protein Energy Balls', 'Protein Truffles'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Protein Banana Pudding",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 4,
            protein: 16,
            calories: 220,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups Greek yogurt",
                "2 bananas",
                "1/2 cup vanilla wafers",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix protein powder with yogurt",
                "Layer with bananas and wafers",
                "Chill for 2 hours",
                "Serve cold"
            ],
            tips: "Let wafers soften slightly for classic texture",
            image: getFoodImage('Protein Parfait', 'Protein Banana Pudding'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Bread Pudding",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "35 min",
            servings: 6,
            protein: 14,
            calories: 280,
            ingredients: [
                "4 cups bread cubes",
                "2 scoops vanilla protein powder",
                "2 eggs",
                "1 1/2 cups milk",
                "1/4 cup sugar",
                "1 tsp cinnamon"
            ],
            method: [
                "Mix protein powder with eggs and milk",
                "Pour over bread cubes",
                "Bake at 350°F for 35 minutes",
                "Serve warm"
            ],
            tips: "Use day-old bread for best results",
            image: getFoodImage('Protein Banana Bread', 'Protein Bread Pudding'),
            dietary: []
        },
        {
            name: "Protein Chocolate Chip Cookies",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "12 min",
            servings: 12,
            protein: 8,
            calories: 160,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup flour",
                "1/2 cup butter",
                "1/4 cup sugar",
                "1/2 cup chocolate chips",
                "1 egg"
            ],
            method: [
                "Cream butter and sugar",
                "Add egg and protein powder",
                "Mix in flour and chips",
                "Bake at 375°F for 12 minutes"
            ],
            tips: "Don't overbake - cookies continue cooking on pan",
            image: getFoodImage('Protein Cookies', 'Protein Chocolate Chip Cookies'),
            dietary: []
        },
        {
            name: "Protein Oatmeal Cookies",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "12 min",
            servings: 18,
            protein: 6,
            calories: 120,
            ingredients: [
                "1 scoop vanilla protein powder",
                "1 1/2 cups oats",
                "1/2 cup flour",
                "1/4 cup butter",
                "1/4 cup honey",
                "1 egg",
                "Raisins or chocolate chips"
            ],
            method: [
                "Mix all ingredients",
                "Drop onto baking sheet",
                "Bake at 350°F for 12 minutes"
            ],
            tips: "Add more oats for chewier cookies",
            image: getFoodImage('Protein Cookies', 'Protein Oatmeal Cookies'),
            dietary: []
        },
        {
            name: "Protein Peanut Butter Cookies",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "10 min",
            servings: 12,
            protein: 10,
            calories: 180,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1/2 cup peanut butter",
                "1/4 cup honey",
                "1 egg",
                "1 tsp vanilla"
            ],
            method: [
                "Mix all ingredients",
                "Form into balls",
                "Flatten with fork",
                "Bake at 350°F for 10 minutes"
            ],
            tips: "Use natural peanut butter for best results",
            image: getFoodImage('Protein Cookies', 'Protein Peanut Butter Cookies'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Protein Lemon Bars",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "25 min",
            servings: 9,
            protein: 10,
            calories: 200,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup flour",
                "1/2 cup butter",
                "3 eggs",
                "1/2 cup lemon juice",
                "1/4 cup sugar"
            ],
            method: [
                "Make crust with flour, butter, and 1 scoop protein",
                "Bake crust 10 minutes",
                "Make filling with eggs, lemon, sugar, and protein",
                "Pour over crust and bake 15 minutes"
            ],
            tips: "Let cool completely before cutting",
            image: getFoodImage('Protein Cheesecake', 'Protein Lemon Bars'),
            dietary: []
        },
        {
            name: "Protein Apple Crisp",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "30 min",
            servings: 6,
            protein: 12,
            calories: 240,
            ingredients: [
                "4 apples",
                "2 scoops vanilla protein powder",
                "1 cup oats",
                "1/4 cup butter",
                "1/4 cup brown sugar",
                "1 tsp cinnamon"
            ],
            method: [
                "Slice apples and place in pan",
                "Mix protein powder, oats, butter, sugar for topping",
                "Sprinkle over apples",
                "Bake at 375°F for 30 minutes"
            ],
            tips: "Use tart apples like Granny Smith",
            image: getFoodImage('Protein Cookies', 'Protein Apple Crisp'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Crème Brûlée",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "15 min",
            cookTime: "40 min",
            servings: 4,
            protein: 14,
            calories: 220,
            ingredients: [
                "2 scoops vanilla protein powder",
                "4 egg yolks",
                "1 cup heavy cream",
                "1/4 cup sugar",
                "1 tsp vanilla"
            ],
            method: [
                "Heat cream until steaming",
                "Whisk yolks with sugar and protein",
                "Temper eggs with hot cream",
                "Bake in water bath at 325°F for 40 minutes",
                "Chill and caramelize sugar on top"
            ],
            tips: "Water bath prevents curdling",
            image: getFoodImage('Protein Cheesecake', 'Protein Crème Brûlée'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Flan",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "20 min",
            cookTime: "50 min",
            servings: 6,
            protein: 12,
            calories: 200,
            ingredients: [
                "2 scoops vanilla protein powder",
                "6 eggs",
                "2 cups milk",
                "1/2 cup sugar",
                "1 tsp vanilla"
            ],
            method: [
                "Caramelize sugar in ramekins",
                "Mix eggs, milk, protein powder, vanilla",
                "Pour into ramekins",
                "Bake in water bath at 350°F for 50 minutes",
                "Chill and invert to serve"
            ],
            tips: "Don't overbake or flan will be rubbery",
            image: getFoodImage('Protein Cheesecake', 'Protein Flan'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Churros",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "20 min",
            cookTime: "15 min",
            servings: 12,
            protein: 8,
            calories: 180,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup water",
                "1/2 cup butter",
                "1 cup flour",
                "2 eggs",
                "Cinnamon sugar"
            ],
            method: [
                "Boil water and butter",
                "Stir in flour and protein",
                "Add eggs one at a time",
                "Pipe into hot oil",
                "Fry until golden",
                "Roll in cinnamon sugar"
            ],
            tips: "Oil should be 375°F for perfect churros",
            image: getFoodImage('Protein Donuts', 'Protein Churros'),
            dietary: []
        },
        {
            name: "Protein Tiramisu",
            category: "desserts",
            difficulty: "advanced",
            prepTime: "30 min",
            cookTime: "0 min",
            servings: 6,
            protein: 16,
            calories: 280,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 cup mascarpone",
                "1/2 cup coffee",
                "Ladyfingers",
                "Cocoa powder"
            ],
            method: [
                "Mix protein powder with mascarpone",
                "Dip ladyfingers in coffee",
                "Layer with mascarpone mixture",
                "Dust with cocoa",
                "Chill 4+ hours"
            ],
            tips: "Don't soak ladyfingers too long or they'll fall apart",
            image: getFoodImage('Cookies & Cream Protein Tiramisu', 'Protein Tiramisu'),
            dietary: []
        },
        {
            name: "Protein Cheesecake Bars",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "30 min",
            servings: 12,
            protein: 12,
            calories: 220,
            ingredients: [
                "2 scoops vanilla protein powder",
                "16 oz cream cheese",
                "2 eggs",
                "1/4 cup sugar",
                "1 cup graham cracker crumbs",
                "1/4 cup butter"
            ],
            method: [
                "Make crust with crumbs and butter",
                "Mix protein powder with cream cheese",
                "Add eggs and sugar",
                "Pour over crust",
                "Bake at 325°F for 30 minutes",
                "Chill before cutting"
            ],
            tips: "Room temperature cream cheese mixes better",
            image: getFoodImage('Protein Cheesecake', 'Protein Cheesecake Bars'),
            dietary: []
        },
        {
            name: "Protein Pumpkin Pie",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "50 min",
            servings: 8,
            protein: 10,
            calories: 240,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 can pumpkin",
                "2 eggs",
                "1/2 cup milk",
                "1/4 cup sugar",
                "Pie crust",
                "Pumpkin pie spices"
            ],
            method: [
                "Mix all ingredients",
                "Pour into pie crust",
                "Bake at 425°F for 15 minutes",
                "Reduce to 350°F and bake 35 more minutes"
            ],
            tips: "Use pre-made crust for easier prep",
            image: getFoodImage('Protein Cheesecake', 'Protein Pumpkin Pie'),
            dietary: []
        },
        {
            name: "Protein Key Lime Pie",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "20 min",
            cookTime: "15 min",
            servings: 8,
            protein: 12,
            calories: 260,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1 can sweetened condensed milk",
                "1/2 cup key lime juice",
                "3 egg yolks",
                "Graham cracker crust"
            ],
            method: [
                "Mix protein powder with condensed milk",
                "Add lime juice and yolks",
                "Pour into crust",
                "Bake at 350°F for 15 minutes",
                "Chill before serving"
            ],
            tips: "Use fresh key lime juice for best flavor",
            image: getFoodImage('Protein Cheesecake', 'Protein Key Lime Pie'),
            dietary: []
        },
        {
            name: "Protein Chocolate Mousse",
            category: "desserts",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 4,
            protein: 14,
            calories: 200,
            ingredients: [
                "2 scoops chocolate protein powder",
                "1 cup heavy cream",
                "1/4 cup cocoa powder",
                "2 tbsp sugar",
                "1 tsp vanilla"
            ],
            method: [
                "Whip cream until stiff",
                "Fold in protein powder and cocoa",
                "Add vanilla",
                "Chill for 2 hours"
            ],
            tips: "Don't overmix or mousse will deflate",
            image: getFoodImage('Protein Mousse', 'Protein Chocolate Mousse'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Vanilla Pudding",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "10 min",
            servings: 4,
            protein: 12,
            calories: 160,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups milk",
                "1/4 cup cornstarch",
                "1/4 cup sugar",
                "1 tsp vanilla"
            ],
            method: [
                "Heat milk until steaming",
                "Mix cornstarch and sugar",
                "Whisk into hot milk",
                "Cook until thick",
                "Stir in protein powder and vanilla",
                "Chill before serving"
            ],
            tips: "Stir constantly to prevent lumps",
            image: getFoodImage('Protein Parfait', 'Protein Vanilla Pudding'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Chocolate Pudding",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "10 min",
            servings: 4,
            protein: 14,
            calories: 180,
            ingredients: [
                "2 scoops chocolate protein powder",
                "2 cups milk",
                "1/4 cup cornstarch",
                "2 tbsp cocoa powder",
                "1/4 cup sugar"
            ],
            method: [
                "Heat milk until steaming",
                "Mix cornstarch, cocoa, and sugar",
                "Whisk into hot milk",
                "Cook until thick",
                "Stir in protein powder",
                "Chill before serving"
            ],
            tips: "Use dark cocoa for richer flavor",
            image: getFoodImage('Protein Mousse', 'Protein Chocolate Pudding'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Butterscotch Pudding",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "10 min",
            servings: 4,
            protein: 12,
            calories: 190,
            ingredients: [
                "2 scoops vanilla protein powder",
                "2 cups milk",
                "1/4 cup brown sugar",
                "1/4 cup cornstarch",
                "2 tbsp butter",
                "1 tsp vanilla"
            ],
            method: [
                "Melt butter and brown sugar",
                "Heat milk until steaming",
                "Mix cornstarch with milk",
                "Combine with sugar mixture",
                "Cook until thick",
                "Stir in protein powder and vanilla",
                "Chill before serving"
            ],
            tips: "Brown the sugar slightly for deeper flavor",
            image: getFoodImage('Protein Parfait', 'Protein Butterscotch Pudding'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Tapioca Pudding",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "15 min",
            servings: 4,
            protein: 12,
            calories: 200,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1/3 cup tapioca pearls",
                "2 cups milk",
                "1/4 cup sugar",
                "1 egg",
                "1 tsp vanilla"
            ],
            method: [
                "Soak tapioca in milk 30 minutes",
                "Cook until pearls are translucent",
                "Whisk in egg",
                "Stir in protein powder, sugar, and vanilla",
                "Chill before serving"
            ],
            tips: "Don't skip the soaking step",
            image: getFoodImage('Protein Parfait', 'Protein Tapioca Pudding'),
            dietary: ["gluten-free"]
        },
        {
            name: "Protein Rice Pudding",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "25 min",
            servings: 4,
            protein: 14,
            calories: 220,
            ingredients: [
                "2 scoops vanilla protein powder",
                "1/2 cup rice",
                "2 cups milk",
                "1/4 cup sugar",
                "1 tsp vanilla",
                "Cinnamon"
            ],
            method: [
                "Cook rice in milk until tender",
                "Stir in sugar and vanilla",
                "Add protein powder",
                "Chill before serving",
                "Sprinkle with cinnamon"
            ],
            tips: "Use short-grain rice for creamier texture",
            image: getFoodImage('Strawberry Oatmeal', 'Protein Rice Pudding'),
            dietary: ["gluten-free"]
        }
    ],

    // Trending Flavors 2024
    matcha: [
        {
            name: "Matcha Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 180,
            ingredients: [
                "1 scoop matcha protein powder",
                "1 tsp matcha powder (optional)",
                "1 cup almond milk",
                "1/2 frozen banana",
                "1 tbsp honey",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Top with extra matcha powder if desired"
            ],
            tips: "Use ceremonial grade matcha for the best antioxidant benefits",
            image: getFoodImage('Strawberry Protein Smoothie', 'Matcha Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Matcha Protein Overnight Oats",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 28,
            calories: 320,
            ingredients: [
                "1 scoop matcha protein powder",
                "1/2 cup rolled oats",
                "1/2 cup almond milk",
                "1 tsp matcha powder",
                "1 tbsp chia seeds",
                "1 tbsp honey"
            ],
            method: [
                "Mix all ingredients in a jar",
                "Stir until combined",
                "Refrigerate overnight",
                "Top with fresh berries before serving"
            ],
            tips: "Matcha pairs perfectly with berries for a refreshing breakfast",
            image: getFoodImage('Protein Overnight Oats', 'Matcha Protein Overnight Oats'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Matcha Protein Energy Balls",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 12,
            protein: 7,
            calories: 95,
            ingredients: [
                "1 scoop matcha protein powder",
                "1/2 cup dates",
                "1/4 cup almonds",
                "1 tsp matcha powder",
                "1 tbsp coconut oil"
            ],
            method: [
                "Blend dates until paste forms",
                "Add protein powder, matcha, and almonds",
                "Mix in coconut oil",
                "Roll into 12 balls",
                "Chill for 30 minutes"
            ],
            tips: "Store in fridge - the matcha keeps them energizing!",
            image: getFoodImage('Protein Energy Balls', 'Matcha Protein Energy Balls'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Matcha Protein Ice Cream",
            category: "frozen",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 4,
            protein: 16,
            calories: 200,
            ingredients: [
                "2 scoops matcha protein powder",
                "2 frozen bananas",
                "1 tsp matcha powder",
                "1/4 cup coconut milk",
                "1 tbsp honey"
            ],
            method: [
                "Blend frozen bananas until creamy",
                "Add protein powder and matcha",
                "Blend with coconut milk",
                "Freeze for 2 hours",
                "Stir and serve"
            ],
            tips: "Matcha gives this ice cream a beautiful green color and antioxidant boost",
            image: getFoodImage('Strawberry Protein Ice Cream', 'Matcha Protein Ice Cream'),
            dietary: ["gluten-free", "dairy-free"]
        }
    ],

    peach: [
        {
            name: "Peach Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 23,
            calories: 190,
            ingredients: [
                "1 scoop peach protein powder",
                "1 cup frozen peaches",
                "1/2 cup Greek yogurt",
                "1/2 cup almond milk",
                "1 tsp honey",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Garnish with fresh peach slice"
            ],
            tips: "Frozen peaches make this smoothie naturally thick and creamy",
            image: getFoodImage('Strawberry Protein Smoothie', 'Peach Protein Smoothie'),
            dietary: ["gluten-free"]
        },
        {
            name: "Peach Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 26,
            calories: 310,
            ingredients: [
                "2 scoops peach protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup diced peaches",
                "1/4 cup milk",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all dry ingredients",
                "Add eggs and milk, whisk until smooth",
                "Fold in diced peaches",
                "Cook on pan until golden",
                "Serve with fresh peach slices"
            ],
            tips: "Fresh or frozen peaches both work - frozen will make pancakes extra moist",
            image: getFoodImage('Chocolate Protein Pancakes', 'Peach Protein Pancakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Peach Protein Parfait",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 2,
            protein: 24,
            calories: 280,
            ingredients: [
                "2 scoops peach protein powder",
                "1 cup Greek yogurt",
                "1 cup sliced peaches",
                "1/4 cup granola",
                "1 tbsp honey"
            ],
            method: [
                "Mix protein powder with yogurt",
                "Layer yogurt, peaches, and granola",
                "Drizzle with honey",
                "Serve chilled"
            ],
            tips: "Perfect summer breakfast - light, refreshing, and protein-packed",
            image: getFoodImage('Protein Parfait', 'Peach Protein Parfait'),
            dietary: ["gluten-free"]
        },
        {
            name: "Peach Protein Muffins",
            category: "baked",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 12,
            protein: 9,
            calories: 170,
            ingredients: [
                "2 scoops peach protein powder",
                "1 cup diced peaches",
                "1 1/2 cups flour",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking powder"
            ],
            method: [
                "Mix dry ingredients",
                "Add eggs and honey",
                "Fold in diced peaches",
                "Fill muffin tins",
                "Bake at 350°F for 20 minutes"
            ],
            tips: "Use ripe peaches for maximum flavor and natural sweetness",
            image: getFoodImage('Birthday Cake Protein', 'Peach Protein Muffins'),
            dietary: []
        }
    ],

    mocha: [
        {
            name: "Mocha Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 25,
            calories: 200,
            ingredients: [
                "1 scoop mocha protein powder",
                "1 cup cold brew coffee",
                "1/2 frozen banana",
                "1 tbsp cocoa powder",
                "1/4 cup milk",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately over ice",
                "Top with cocoa powder if desired"
            ],
            tips: "The perfect morning smoothie - coffee and protein in one delicious drink",
            image: getFoodImage('Chocolate Protein Shake', 'Mocha Protein Smoothie'),
            dietary: ["gluten-free"]
        },
        {
            name: "Mocha Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 27,
            calories: 300,
            ingredients: [
                "2 scoops mocha protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup strong coffee",
                "1 tbsp cocoa powder",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all dry ingredients",
                "Add eggs and coffee",
                "Cook on pan until golden",
                "Serve with berries"
            ],
            tips: "Coffee enhances the chocolate flavor - use freshly brewed for best taste",
            image: getFoodImage('Chocolate Protein Pancakes', 'Mocha Protein Pancakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Mocha Protein Brownies",
            category: "desserts",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 9,
            protein: 19,
            calories: 190,
            ingredients: [
                "2 scoops mocha protein powder",
                "1/2 cup almond flour",
                "1/4 cup cocoa powder",
                "1/4 cup strong coffee",
                "2 eggs",
                "1/4 cup honey"
            ],
            method: [
                "Mix all ingredients until smooth",
                "Pour into pan",
                "Bake at 350°F for 20 minutes",
                "Cool before cutting"
            ],
            tips: "The coffee adds depth to the chocolate - these are decadent!",
            image: getFoodImage('Protein Brownies', 'Mocha Protein Brownies'),
            dietary: ["gluten-free"]
        }
    ],

    "cookies-cream": [
        {
            name: "Cookies & Cream Protein Shake",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 26,
            calories: 290,
            ingredients: [
                "1 scoop cookies & cream protein powder",
                "1 cup milk",
                "1/2 frozen banana",
                "2 crushed cookies (optional)",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Top with cookie crumbs"
            ],
            tips: "Crush real cookies into the shake for extra cookie flavor",
            image: getFoodImage('Cookies & Cream Protein Shake', 'Cookies & Cream Protein Shake'),
            dietary: []
        },
        {
            name: "Cookies & Cream Protein Ice Cream",
            category: "frozen",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 4,
            protein: 18,
            calories: 240,
            ingredients: [
                "2 scoops cookies & cream protein powder",
                "2 frozen bananas",
                "1/4 cup crushed cookies",
                "1/4 cup almond milk",
                "1 tsp vanilla"
            ],
            method: [
                "Blend frozen bananas until creamy",
                "Add protein powder and vanilla",
                "Fold in crushed cookies",
                "Freeze for 2 hours",
                "Stir and serve"
            ],
            tips: "The classic flavor - cookies & cream never gets old!",
            image: getFoodImage('Cookies & Cream Protein Ice Cream', 'Cookies & Cream Protein Ice Cream'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Cookies & Cream Protein Muffins",
            category: "baked",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "18 min",
            servings: 12,
            protein: 10,
            calories: 200,
            ingredients: [
                "2 scoops cookies & cream protein powder",
                "1 1/2 cups flour",
                "2 eggs",
                "1/4 cup honey",
                "1/2 cup crushed cookies",
                "1 tsp baking powder"
            ],
            method: [
                "Mix dry ingredients",
                "Add eggs and honey",
                "Fold in crushed cookies",
                "Fill muffin tins",
                "Bake at 350°F for 18 minutes"
            ],
            tips: "Reserve some cookie chunks for the top before baking",
            image: getFoodImage('Birthday Cake Protein', 'Cookies & Cream Protein Muffins'),
            dietary: []
        }
    ],

    "birthday-cake": [
        {
            name: "Birthday Cake Protein Shake",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 280,
            ingredients: [
                "1 scoop birthday cake protein powder",
                "1 cup milk",
                "1/2 frozen banana",
                "1 tsp vanilla extract",
                "Sprinkles for garnish",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Top with sprinkles for celebration vibes"
            ],
            tips: "Every day can be a birthday with this festive shake!",
            image: getFoodImage('Birthday Cake Protein', 'Birthday Cake Protein Shake'),
            dietary: []
        },
        {
            name: "Birthday Cake Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 26,
            calories: 310,
            ingredients: [
                "2 scoops birthday cake protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup milk",
                "1 tsp vanilla extract",
                "Sprinkles",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients except sprinkles",
                "Stir in sprinkles",
                "Cook on pan until golden",
                "Top with more sprinkles and syrup"
            ],
            tips: "The sprinkles make breakfast feel like dessert!",
            image: getFoodImage('Chocolate Protein Pancakes', 'Birthday Cake Protein Pancakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Birthday Cake Protein Muffins",
            category: "baked",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 12,
            protein: 9,
            calories: 180,
            ingredients: [
                "2 scoops birthday cake protein powder",
                "1 1/2 cups flour",
                "2 eggs",
                "1/4 cup honey",
                "1/4 cup sprinkles",
                "1 tsp vanilla extract"
            ],
            method: [
                "Mix all ingredients",
                "Fold in sprinkles",
                "Fill muffin tins",
                "Bake at 350°F for 20 minutes",
                "Cool and add frosting if desired"
            ],
            tips: "Perfect for actual birthdays - kids and adults both love these!",
            image: getFoodImage('Birthday Cake Protein', 'Birthday Cake Protein Muffins'),
            dietary: []
        }
    ],

    "salted-caramel": [
        {
            name: "Salted Caramel Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 25,
            calories: 220,
            ingredients: [
                "1 scoop salted caramel protein powder",
                "1 cup milk",
                "1/2 frozen banana",
                "1 tbsp caramel sauce",
                "Pinch of sea salt",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Drizzle with extra caramel"
            ],
            tips: "The salt enhances the caramel flavor - don't skip it!",
            image: getFoodImage('Caramel Protein Pancakes', 'Salted Caramel Protein Smoothie'),
            dietary: []
        },
        {
            name: "Salted Caramel Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 27,
            calories: 320,
            ingredients: [
                "2 scoops salted caramel protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup milk",
                "1 tbsp caramel sauce",
                "Sea salt for topping"
            ],
            method: [
                "Mix all ingredients except salt",
                "Cook on pan until golden",
                "Drizzle with caramel",
                "Sprinkle with sea salt"
            ],
            tips: "This flavor combination is trending for a reason - it's addictively good!",
            image: getFoodImage('Caramel Protein Pancakes', 'Salted Caramel Protein Pancakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Salted Caramel Protein Bars",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 8,
            protein: 14,
            calories: 210,
            ingredients: [
                "2 scoops salted caramel protein powder",
                "1 cup dates",
                "1/4 cup almonds",
                "2 tbsp caramel sauce",
                "1/4 tsp sea salt"
            ],
            method: [
                "Blend dates until paste",
                "Add protein powder and almonds",
                "Mix in caramel and salt",
                "Press into pan",
                "Chill for 1 hour and cut"
            ],
            tips: "Store in fridge - the caramel keeps them moist and delicious",
            image: getFoodImage('Protein Energy Balls', 'Salted Caramel Protein Bars'),
            dietary: ["gluten-free", "dairy-free"]
        }
    ],

    "cinnamon-roll": [
        {
            name: "Cinnamon Roll Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 230,
            ingredients: [
                "1 scoop cinnamon roll protein powder",
                "1 cup milk",
                "1/2 frozen banana",
                "1 tsp cinnamon",
                "1 tbsp cream cheese (optional)",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Top with cinnamon"
            ],
            tips: "Tastes just like a cinnamon roll - perfect for breakfast!",
            image: getFoodImage('Vanilla Protein Shake', 'Cinnamon Roll Protein Smoothie'),
            dietary: []
        },
        {
            name: "Cinnamon Roll Protein Overnight Oats",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 1,
            protein: 29,
            calories: 350,
            ingredients: [
                "1 scoop cinnamon roll protein powder",
                "1/2 cup rolled oats",
                "1/2 cup milk",
                "1 tsp cinnamon",
                "1 tbsp raisins",
                "1 tbsp cream cheese frosting (optional)"
            ],
            method: [
                "Mix all ingredients in a jar",
                "Stir until combined",
                "Refrigerate overnight",
                "Top with frosting in the morning"
            ],
            tips: "The raisins add natural sweetness and texture",
            image: getFoodImage('Protein Overnight Oats', 'Cinnamon Roll Protein Overnight Oats'),
            dietary: ["gluten-free"]
        },
        {
            name: "Cinnamon Roll Protein Muffins",
            category: "baked",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 12,
            protein: 10,
            calories: 190,
            ingredients: [
                "2 scoops cinnamon roll protein powder",
                "1 1/2 cups flour",
                "2 eggs",
                "1/4 cup brown sugar",
                "2 tsp cinnamon",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients",
                "Fill muffin tins",
                "Bake at 350°F for 20 minutes",
                "Top with cinnamon sugar or glaze"
            ],
            tips: "The house will smell amazing while these bake!",
            image: getFoodImage('Birthday Cake Protein', 'Cinnamon Roll Protein Muffins'),
            dietary: []
        }
    ],

    blueberry: [
        {
            name: "Blueberry Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 23,
            calories: 200,
            ingredients: [
                "1 scoop blueberry protein powder",
                "1 cup frozen blueberries",
                "1/2 cup Greek yogurt",
                "1/2 cup almond milk",
                "1 tbsp honey",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Top with fresh blueberries"
            ],
            tips: "Blueberries are packed with antioxidants - double health benefits!",
            image: getFoodImage('Strawberry Protein Smoothie', 'Blueberry Protein Smoothie'),
            dietary: ["gluten-free"]
        },
        {
            name: "Blueberry Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 26,
            calories: 300,
            ingredients: [
                "2 scoops blueberry protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup fresh blueberries",
                "1/4 cup milk",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all dry ingredients",
                "Add eggs and milk",
                "Gently fold in blueberries",
                "Cook on pan until golden",
                "Serve with maple syrup"
            ],
            tips: "Bursting blueberries in every bite - so good!",
            image: getFoodImage('Chocolate Protein Pancakes', 'Blueberry Protein Pancakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Blueberry Protein Muffins",
            category: "baked",
            difficulty: "intermediate",
            prepTime: "15 min",
            cookTime: "20 min",
            servings: 12,
            protein: 9,
            calories: 175,
            ingredients: [
                "2 scoops blueberry protein powder",
                "1 cup fresh blueberries",
                "1 1/2 cups flour",
                "2 eggs",
                "1/4 cup honey",
                "1 tsp baking powder"
            ],
            method: [
                "Mix dry ingredients",
                "Add eggs and honey",
                "Fold in blueberries carefully",
                "Fill muffin tins",
                "Bake at 350°F for 20 minutes"
            ],
            tips: "Classic flavor that never goes out of style",
            image: getFoodImage('Birthday Cake Protein', 'Blueberry Protein Muffins'),
            dietary: []
        }
    ],

    lemon: [
        {
            name: "Lemon Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 22,
            calories: 170,
            ingredients: [
                "1 scoop lemon protein powder",
                "1 cup almond milk",
                "1/2 frozen banana",
                "Juice of 1/2 lemon",
                "1 tbsp honey",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Garnish with lemon slice"
            ],
            tips: "Refreshing and light - perfect for summer mornings",
            image: getFoodImage('Strawberry Protein Smoothie', 'Lemon Protein Smoothie'),
            dietary: ["dairy-free", "gluten-free"]
        },
        {
            name: "Lemon Protein Pancakes",
            category: "breakfast",
            difficulty: "beginner",
            prepTime: "10 min",
            cookTime: "5 min",
            servings: 2,
            protein: 25,
            calories: 280,
            ingredients: [
                "2 scoops lemon protein powder",
                "1/2 cup oats",
                "2 eggs",
                "1/4 cup milk",
                "Zest and juice of 1 lemon",
                "1 tsp baking powder"
            ],
            method: [
                "Mix all ingredients",
                "Cook on pan until golden",
                "Serve with fresh berries"
            ],
            tips: "The lemon zest adds amazing flavor - don't skip it!",
            image: getFoodImage('Vanilla Protein Pancakes', 'Lemon Protein Pancakes'),
            dietary: ["gluten-free"]
        },
        {
            name: "Lemon Protein Energy Balls",
            category: "snacks",
            difficulty: "beginner",
            prepTime: "15 min",
            cookTime: "0 min",
            servings: 12,
            protein: 6,
            calories: 90,
            ingredients: [
                "1 scoop lemon protein powder",
                "1/2 cup dates",
                "1/4 cup almonds",
                "Zest of 1 lemon",
                "1 tbsp coconut oil"
            ],
            method: [
                "Blend dates until paste",
                "Add protein powder, lemon zest, and almonds",
                "Mix in coconut oil",
                "Roll into 12 balls",
                "Chill for 30 minutes"
            ],
            tips: "Bright, citrusy flavor that's energizing and refreshing",
            image: getFoodImage('Protein Energy Balls', 'Lemon Protein Energy Balls'),
            dietary: ["gluten-free", "dairy-free"]
        }
    ],

    "orange-cream": [
        {
            name: "Orange Cream Protein Smoothie",
            category: "beverages",
            difficulty: "beginner",
            prepTime: "3 min",
            cookTime: "0 min",
            servings: 1,
            protein: 24,
            calories: 210,
            ingredients: [
                "1 scoop orange cream protein powder",
                "1 cup milk",
                "1/2 frozen banana",
                "1/4 cup orange juice",
                "1 tsp vanilla extract",
                "Ice cubes"
            ],
            method: [
                "Blend all ingredients until smooth",
                "Serve immediately",
                "Garnish with orange slice"
            ],
            tips: "Tastes like a creamsicle - nostalgic and delicious!",
            image: getFoodImage('Strawberry Protein Smoothie', 'Orange Cream Protein Smoothie'),
            dietary: ["gluten-free"]
        },
        {
            name: "Orange Cream Protein Ice Cream",
            category: "frozen",
            difficulty: "intermediate",
            prepTime: "10 min",
            cookTime: "0 min",
            servings: 4,
            protein: 17,
            calories: 220,
            ingredients: [
                "2 scoops orange cream protein powder",
                "2 frozen bananas",
                "1/4 cup orange juice",
                "1 tsp vanilla extract",
                "1/4 cup coconut milk"
            ],
            method: [
                "Blend frozen bananas until creamy",
                "Add protein powder, orange juice, and vanilla",
                "Blend with coconut milk",
                "Freeze for 2 hours",
                "Stir and serve"
            ],
            tips: "The perfect summer treat - creamy and citrusy",
            image: getFoodImage('Strawberry Protein Ice Cream', 'Orange Cream Protein Ice Cream'),
            dietary: ["gluten-free", "dairy-free"]
        },
        {
            name: "Orange Cream Protein Popsicles",
            category: "frozen",
            difficulty: "beginner",
            prepTime: "5 min",
            cookTime: "0 min",
            servings: 4,
            protein: 13,
            calories: 110,
            ingredients: [
                "1 scoop orange cream protein powder",
                "1 cup Greek yogurt",
                "1/2 cup orange juice",
                "1 tbsp honey"
            ],
            method: [
                "Blend all ingredients",
                "Pour into popsicle molds",
                "Freeze for 4+ hours"
            ],
            tips: "Kids love these - and so do adults!",
            image: getFoodImage('Strawberry Protein Ice Cream', 'Orange Cream Protein Popsicles'),
            dietary: ["gluten-free"]
        }
    ]
};

// Enhanced Recipe Generator with Advanced Features
class RecipeGenerator {
    constructor() {
        this.recipes = recipes; // Using the recipes object
        this.currentRecipe = null;
        this.favorites = this.loadFavorites();
        this.ratings = this.loadRatings();
        this.history = this.loadHistory();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupAutoSave();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('recipe-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Try another recipe button
        const tryAnotherBtn = document.getElementById('try-another-btn');
        if (tryAnotherBtn) {
            tryAnotherBtn.addEventListener('click', () => this.generateNewRecipe());
        }
        
        // Generate button click handler (backup)
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
        }

        // Protein source change - removed since we only have powder

        // Flavor change
        const flavorInputs = document.querySelectorAll('input[name="flavor"]');
        flavorInputs.forEach(input => {
            input.addEventListener('change', () => this.handleFlavorChange());
        });

        // Category change
        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.addEventListener('change', () => this.handleCategoryChange());
        }

        // Difficulty change
        const difficultySelect = document.getElementById('difficulty');
        if (difficultySelect) {
            difficultySelect.addEventListener('change', () => this.handleDifficultyChange());
        }

        // Dietary restrictions
        const dietaryInputs = document.querySelectorAll('input[name="avoid"]');
        dietaryInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.handleDietaryChange();
                this.updateFlavorOptions(); // Update available flavors when dietary restrictions change
            });
        });

        // Scoops change
        const scoopsInput = document.getElementById('scoops');
        if (scoopsInput) {
            scoopsInput.addEventListener('input', () => this.handleScoopsChange());
        }
    }

    setupFormValidation() {
        const form = document.getElementById('recipe-form');
        if (!form) return;

        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupAutoSave() {
        // Auto-save form data every 30 seconds
        setInterval(() => {
            this.saveFormData();
        }, 30000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveFormData();
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showAlert('Please fill in all required fields', 'warning');
            return;
        }

        this.generateRecipe();
    }

    validateForm() {
        const flavor = document.querySelector('input[name="flavor"]:checked');
        
        if (!flavor) {
            this.showFieldError('flavor', 'Please select a protein flavor');
            return false;
        }

        return true;
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        if (field.type === 'number') {
            const num = parseInt(value);
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            
            if (min && num < parseInt(min)) {
                this.showFieldError(field, `Value must be at least ${min}`);
                return false;
            }
            
            if (max && num > parseInt(max)) {
                this.showFieldError(field, `Value must be at most ${max}`);
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }

    clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.classList.remove('error');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // handleProteinSourceChange removed - no longer needed

    handleFlavorChange() {
        const flavor = document.querySelector('input[name="flavor"]:checked');
        const savoryOption = document.getElementById('savory-option');
        
        if (flavor && flavor.value === 'unflavored') {
            if (savoryOption) savoryOption.style.display = 'block';
        } else {
            if (savoryOption) savoryOption.style.display = 'none';
            const categorySelect = document.getElementById('category');
            if (categorySelect && categorySelect.value === 'savory') {
                categorySelect.value = 'all';
            }
        }
        
        this.saveFormData();
    }

    handleCategoryChange() {
        this.saveFormData();
    }

    handleDifficultyChange() {
        this.saveFormData();
    }

    handleDietaryChange() {
        this.saveFormData();
    }

    handleScoopsChange() {
        this.saveFormData();
    }

    generateRecipe() {
        const formData = this.getFormData();
        const selectedRecipes = this.getRecipesBySource(formData.proteinSource, formData.flavor);
        
        if (selectedRecipes.length === 0) {
            this.showAlert('No recipes available for this selection yet!', 'info');
            return;
        }

        // Filter recipes
        let filteredRecipes = this.filterRecipes(selectedRecipes, formData);
        
        if (filteredRecipes.length === 0) {
            filteredRecipes = selectedRecipes;
            this.showAlert('No recipes match your dietary restrictions. Showing all available recipes.', 'info');
        }

        // Select random recipe
        const selectedRecipe = this.selectRandomRecipe(filteredRecipes);
        
        // Adjust ingredients based on scoops
        const adjustedIngredients = this.adjustIngredients(selectedRecipe.ingredients, formData.scoops, formData.proteinSource);
        
        // Display recipe
        this.displayRecipe(selectedRecipe, adjustedIngredients, formData);
        
        // Save to history
        this.saveToHistory(selectedRecipe);
        
        // Show try another button
        this.showTryAnotherButton();
        
        // Track analytics
        this.trackRecipeGeneration(selectedRecipe, formData);
    }

    generateNewRecipe() {
        this.generateRecipe();
    }

    getFormData() {
        const form = document.getElementById('recipe-form');
        const formData = new FormData(form);
        
        return {
            proteinSource: 'powder', // Default to powder since we removed the selector
            flavor: formData.get('flavor'),
            scoops: parseInt(formData.get('scoops')) || 2,
            category: formData.get('category'),
            difficulty: formData.get('difficulty'),
            avoidIngredients: formData.getAll('avoid')
        };
    }

    getRecipesBySource(proteinSource, flavor) {
        // Since we only have protein powder recipes, return the flavor-specific recipes
        return this.recipes[flavor] || [];
    }

    filterRecipes(recipes, formData) {
        let filtered = [...recipes];
        
        // Filter by category
        if (formData.category !== 'all') {
            filtered = filtered.filter(recipe => recipe.category === formData.category);
        }
        
        // Filter by difficulty
        if (formData.difficulty !== 'all') {
            filtered = filtered.filter(recipe => recipe.difficulty === formData.difficulty);
        }
        
        // Filter by dietary restrictions using the dietary array
        if (formData.avoidIngredients.length > 0) {
            filtered = filtered.filter(recipe => {
                // Check if recipe has dietary restrictions that match what user wants to avoid
                const recipeDietary = recipe.dietary || [];
                const avoidIngredients = formData.avoidIngredients.map(avoid => avoid.toLowerCase().replace('-', ''));
                
                // If recipe has dietary tags that match what user wants to avoid, exclude it
                const hasConflictingDietary = recipeDietary.some(diet => 
                    avoidIngredients.includes(diet.toLowerCase())
                );
                
                if (hasConflictingDietary) return false;
                
                // Also check ingredients for conflicts
                return !avoidIngredients.some(avoid => {
                    return recipe.ingredients.some(ingredient => 
                        ingredient.toLowerCase().includes(avoid)
                    );
                });
            });
        }
        
        return filtered;
    }

    // Smart flavor filtering based on dietary restrictions
    getAvailableFlavors(dietaryRestrictions) {
        const allFlavors = Object.keys(this.recipes);
        const avoidIngredients = dietaryRestrictions.map(avoid => avoid.toLowerCase().replace('-', ''));
        
        return allFlavors.filter(flavor => {
            const flavorRecipes = this.recipes[flavor] || [];
            
            // Check if any recipes in this flavor work with the dietary restrictions
            return flavorRecipes.some(recipe => {
                const recipeDietary = recipe.dietary || [];
                
                // If recipe has dietary tags that conflict with restrictions, skip it
                const hasConflictingDietary = recipeDietary.some(diet => 
                    avoidIngredients.includes(diet.toLowerCase())
                );
                
                if (hasConflictingDietary) return false;
                
                // Check ingredients for conflicts
                const hasConflictingIngredients = avoidIngredients.some(avoid => {
                    return recipe.ingredients.some(ingredient => 
                        ingredient.toLowerCase().includes(avoid)
                    );
                });
                
                return !hasConflictingIngredients;
            });
        });
    }

    // Update flavor options based on dietary restrictions
    updateFlavorOptions() {
        const dietaryInputs = document.querySelectorAll('input[name="avoid"]:checked');
        const dietaryRestrictions = Array.from(dietaryInputs).map(input => input.value);
        
        const availableFlavors = this.getAvailableFlavors(dietaryRestrictions);
        const flavorOptions = document.querySelectorAll('.flavor-option');
        
        flavorOptions.forEach(option => {
            const flavorInput = option.querySelector('input[name="flavor"]');
            const flavorValue = flavorInput.value;
            
            if (availableFlavors.includes(flavorValue)) {
                option.style.display = 'block';
                option.style.opacity = '1';
            } else {
                option.style.display = 'none';
                option.style.opacity = '0.3';
            }
        });
        
        // If current selected flavor is not available, clear selection
        const selectedFlavor = document.querySelector('input[name="flavor"]:checked');
        if (selectedFlavor && !availableFlavors.includes(selectedFlavor.value)) {
            selectedFlavor.checked = false;
        }
    }

    selectRandomRecipe(recipes) {
        // Weight recipes by rating if available
        const weightedRecipes = recipes.map(recipe => {
            const rating = this.ratings[recipe.name] || 3; // Default to 3 stars
            const weight = Math.pow(rating, 2); // Square the rating for more weight
            return { recipe, weight };
        });
        
        // Calculate total weight
        const totalWeight = weightedRecipes.reduce((sum, item) => sum + item.weight, 0);
        
        // Select random number
        let random = Math.random() * totalWeight;
        
        // Find the selected recipe
        for (const item of weightedRecipes) {
            random -= item.weight;
            if (random <= 0) {
                return item.recipe;
            }
        }
        
        // Fallback to simple random selection
        return recipes[Math.floor(Math.random() * recipes.length)];
    }

    adjustIngredients(ingredients, scoops, proteinSource) {
        if (proteinSource !== 'powder') return ingredients;
        
        return ingredients.map(ingredient => {
            if (ingredient.includes('scoops')) {
                return ingredient.replace(/\d+/, scoops);
            }
            return ingredient;
        });
    }

    displayRecipe(recipe, ingredients, formData) {
        const resultsDiv = document.getElementById('recipe-results');
        if (!resultsDiv) return;
        
        this.currentRecipe = recipe;
        
        // Calculate nutrition info
        const nutrition = this.calculateNutrition(recipe, formData.scoops);
        
        resultsDiv.innerHTML = this.createRecipeHTML(recipe, ingredients, nutrition);
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Add event listeners for recipe actions
        this.setupRecipeActionListeners(recipe);
    }

    createRecipeHTML(recipe, ingredients, nutrition) {
        const rating = this.ratings[recipe.name] || 0;
        const isFavorite = this.favorites.includes(recipe.name);
        
        return `
            <div class="recipe-card fade-in">
                <div class="recipe-image">${recipe.image}</div>
                
                <div class="recipe-header">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <div class="recipe-meta">
                        <span class="recipe-time">⏱️ ${recipe.prepTime} prep</span>
                        <span class="recipe-cook-time">🔥 ${recipe.cookTime} cook</span>
                        <span class="recipe-servings">👥 ${recipe.servings} servings</span>
                        <span class="recipe-difficulty">📊 ${recipe.difficulty}</span>
                    </div>
                    
                    <div class="recipe-nutrition">
                        <div class="nutrition-item">
                            <span class="nutrition-value">${nutrition.protein}g</span>
                            <span class="nutrition-label">Protein</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-value">${nutrition.calories}</span>
                            <span class="nutrition-label">Calories</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-value">${nutrition.carbs}g</span>
                            <span class="nutrition-label">Carbs</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-value">${nutrition.fat}g</span>
                            <span class="nutrition-label">Fat</span>
                        </div>
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
                
                ${recipe.tips ? `
                    <div class="recipe-tips">
                        <h4>💡 Pro Tip:</h4>
                        <p>${recipe.tips}</p>
                    </div>
                ` : ''}
                
                <div class="recipe-actions">
                    <button class="btn btn-primary" onclick="recipeGenerator.shareRecipe('${recipe.name}')">
                        📱 Share Recipe
                    </button>
                    <button class="btn btn-secondary ${isFavorite ? 'active' : ''}" 
                            onclick="recipeGenerator.toggleFavorite('${recipe.name}')">
                        ${isFavorite ? '❤️' : '🤍'} ${isFavorite ? 'Saved' : 'Save to Favorites'}
                    </button>
                    <button class="btn btn-outline" onclick="recipeGenerator.showRatingModal('${recipe.name}')">
                        ⭐ Rate Recipe (${rating}/5)
                    </button>
                    <button class="btn btn-accent tweak-nutrition-btn" data-recipe-name="${recipe.name}" data-protein="${nutrition.protein}" data-calories="${nutrition.calories}" data-carbs="${nutrition.carbs}" data-fat="${nutrition.fat}">
                        🎛️ Tweak Nutrition
                    </button>
                </div>
                
                <div class="recipe-footer">
                    <div class="recipe-stats">
                        <span class="recipe-views">👁️ ${this.getRecipeViews(recipe.name)} views</span>
                        <span class="recipe-rating">⭐ ${this.getAverageRating(recipe.name)}/5</span>
                    </div>
                </div>
            </div>
        `;
    }

    calculateNutrition(recipe, scoops) {
        // Base nutrition per serving
        const baseProtein = recipe.protein || 10;
        const baseCalories = recipe.calories || 150;
        
        // Adjust based on scoops (for protein powder recipes)
        const multiplier = scoops / 2; // Assuming 2 scoops is the base
        
        return {
            protein: Math.round(baseProtein * multiplier),
            calories: Math.round(baseCalories * multiplier),
            carbs: Math.round(15 * multiplier), // Estimated
            fat: Math.round(5 * multiplier) // Estimated
        };
    }

    setupRecipeActionListeners(recipe) {
        // Add event listener for tweak nutrition button
        const tweakBtn = document.querySelector('.tweak-nutrition-btn');
        if (tweakBtn) {
            tweakBtn.addEventListener('click', (e) => {
                const recipeName = e.target.getAttribute('data-recipe-name');
                const protein = parseInt(e.target.getAttribute('data-protein'));
                const calories = parseInt(e.target.getAttribute('data-calories'));
                const carbs = parseInt(e.target.getAttribute('data-carbs'));
                const fat = parseInt(e.target.getAttribute('data-fat'));
                this.showNutritionModal(recipeName, protein, calories, carbs, fat);
            });
        }
    }

    shareRecipe(recipeName) {
        const recipe = this.findRecipeByName(recipeName);
        if (!recipe) return;
        
        const shareData = {
            title: `${recipe.name} - Protein Goblin Recipe`,
            text: `Check out this amazing protein recipe: ${recipe.name}`,
            url: window.location.href
        };
        
        if (navigator.share) {
            navigator.share(shareData).then(() => {
                this.showAlert('Recipe shared successfully!', 'success');
            }).catch(() => {
                this.fallbackShare(shareData);
            });
        } else {
            this.fallbackShare(shareData);
        }
    }

    fallbackShare(shareData) {
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showAlert('Recipe link copied to clipboard!', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert('Recipe link copied to clipboard!', 'success');
        }
    }

    toggleFavorite(recipeName) {
        const index = this.favorites.indexOf(recipeName);
        
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showAlert('Recipe removed from favorites', 'info');
        } else {
            this.favorites.push(recipeName);
            this.showAlert('Recipe saved to favorites!', 'success');
        }
        
        this.saveFavorites();
        this.updateFavoriteButton(recipeName);
    }

    updateFavoriteButton(recipeName) {
        const button = document.querySelector(`button[onclick*="${recipeName}"]`);
        if (!button) return;
        
        const isFavorite = this.favorites.includes(recipeName);
        button.innerHTML = `${isFavorite ? '❤️' : '🤍'} ${isFavorite ? 'Saved' : 'Save to Favorites'}`;
        button.classList.toggle('active', isFavorite);
    }

    showRatingModal(recipeName) {
        const modal = this.createRatingModal(recipeName);
        document.body.appendChild(modal);
        
        // Focus on the modal
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }

    showNutritionModal(recipeName, currentProtein, currentCalories, currentCarbs, currentFat) {
        const modal = this.createNutritionModal(recipeName, currentProtein, currentCalories, currentCarbs, currentFat);
        document.body.appendChild(modal);
        
        // Focus on the first input
        const firstInput = modal.querySelector('input[type="number"]');
        if (firstInput) firstInput.focus();
    }

    createRatingModal(recipeName) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Rate "${recipeName}"</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="rating-stars">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <input type="radio" id="star${star}" name="rating" value="${star}">
                            <label for="star${star}" class="star">⭐</label>
                        `).join('')}
                    </div>
                    <textarea placeholder="Optional: Add a review..." class="review-text"></textarea>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn btn-primary" onclick="recipeGenerator.submitRating('${recipeName}')">Submit Rating</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: var(--card-bg);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            border: 1px solid var(--border-color);
        `;
        
        return modal;
    }

    createNutritionModal(recipeName, currentProtein, currentCalories, currentCarbs, currentFat) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content nutrition-modal">
                <div class="modal-header">
                    <h3>🎛️ Tweak Nutrition for "${recipeName}"</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="nutrition-adjustment">
                        <div class="nutrition-input-group">
                            <label for="protein-adjust">Protein (g):</label>
                            <input type="number" id="protein-adjust" value="${currentProtein}" min="5" max="100" step="1">
                            <div class="adjustment-buttons">
                                <button type="button" class="adjust-btn" data-nutrient="protein" data-change="-5">-5</button>
                                <button type="button" class="adjust-btn" data-nutrient="protein" data-change="-1">-1</button>
                                <button type="button" class="adjust-btn" data-nutrient="protein" data-change="1">+1</button>
                                <button type="button" class="adjust-btn" data-nutrient="protein" data-change="5">+5</button>
                            </div>
                        </div>
                        
                        <div class="nutrition-input-group">
                            <label for="calories-adjust">Calories:</label>
                            <input type="number" id="calories-adjust" value="${currentCalories}" min="50" max="1000" step="10">
                            <div class="adjustment-buttons">
                                <button type="button" class="adjust-btn" data-nutrient="calories" data-change="-50">-50</button>
                                <button type="button" class="adjust-btn" data-nutrient="calories" data-change="-10">-10</button>
                                <button type="button" class="adjust-btn" data-nutrient="calories" data-change="10">+10</button>
                                <button type="button" class="adjust-btn" data-nutrient="calories" data-change="50">+50</button>
                            </div>
                        </div>
                        
                        <div class="nutrition-input-group">
                            <label for="carbs-adjust">Carbs (g):</label>
                            <input type="number" id="carbs-adjust" value="${currentCarbs}" min="0" max="100" step="1">
                            <div class="adjustment-buttons">
                                <button type="button" class="adjust-btn" data-nutrient="carbs" data-change="-5">-5</button>
                                <button type="button" class="adjust-btn" data-nutrient="carbs" data-change="-1">-1</button>
                                <button type="button" class="adjust-btn" data-nutrient="carbs" data-change="1">+1</button>
                                <button type="button" class="adjust-btn" data-nutrient="carbs" data-change="5">+5</button>
                            </div>
                        </div>
                        
                        <div class="nutrition-input-group">
                            <label for="fat-adjust">Fat (g):</label>
                            <input type="number" id="fat-adjust" value="${currentFat}" min="0" max="50" step="1">
                            <div class="adjustment-buttons">
                                <button type="button" class="adjust-btn" data-nutrient="fat" data-change="-2">-2</button>
                                <button type="button" class="adjust-btn" data-nutrient="fat" data-change="-1">-1</button>
                                <button type="button" class="adjust-btn" data-nutrient="fat" data-change="1">+1</button>
                                <button type="button" class="adjust-btn" data-nutrient="fat" data-change="2">+2</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="nutrition-preview">
                        <h4>Updated Nutrition Preview:</h4>
                        <div class="nutrition-display">
                            <div class="nutrition-item">
                                <span class="nutrition-value" id="preview-protein">${currentProtein}g</span>
                                <span class="nutrition-label">Protein</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value" id="preview-calories">${currentCalories}</span>
                                <span class="nutrition-label">Calories</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value" id="preview-carbs">${currentCarbs}g</span>
                                <span class="nutrition-label">Carbs</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-value" id="preview-fat">${currentFat}g</span>
                                <span class="nutrition-label">Fat</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="nutrition-tips">
                        <h4>💡 Quick Tips:</h4>
                        <ul>
                            <li><strong>More Protein:</strong> Add extra protein powder or Greek yogurt</li>
                            <li><strong>Fewer Calories:</strong> Reduce oil, nuts, or sweeteners</li>
                            <li><strong>More Carbs:</strong> Add oats, banana, or honey</li>
                            <li><strong>More Fat:</strong> Add nuts, avocado, or coconut oil</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn btn-primary" id="apply-nutrition-changes" data-recipe-name="${recipeName}">Apply Changes</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: var(--card-bg);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid var(--border-color);
        `;
        
        // Add event listeners for real-time updates
        const inputs = modal.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updateNutritionPreview());
        });
        
        // Add event listeners for adjustment buttons
        const adjustButtons = modal.querySelectorAll('.adjust-btn');
        adjustButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const nutrient = e.target.getAttribute('data-nutrient');
                const change = parseInt(e.target.getAttribute('data-change'));
                this.adjustNutrition(nutrient, change);
            });
        });
        
        // Add event listener for apply changes button
        const applyButton = modal.querySelector('#apply-nutrition-changes');
        if (applyButton) {
            applyButton.addEventListener('click', () => {
                const recipeName = applyButton.getAttribute('data-recipe-name');
                this.applyNutritionChanges(recipeName);
            });
        }
        
        return modal;
    }

    adjustNutrition(nutrient, change) {
        const input = document.getElementById(`${nutrient}-adjust`);
        if (input) {
            const currentValue = parseInt(input.value) || 0;
            const newValue = Math.max(0, currentValue + change);
            input.value = newValue;
            this.updateNutritionPreview();
        }
    }

    updateNutritionPreview() {
        const protein = document.getElementById('protein-adjust')?.value || 0;
        const calories = document.getElementById('calories-adjust')?.value || 0;
        const carbs = document.getElementById('carbs-adjust')?.value || 0;
        const fat = document.getElementById('fat-adjust')?.value || 0;
        
        const previewProtein = document.getElementById('preview-protein');
        const previewCalories = document.getElementById('preview-calories');
        const previewCarbs = document.getElementById('preview-carbs');
        const previewFat = document.getElementById('preview-fat');
        
        if (previewProtein) previewProtein.textContent = `${protein}g`;
        if (previewCalories) previewCalories.textContent = calories;
        if (previewCarbs) previewCarbs.textContent = `${carbs}g`;
        if (previewFat) previewFat.textContent = `${fat}g`;
    }

    applyNutritionChanges(recipeName) {
        const protein = parseInt(document.getElementById('protein-adjust')?.value) || 0;
        const calories = parseInt(document.getElementById('calories-adjust')?.value) || 0;
        const carbs = parseInt(document.getElementById('carbs-adjust')?.value) || 0;
        const fat = parseInt(document.getElementById('fat-adjust')?.value) || 0;
        
        // Update the displayed nutrition values
        this.updateRecipeNutrition(protein, calories, carbs, fat);
        
        // Close the modal
        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();
        
        this.showAlert('Nutrition values updated! Check the recipe for your custom nutrition info.', 'success');
    }

    updateRecipeNutrition(protein, calories, carbs, fat) {
        const nutritionItems = document.querySelectorAll('.recipe-nutrition .nutrition-item');
        if (nutritionItems.length >= 4) {
            nutritionItems[0].querySelector('.nutrition-value').textContent = `${protein}g`;
            nutritionItems[1].querySelector('.nutrition-value').textContent = calories;
            nutritionItems[2].querySelector('.nutrition-value').textContent = `${carbs}g`;
            nutritionItems[3].querySelector('.nutrition-value').textContent = `${fat}g`;
        }
    }

    submitRating(recipeName) {
        const modal = document.querySelector('.modal-overlay');
        const rating = modal.querySelector('input[name="rating"]:checked');
        const review = modal.querySelector('.review-text').value;
        
        if (!rating) {
            this.showAlert('Please select a rating', 'warning');
            return;
        }
        
        this.ratings[recipeName] = parseInt(rating.value);
        this.saveRatings();
        
        if (review.trim()) {
            this.saveReview(recipeName, review.trim());
        }
        
        this.showAlert(`Thanks for rating "${recipeName}" ${rating.value} stars!`, 'success');
        modal.remove();
        
        // Update the rating display
        this.updateRatingDisplay(recipeName);
    }

    updateRatingDisplay(recipeName) {
        const rating = this.ratings[recipeName] || 0;
        const button = document.querySelector(`button[onclick*="${recipeName}"]`);
        if (button) {
            button.innerHTML = `⭐ Rate Recipe (${rating}/5)`;
        }
    }

    showTryAnotherButton() {
        const tryAnotherBtn = document.getElementById('try-another-btn');
        if (tryAnotherBtn) {
            tryAnotherBtn.style.display = 'block';
        }
    }

    // Local Storage Methods
    saveFormData() {
        const formData = this.getFormData();
        localStorage.setItem('proteinShackFormData', JSON.stringify(formData));
    }

    loadFormData() {
        const saved = localStorage.getItem('proteinShackFormData');
        if (!saved) return null;
        
        try {
            return JSON.parse(saved);
        } catch {
            return null;
        }
    }

    saveFavorites() {
        localStorage.setItem('proteinShackFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const saved = localStorage.getItem('proteinShackFavorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveRatings() {
        localStorage.setItem('proteinShackRatings', JSON.stringify(this.ratings));
    }

    loadRatings() {
        const saved = localStorage.getItem('proteinShackRatings');
        return saved ? JSON.parse(saved) : {};
    }

    saveToHistory(recipe) {
        this.history.unshift({
            name: recipe.name,
            timestamp: Date.now(),
            category: recipe.category
        });
        
        // Keep only last 50 recipes
        this.history = this.history.slice(0, 50);
        localStorage.setItem('proteinShackHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('proteinShackHistory');
        return saved ? JSON.parse(saved) : [];
    }

    saveReview(recipeName, review) {
        const reviews = this.loadReviews();
        if (!reviews[recipeName]) {
            reviews[recipeName] = [];
        }
        reviews[recipeName].push({
            text: review,
            timestamp: Date.now()
        });
        localStorage.setItem('proteinShackReviews', JSON.stringify(reviews));
    }

    loadReviews() {
        const saved = localStorage.getItem('proteinShackReviews');
        return saved ? JSON.parse(saved) : {};
    }

    // Utility Methods
    findRecipeByName(name) {
        for (const category of Object.values(this.recipes)) {
            const recipe = category.find(r => r.name === name);
            if (recipe) return recipe;
        }
        return null;
    }

    getRecipeViews(recipeName) {
        // This would typically come from a backend
        return Math.floor(Math.random() * 1000) + 100;
    }

    getAverageRating(recipeName) {
        return this.ratings[recipeName] || 0;
    }

    trackRecipeGeneration(recipe, formData) {
        // This would typically send data to analytics
        console.log('Recipe generated:', {
            recipe: recipe.name,
            category: recipe.category,
            proteinSource: formData.proteinSource,
            flavor: formData.flavor,
            timestamp: Date.now()
        });
    }

    showAlert(message, type = 'info') {
        // Use the global showAlert function
        if (typeof showAlert === 'function') {
            showAlert(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize the recipe generator when the DOM is loaded
let recipeGenerator;
document.addEventListener('DOMContentLoaded', function() {
    recipeGenerator = new RecipeGenerator();
    
    // Load saved form data
    const savedFormData = recipeGenerator.loadFormData();
    if (savedFormData) {
        // recipeGenerator.loadFormDataToForm(savedFormData); // This method doesn't exist yet
    }
    
    // Test button removed - generator should work now
});

// Add CSS for the modal and additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .field-error {
        color: #ff4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .form-group input.error,
    .form-group select.error {
        border-color: #ff4444;
        box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    }
    
    .recipe-nutrition {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin: 1rem 0;
        padding: 1rem;
        background: var(--accent-bg);
        border-radius: 0.5rem;
    }
    
    .nutrition-item {
        text-align: center;
    }
    
    .nutrition-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--accent-color);
    }
    
    .nutrition-label {
        font-size: 0.875rem;
        color: var(--muted-text);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .recipe-footer {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    .recipe-stats {
        display: flex;
        gap: 1rem;
        font-size: 0.875rem;
        color: var(--muted-text);
    }
    
    .btn.active {
        background: var(--accent-color);
        color: var(--primary-bg);
    }
    
    .rating-stars {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        justify-content: center;
    }
    
    .rating-stars input[type="radio"] {
        display: none;
    }
    
    .rating-stars label.star {
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .rating-stars label.star:hover {
        transform: scale(1.2);
    }
    
    .rating-stars input[type="radio"]:checked ~ label.star,
    .rating-stars input[type="radio"]:checked + label.star {
        color: #ffd700;
    }
    
    .review-text {
        width: 100%;
        min-height: 100px;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--accent-bg);
        color: var(--primary-text);
        resize: vertical;
        font-family: inherit;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--secondary-text);
    }
    
    .modal-footer {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }
    
    .btn-accent {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-accent:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    
    .nutrition-modal {
        max-width: 600px !important;
    }
    
    .nutrition-adjustment {
        display: grid;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .nutrition-input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .nutrition-input-group label {
        font-weight: 600;
        color: var(--primary-text);
        font-size: 0.9rem;
    }
    
    .nutrition-input-group input[type="number"] {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--accent-bg);
        color: var(--primary-text);
        font-size: 1rem;
        font-weight: 600;
    }
    
    .nutrition-input-group input[type="number"]:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .adjustment-buttons {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .adjustment-buttons button {
        flex: 1;
        padding: 0.5rem;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 0.25rem;
        color: var(--primary-text);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .adjustment-buttons button:hover {
        background: var(--accent-color);
        color: white;
        border-color: var(--accent-color);
    }
    
    .nutrition-preview {
        background: var(--accent-bg);
        padding: 1.5rem;
        border-radius: 0.75rem;
        margin-bottom: 1.5rem;
        border: 1px solid var(--border-color);
    }
    
    .nutrition-preview h4 {
        margin-bottom: 1rem;
        color: var(--primary-text);
        font-size: 1.1rem;
    }
    
    .nutrition-display {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }
    
    .nutrition-tips {
        background: var(--secondary-bg);
        padding: 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid var(--border-color);
    }
    
    .nutrition-tips h4 {
        margin-bottom: 1rem;
        color: var(--primary-text);
        font-size: 1.1rem;
    }
    
    .nutrition-tips ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .nutrition-tips li {
        padding: 0.5rem 0;
        color: var(--secondary-text);
        font-size: 0.9rem;
        line-height: 1.5;
    }
    
    .nutrition-tips strong {
        color: var(--accent-color);
    }
`;
document.head.appendChild(additionalStyles);
