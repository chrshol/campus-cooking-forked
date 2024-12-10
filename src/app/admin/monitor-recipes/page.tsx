'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import RecipeCardAdmin from '@/components/RecipeCardAdmin';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import './styles.css';
import { deleteRecipe } from '@/lib/dbActions';

interface Recipe {
  id: number;
  title: string;
  email: string;
  cookTime: string;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email || session?.user?.randomKey !== 'ADMIN') {
      redirect('/');
    }
    fetchRecipes();
  }, [session]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this recipe?')) {
        await deleteRecipe(id);
        // Update local state after successful deletion
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <main className="admin-monitor-container">
        <h1>Monitor Recipes</h1>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-recipes-list">
          {loading ? (
            <p>Loading...</p>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCardAdmin
                key={recipe.id}
                recipe={recipe}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 