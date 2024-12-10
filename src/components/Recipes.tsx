'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Recipe {
  id: number;
  title: string;
  imageURL: string;
  description: string;
  instructions: string;
  cookTime: string;
  email: string;
  createdAt: string;
  categories: Array<{ category: string }>;
  appliances: Array<{ appliance: string }>;
  ingredients: Array<{ id: number; name: string; quantity: string }>;
}

// Search bar component
const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search article, news or recipe..."
          className="search-placeholder"
          required
        />
        <div className="search-button">
          <span className="search-button-text">Search</span>
        </div>
      </div>
    </div>
  );
};

// Recipe card component
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const router = useRouter();
  const defaultImage = '/fallback-image.png';
  const [imgSrc, setImgSrc] = useState(recipe.imageURL);

  const handleClick = () => {
    console.log('Clicking recipe:', recipe.title);
    const slug = recipe.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    console.log('Generated slug:', slug);
    router.push(`/recipes/${slug}`);
  };

  return (
    <div 
      className="recipe-card cursor-pointer" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
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
            <span>{recipe.cookTime || '15 mins'}</span>
          </div>
          <div className="meta-item">
            <Utensils />
            <span>{recipe.categories?.[0]?.category || 'Uncategorized'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Recipes component
const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Could not fetch recipes');
        }
        const data = await response.json();
        console.log('Received recipe data:', data);
        setRecipes(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes. Please try again later.');
        // Fallback data
        setRecipes([
          {
            id: 1,
            title: 'Grilled Cheese',
            imageURL:
              'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese-500x375.jpg',
            description: 'A quick and easy lunch option.',
            instructions:
              'Butter the bread and grill with cheese using a panini press.',
            cookTime: '15 mins',
            email: 'john@foo.com',
            createdAt: '2024-12-08T05:33:12.868Z',
            categories: [{ category: 'Lunch' }],
            appliances: [{ appliance: '' }],
            ingredients: [{ id: 1, name: 'Bread', quantity: '2 slices' }],
          },
          // Add more fallback recipes if needed
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1 className="recipe-title">
          Level up your health and well being with these recipes
        </h1>
        <p className="recipe-subtitle"></p>
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
