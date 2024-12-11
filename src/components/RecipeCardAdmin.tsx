'use client';

import React from 'react';
import { Clock, Trash2, Pencil } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  email: string;
  cookTime: string;
  createdAt: string;
}

interface RecipeCardAdminProps {
  recipe: Recipe;
  onDelete: (id: number) => void;
}

const RecipeCardAdmin: React.FC<RecipeCardAdminProps> = ({ recipe, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      onDelete(recipe.id);
    }
  };

  return (
    <div className="admin-recipe-card">
      <div className="admin-recipe-info">
        <h3>{recipe.title}</h3>
        <div className="admin-recipe-meta">
          <span className="meta-item">
            <Clock size={16} />
            {recipe.cookTime}
          </span>
          <span className="meta-item">By: {recipe.email}</span>
          <span className="meta-item">
            Created: {new Date(recipe.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="admin-actions">
        <a href={`/admin/edit/${recipe.id}`} className="edit-button">
          <Pencil size={20} />
        </a>
        <button onClick={handleDelete} className="delete-button">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCardAdmin;
