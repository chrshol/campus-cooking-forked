'use client';

import React, { useState } from 'react';
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(recipe.id);
    setIsPopupOpen(false);
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
        <button onClick={handleOpenPopup} className="delete-button">
          <Trash2 size={20} />
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p className="popup-message">
              Are you sure you want to delete this recipe?
            </p>
            <div className="popup-actions">
              <button
                onClick={handleConfirmDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={handleClosePopup}
                className="btn btn-secondary"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCardAdmin;
