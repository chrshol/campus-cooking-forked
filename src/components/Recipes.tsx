'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Utensils } from 'lucide-react';
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
  onSearchChange: (query: string) => void;
  onReset: () => void;
}> = ({ query, onSearchChange, onReset }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="search"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <select
          value={query || ''}
          onChange={(e) => onSearchChange(e.target.value || '')}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={query || ''}
          onChange={(e) => onSearchChange(e.target.value || '')}
          className="filter-select"
        >
          <option value="">All Appliances</option>
          {appliances.map((appliance) => (
            <option key={appliance} value={appliance}>
              {appliance}
            </option>
          ))}
        </select>
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
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
  const [originalRecipes, setOriginalRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(
    null
  );

  // Fetch recipes from API
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) throw new Error('Could not fetch recipes');
      const data = await response.json();
      setRecipes(data);
      setOriginalRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debounced query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery !== '') {
      const filteredRecipes = originalRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setRecipes(filteredRecipes);
    } else {
      setRecipes(originalRecipes);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes by category and appliance
  useEffect(() => {
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
  }, [selectedCategory, selectedAppliance, originalRecipes]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedAppliance(null);
    setRecipes(originalRecipes);
  };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1 className="recipe-title">
          Level Up Your Health and Well-Being With These Recipes!
        </h1>
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="search"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="filter-select"
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
              className="filter-select"
            >
              <option value="">All Appliances</option>
              {appliances.map((appliance) => (
                <option key={appliance} value={appliance}>
                  {appliance}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="recipe-grid">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div>No recipes found.</div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
