// Define the favorite meals
const favoriteMeals = ['Butter Chicken', 'Chicken Taco', 'Mississippi Mud Brownie', 'Pulled Pork Quesadilla'];  // replace with your actual favorite meals

const specialties = [] //limited time items to be defined later
const muslimItems = ['Lebanese Knafeh Cheese','Coconut Curry Halal Chicken','Woody\'s Grape Leaves'];
const vegetarianItems = ['Black Bean Soup','Cheese Pizza','Asian Sesame Cucumber Salad','Bao','Cilantro Lime Coleslaw','Korean Artichoke Bao'];
const veganItems = ['Vegan Chocolate Cake','Vegan Vanilla Cupcake'];
const highProteinItems = ['Beef Bulgogi with Sesame & Vegetables','Coconut Curry Halal Chicken','Citrus Glazed Tofu','Battered Pollock'];
const pescetarianItems = ['Seafood Bisque','Battered Pollock'];


const searchMeal = 'Butter Chicken';

const baseUrls = ['https://eatatstate.msu.edu/menu/The%20Edge%20at%20Akers/all/', 'https://eatatstate.msu.edu/menu/Brody%20Square/all/',
'https://eatatstate.msu.edu/menu/South%20Pointe%20at%20Case/all/', 'https://eatatstate.msu.edu/menu/Holden%20Dining%20Hall/all/',
'https://eatatstate.msu.edu/menu/Holmes%20Dining%20Hall/all/', 'https://eatatstate.msu.edu/menu/Heritage%20Commons%20at%20Landon/all/',
'https://eatatstate.msu.edu/menu/Thrive%20at%20Owen/all/', 'https://eatatstate.msu.edu/menu/The%20Vista%20at%20Shaw/all/',
'https://eatatstate.msu.edu/menu/The%20Gallery%20at%20Snyder%20Phillips/all/', 'https://eatatstate.msu.edu/menu/The%20Workshop/all/'];

module.exports = { favoriteMeals, searchMeal, baseUrls };