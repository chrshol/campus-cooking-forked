import React from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  author: string;
  date:string;
}

// Recipe/test data - to be replace with links to database 
const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Superfood Fruit Salad',
    imageUrl: '/landing-img/acai.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Hailey Smith',
    date: '10/2/2024',
  },
  {
    id: 2,
    title: 'Steak frites in your dorm',
    imageUrl: '/landing-img/steakmeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Western',
    date: '10/2/2024',
  },
  {
    id: 3,
    title: 'Fried rice with veges and eggs',
    imageUrl: '/landing-img/ricemeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Healthy',
    date: '10/2/2024',
  },
  {
    id: 4,
    title: 'Rice cooker burritos',
    imageUrl: '/landing-img/burrito.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Eastern',
    date: '10/2/2024',
  },
  {
    id: 5,
    title: 'Chicken salad and sweet potato fries',
    imageUrl: '/landing-img/loadedfries.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Healthy',
    date: '10/2/2024',
  },
  {
    id: 6,
    title: 'Panini press sandwiches',
    imageUrl: '/landing-img/sandwichmeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Snack',
    date: '10/2/2024',
  },
  {
    id: 7,
    title: 'Lettuce wraps',
    imageUrl: '/landing-img/lettucewrap.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Seafood',
    date: '10/2/2024',
  },
  {
    id: 8,
    title: 'Ramen soup.. in your rice cooker!',
    imageUrl: '/landing-img/pho.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Japanese',
    date: '10/2/2024',
  },
];

// Search bar component
const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
    <div className="search-bar">
      {/* Placeholder Text */}
      <input type="search" placeholder="Search article, news or recipe..." className="search-placeholder" required />

      {/* Search Button */}
      <div className="search-button">
        <span className="search-button-text">Search</span>
      </div>
    </div>
    </div>
  );
};

// Author component at the bottom of each recipe card 
const Author: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <div className="recipe-author-container">
    <p className="author-info">
      Created by<span className="author-name">{recipe.author}</span>
    </p>    
    <h5 className="recipe-date">{recipe.date}</h5>
  </div>
);


// Recipe card component
const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <div className="recipe-tile">
    <div className="recipe-photo-container">
      <img src={recipe.imageUrl} alt={recipe.title} className="image-mask" />
    </div>
    <div className="recipe-content">
      <h3 className="recipe-heading">{recipe.title}</h3>
      <h4 className="recipe-details">{recipe.description}</h4>
      <Author recipe={recipe} />
    </div>
  </div>
);

// Page numbers at bottom of screen
const Pages: React.FC = () => {
  return (
    <div className="recipes-container">
      <h4 className="pages">1</h4>
      <h4 className="pages">2</h4>
      <h4 className="pages">3</h4>
      <h4 className="pages">4</h4>
      <h4 className="pages">5</h4>
      <h4 className="pages">...</h4>
    </div>
  );
};

// Main page component
const Recipes: React.FC = () => (
  <div className="recipe-page">
    <div className="recipe-container-header">
      <h1 className="main-header">Community Recipe Blog</h1>
      <h2 className="main-subheader">
        Level up your health and well-being with these recipes!
      </h2>
      <SearchBar />
    </div>

    {/* Main Content Container */}
    <div className="main-content">
      {/* Recipe Grid */}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>

    <Pages />
  </div>
);

export default Recipes;
