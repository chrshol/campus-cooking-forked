'use client';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';
import Link from 'next/link';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  cookTime: string;
  category: string;
  isLiked?: boolean;
  slug: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Hot Plate French Toast',
    imageUrl:
      'https://images.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_4184512.jpg',
    cookTime: '15 Minutes',
    category: 'Breakfast',
    isLiked: false,
    slug: 'hot-plate-french-toast',
  },
  {
    id: 2,
    title: 'Hot Plate Chicken and Rice Soup',
    imageUrl:
      'https://images.cookforyourlife.org/wp-content/uploads/2015/08/chicken-soup-dill-resized.jpg',
    cookTime: '30 Minutes',
    category: 'Soup',
    isLiked: false,
    slug: 'hot-plate-chicken-and-rice-soup',
  },
  {
    id: 3,
    title: 'Bacon, Egg and Cheddar English Muffin Panini',
    imageUrl:
      'https://paninihappy.com/wp-content/uploads/2013/03/bacon-egg-cheese-english-muffin-panini-hipsta-490.jpg',
    cookTime: '10 Minutes',
    category: 'Breakfast',
    isLiked: false,
    slug: 'bacon-and-egg-and-cheddar-english-muffin-panini',
  },
  {
    id: 4,
    title: 'Strawberry, Banana & Nutella Panini',
    imageUrl:
      'https://paninihappy.com/wp-content/uploads/2011/03/Strawberry_Banana_Nutella_Panini-490.jpg',
    cookTime: '10 Minutes',
    category: 'Dessert',
    isLiked: false,
    slug: 'strawberry-and-banana-and-nutella-panini',
  },
  {
    id: 5,
    title: 'Toaster Quesadilla',
    imageUrl:
      'https://silverhillsbakery.ca/wp-content/uploads/2020/09/SHB_Toaster-Quesadilla_3-Ways_Blog-1200x800-c-default.jpg',
    cookTime: '15 Minutes',
    category: 'Mexican',
    isLiked: false,
    slug: 'toaster-quesadilla',
  },
  {
    id: 6,
    title: 'Microwave Banana Pudding',
    imageUrl:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-424720_12-b8ffc96.jpg?quality=90&webp=true&resize=440,400',
    cookTime: '10 Minutes',
    category: 'Dessert',
    isLiked: false,
    slug: 'microwave-banana-pudding',
  },
  {
    id: 7,
    title: 'Microwave Stuffed Peppers and Rice',
    imageUrl:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-338663_11-7a36645.jpg?quality=90&webp=true&resize=440,400',
    cookTime: '20 Minutes',
    category: 'Main Course',
    isLiked: false,
    slug: 'microwave-stuffed-peppers-and-rice',
  },
  {
    id: 8,
    title: 'Rice Cooker Chocolate Cake',
    imageUrl:
      'https://cdn.sweetandsavory.co/wp-content/uploads/2020/09/10095114/RiceCookCake-F.png',
    cookTime: '45 Minutes',
    category: 'Dessert',
    isLiked: false,
    slug: 'rice-cooker-chocolate-cake',
  },
];

const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <Link href={`/recipes/${recipe.slug}`} className="college-recipe-card-v2">
    <div className="college-recipe-image-wrapper-v2">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="college-recipe-image-v2"
      />
      <button
        type="button"
        className="college-recipe-like-btn-v2"
        aria-label={`Like ${recipe.title}`}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Heart
          fill={recipe.isLiked ? '#FF6363' : '#DBE2E5'}
          color={recipe.isLiked ? '#FF6363' : '#DBE2E5'}
        />
      </button>
    </div>
    <div className="college-recipe-content-v2">
      <h3 className="college-recipe-title-v2">{recipe.title}</h3>
      <div className="college-recipe-metadata-v2">
        <div className="metadata-item-v2">
          <Clock size={20} />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="metadata-item-v2">
          <Utensils size={20} />
          <span>{recipe.category}</span>
        </div>
      </div>
    </div>
  </Link>
);

const RecipeGrid2: React.FC = () => (
  <section className="recipes-v2">
    <div className="recipes-header-v2">
      <h2>Level up your health and well being with these recipes</h2>
      <p>More delicious recipes for you to explore</p>
    </div>

    <div className="recipes-grid-v2">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  </section>
);

export default RecipeGrid2;
