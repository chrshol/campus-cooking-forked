'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Vegan',
  'Meat',
  'Dessert',
  'Chocolate',
];

const appliances = [
  'RiceCooker',
  'PaniniPress',
  'ToasterOven',
  'Toaster',
  'Microwave',
  'HotPlate',
];

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



// Recipe Card Component
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const router = useRouter();
  const defaultImage = '/fallback-image.png';
  const [imgSrc, setImgSrc] = useState(recipe.imageURL);

  const handleClick = () => {
    const slug = recipe.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
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
          onError={() => setImgSrc(defaultImage)}
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


// Main Recipes Component
const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [originalRecipes, setOriginalRecipes] = useState<Recipe[]>([]); // Cache full list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) throw new Error('Could not fetch recipes');
      const data = await response.json();
      setRecipes(data);
      setOriginalRecipes(data); // Cache original recipes
      setError(null);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/recipes?search=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    let filteredRecipes = [...originalRecipes];
    if (selectedCategory) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.categories.some((cat) => cat.category === selectedCategory)
      );
    }
    if (selectedAppliance) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.appliances.some((app) => app.appliance === selectedAppliance)
      );
    }
    setRecipes(filteredRecipes);
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedAppliance(null);
    setRecipes(originalRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [selectedCategory, selectedAppliance]);

  return (
    <div className="recipe-page">
      <h1>Find Your Favorite Recipes</h1>

      <div className="search-bar-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button onClick={handleSearch}>Search</button>
        {query && <button onClick={resetFilters}>Reset</button>}
      </div>

      <div className="filter-container">
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedAppliance || ''}
          onChange={(e) => setSelectedAppliance(e.target.value || null)}
        >
          <option value="">All Appliances</option>
          {appliances.map((appliance) => (
            <option key={appliance} value={appliance}>
              {appliance}
            </option>
          ))}
        </select>
      </div>

      <div className="recipe-grid">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          !loading && <div>No recipes found.</div>
        )}
      </div>
    </div>
  );
};

export default Recipes;