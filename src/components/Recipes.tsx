'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';
import Image from 'next/image';

interface Recipe {
  id: number;
  title: string;
  imageURL: string;
  description: string;
  instructions: string;
  email: string;
  createdAt: string;
  categories: any[];
  appliances: any[];
  ingredients: any[];
}

// Search bar component
const SearchBar: React.FC<{
  query: string;
  onSearch: (query: string) => void;
  onReset: () => void;
}> = ({ query, onSearch, onReset }) => {
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearch = () => {
    onSearch(localQuery);
  };

  const handleReset = () => {
    setLocalQuery(''); // Clear local input
    onReset(); // Trigger the reset function in the parent component
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search article, news or recipe..."
          className="search-placeholder"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)} 
          required
        />
        <div className="search-button" onClick={handleSearch}>
          <span className="search-button-text">Search</span>
        </div>
        {localQuery && (
          <div className="clear-button" onClick={handleReset}>
            <span className="clear-button-text">X</span>
          </div>
        )}
      </div>
    </div>
  );
};



// Recipe card component
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const defaultImage = '/fallback-image.png';
  const [imgSrc, setImgSrc] = useState(recipe.imageURL);

  return (
    <div className="recipe-card">
      <div
        className="recipe-image-container"
        style={{ position: 'relative', width: '100%', height: '250px' }}
      >
        <img
          src={imgSrc || defaultImage}
          alt={recipe.title}
          className="recipe-image"
          onError={() => {
            console.log(`Falling back to default image for: ${recipe.title}`);
            setImgSrc(defaultImage);
          }}
          style={{
            width: '400px',
            height: '300px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
      <div className="recipe-content">
        <h3 className="recipe-name">{recipe.title}</h3>
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock />
            <span>15 mins</span>
          </div>
          <div className="meta-item">
            <Utensils />
            <span>{recipe.categories?.[0]?.name || 'Uncategorized'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Recipes component
const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [originalRecipes, setOriginalRecipes] = useState<Recipe[]>([]); // Cache the full recipe list
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(''); // Track the current search query

  const fetchRecipes = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) {
        throw new Error('Could not fetch recipes');
      }
      const data = await response.json();
      setRecipes(data); // Set the initial recipes
      setOriginalRecipes(data); // Cache the original recipes
      setError(null);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchRecipes(); // Fetch all recipes on initial load
  }, []);

  const handleSearch = async (query: string) => {
    setQuery(query); // Update the query state
    try {
      setLoading(true); // Start loading
      const response = await fetch(`/api/recipes?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data); // Display filtered recipes
      setError(null); // Clear any errors
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleReset = async () => {
    setQuery(''); // Clear the query in the search bar
    try {
      setLoading(true); // Start loading
      const response = await fetch('/api/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data); // Reset to all recipes
      setOriginalRecipes(data); // Update the cache
      setError(null); // Clear any errors
    } catch (error) {
      console.error('Error resetting recipes:', error);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1 className="recipe-title">
          Level up your health and well-being with these recipes
        </h1>
        <SearchBar query={query} onSearch={handleSearch} onReset={handleReset} />
      </div>

      <div className="recipe-grid">
        {loading && (
          <div className="loading-placeholder">
            {/* Add skeleton or loading placeholder here */}
            Loading...
          </div>
        )}
        {!loading &&
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};






export default Recipes;
