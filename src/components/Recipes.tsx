'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  cookTime: string;
  category: string;
}

// Recipe/test data - to be replace with links to database
/*const recipes: Recipe[] = [
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
];*/

// Search bar component
const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        {/* Placeholder Text */}
        <input
          type="search"
          placeholder="Search article, news or recipe..."
          className="search-placeholder"
          required
        />

        {/* Search Button */}
        <div className="search-button">
          <span className="search-button-text">Search</span>
        </div>
      </div>
    </div>
  );
};

// Recipe card component
const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <div className="recipe-card">
    <div className="recipe-image-container">
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      <button aria-label="Like" className="d-none d-md-block">
        <Heart />
      </button>
    </div>
    <div className="recipe-content">
      <h3 className="recipe-name">{recipe.title}</h3>
      <div className="recipe-meta">
        <div className="meta-item">
          <Clock />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="meta-item">
          <Utensils />
          <span>{recipe.category}</span>
        </div>
      </div>
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
/*const Recipes: React.FC = () => (
  <div className="recipe-page">
    <div className="recipe-container-header">
      <h1 className="main-header">Community Recipe Blog</h1>
      <h2 className="main-subheader">
        Level up your health and well-being with these recipes!
      </h2>
      <SearchBar />
    </div>*/

{
  /* Main Content Container */
}
//<div className="main-content">
{
  /* Recipe Grid */
}
/*<div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>

    <Pages />
  </div>
);*/

// Main Recipes component
const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes from API
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1 className="recipe-title">
          Level up your health and well being with these recipes
        </h1>
        <p className="recipe-subtitle">
          More delicious recipes for you to explore
        </p>
        <SearchBar />
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
