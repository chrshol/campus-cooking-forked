/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
// src/components/Recipes/Recipes.tsx
import React from 'react';
import { Timer, Heart } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  duration: string;
  category: string;
  isLiked?: boolean;
  isAd?: boolean;
}

// Move RecipeCard component outside of RecipeGrid
const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  if (recipe.isAd) {
    return (
      <div className="recipe-card ad">
        <div className="ad-content d-none d-md-block">
          <h3>Don&apos;t forget to eat healthy food</h3>
          <p>www.collegecooking.com</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <button
          type="button"
          className={`like-button ${recipe.isLiked ? 'liked' : ''}`}
          aria-label={`Like ${recipe.title}`}
        >
          <Heart
            fill={recipe.isLiked ? '#FF6363' : '#DBE2E5'}
            color={recipe.isLiked ? '#FF6363' : '#DBE2E5'}
          />
        </button>
      </div>
      <div className="recipe-content">
        <h3 className="grid-recipe-title">{recipe.title}</h3>
        <div className="recipe-metadata">
          <div className="metadata-item">
            <Timer size={20} />
            <span>{recipe.duration}</span>
          </div>
          <div className="metadata-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9989 7.47887C11.9985 7.46532 11.998 7.45177 11.9969 7.43813C11.9957 7.42444 11.994 7.41094 11.9922 7.39748C11.9912 7.39052 11.9909 7.38361 11.9898 7.37661L11.2398 2.87661C11.2237 2.77941 11.1885 2.68634 11.1364 2.60272C11.0843 2.5191 11.0162 2.44657 10.936 2.38928C10.8559 2.33198 10.7652 2.29105 10.6692 2.26881C10.5732 2.24657 10.4738 2.24346 10.3766 2.25966C10.2794 2.27586 10.1864 2.31105 10.1028 2.36323C10.0192 2.41541 9.9467 2.48354 9.88946 2.56374C9.83222 2.64394 9.79134 2.73463 9.76916 2.83063C9.74699 2.92664 9.74394 3.02607 9.76021 3.12325L10.3646 6.74993H8.625V2.99993C8.625 2.80102 8.54598 2.61025 8.40533 2.4696C8.26468 2.32895 8.07391 2.24993 7.875 2.24993C7.67609 2.24993 7.48532 2.32895 7.34467 2.4696C7.20402 2.61025 7.125 2.80102 7.125 2.99993V6.74993H5.38536L5.98979 3.12325C6.00606 3.02607 6.00301 2.92664 5.98083 2.83063C5.95866 2.73463 5.91778 2.64394 5.86053 2.56374C5.80329 2.48354 5.73081 2.41541 5.64722 2.36323C5.56364 2.31105 5.47059 2.27586 5.3734 2.25966C5.27621 2.24346 5.17678 2.24657 5.08079 2.26881C4.9848 2.29105 4.89413 2.33198 4.81397 2.38928C4.73381 2.44657 4.66572 2.5191 4.6136 2.60272C4.56148 2.68634 4.52635 2.77941 4.51021 2.87661L3.76021 7.37661C3.75906 7.38361 3.75879 7.39052 3.75778 7.39748C3.75595 7.41094 3.75426 7.42444 3.75311 7.43813C3.75197 7.45177 3.75146 7.46532 3.75105 7.47887C3.75087 7.48592 3.75 7.49284 3.75 7.49993C3.75 7.50661 3.75046 7.51316 3.7505 7.5198C3.75064 7.52442 3.75064 7.529 3.75087 7.53358C3.75993 8.49114 4.1014 9.4158 4.71687 10.1494C5.33235 10.883 6.18359 11.38 7.125 11.5553V20.9999C7.125 21.1988 7.20402 21.3896 7.34467 21.5303C7.48532 21.6709 7.67609 21.7499 7.875 21.7499C8.07391 21.7499 8.26468 21.6709 8.40533 21.5303C8.54598 21.3896 8.625 21.1988 8.625 20.9999V11.5553C9.56641 11.38 10.4177 10.883 11.0331 10.1494C11.6486 9.4158 11.9901 8.49113 11.9991 7.53358C11.9994 7.529 11.9994 7.52442 11.9995 7.51979C11.9995 7.51316 12 7.50661 12 7.49993C12 7.49284 11.9991 7.48592 11.9989 7.47887Z"
                fill="black"
              />
              <path
                d="M19.8743 2.98673C19.8741 2.97126 19.8732 2.95578 19.872 2.94026C19.8712 2.92973 19.8702 2.9193 19.8689 2.90891C19.8673 2.89595 19.8653 2.883 19.863 2.87004C19.8607 2.85699 19.8582 2.84409 19.8553 2.83131C19.8529 2.82115 19.8502 2.81104 19.8474 2.80092C19.8433 2.78586 19.8388 2.77103 19.8337 2.75638C19.8323 2.75217 19.8314 2.74791 19.8299 2.7437C19.8282 2.73917 19.826 2.73495 19.8243 2.73047C19.8186 2.71577 19.8125 2.70134 19.806 2.68716C19.8018 2.67791 19.7974 2.66879 19.7928 2.65979C19.7866 2.64771 19.7801 2.63582 19.7733 2.62413C19.7672 2.61365 19.7611 2.60335 19.7546 2.59323C19.7484 2.58371 19.7419 2.57446 19.7353 2.56522C19.7274 2.55405 19.7194 2.54311 19.7108 2.53249C19.7046 2.52466 19.6981 2.51711 19.6916 2.50955C19.6822 2.49875 19.6727 2.48808 19.6628 2.47787C19.6558 2.47073 19.6486 2.46387 19.6414 2.457C19.6314 2.44748 19.6213 2.43814 19.6108 2.42921C19.6024 2.42203 19.5937 2.41525 19.5849 2.40843C19.5751 2.40083 19.5653 2.39328 19.5551 2.38614C19.5447 2.37886 19.534 2.37204 19.5233 2.36531C19.5141 2.35959 19.505 2.35382 19.4956 2.34851C19.4834 2.34155 19.4709 2.33514 19.4583 2.32887C19.4496 2.32457 19.441 2.32027 19.4322 2.31628C19.4189 2.31033 19.4054 2.30493 19.3917 2.29971C19.3827 2.29628 19.3737 2.29285 19.3644 2.28973C19.3513 2.28529 19.338 2.2814 19.3246 2.27769C19.3139 2.27472 19.3032 2.27193 19.2924 2.26941C19.2805 2.26671 19.2685 2.26437 19.2564 2.26222C19.2432 2.25984 19.2301 2.25783 19.2167 2.25618C19.2065 2.25494 19.1963 2.25394 19.1859 2.25307C19.1706 2.25183 19.1552 2.25105 19.1396 2.25073C19.1347 2.25064 19.1299 2.25 19.125 2.25C19.1205 2.25 19.116 2.2506 19.1115 2.25069C19.0962 2.25096 19.0808 2.25179 19.0654 2.25302C19.0548 2.25385 19.0443 2.2548 19.0339 2.25609C19.0209 2.25769 19.008 2.2597 18.995 2.26199C18.982 2.26428 18.9691 2.2668 18.9563 2.26978C18.9461 2.27211 18.936 2.27476 18.9259 2.27756C18.9109 2.28168 18.896 2.28621 18.8814 2.29129C18.8772 2.29271 18.8729 2.29362 18.8687 2.29513C18.8594 2.29852 18.8503 2.30255 18.8411 2.30598C18.8377 2.3074 18.8341 2.30864 18.8306 2.3101C16.8984 3.03625 15.3511 5.4066 14.2315 9.35806C13.7236 11.1814 13.3552 13.0408 13.1293 14.9201C13.1181 15.0247 13.129 15.1305 13.1614 15.2306C13.1938 15.3308 13.2468 15.423 13.3172 15.5012C13.3875 15.5795 13.4735 15.6421 13.5696 15.685C13.6657 15.7278 13.7698 15.75 13.875 15.75H18.375V21C18.375 21.1989 18.454 21.3897 18.5947 21.5303C18.7353 21.671 18.9261 21.75 19.125 21.75C19.3239 21.75 19.5147 21.671 19.6553 21.5303C19.796 21.3897 19.875 21.1989 19.875 21V3C19.875 2.99551 19.8744 2.99121 19.8743 2.98673Z"
                fill="black"
              />
            </svg>

            <span>{recipe.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeGrid = () => {
  const recipes: Recipe[] = [
    {
      id: 1,
      title: 'Superfood Fruit Salad',
      image: '/landing-img/acai.png',
      duration: '30 Minutes',
      category: 'Snack',
      isLiked: false,
    },
    {
      id: 2,
      title: 'Toaster Oven Miso Salmon',
      image: '/landing-img/salmon.png',
      duration: '30 Minutes',
      category: 'Fish',
      isLiked: false,
    },
    {
      id: 3,
      title: 'Sandwich press pancakes',
      image: '/landing-img/pancake2.png',
      duration: '30 Minutes',
      category: 'Breakfast',
      isLiked: false,
    },
    {
      id: 4,
      title: 'Everything in your veggie drawer salad',
      image: '/landing-img/saladbowl.png',
      duration: '30 Minutes',
      category: 'Healthy',
      isLiked: true,
    },
    {
      id: 5,
      title: 'Air fryer meatballs',
      image: '/landing-img/meatballs.png',
      duration: '30 Minutes',
      category: 'Meat',
      isLiked: false,
    },
    {
      id: 6,
      isAd: true,
      image: '/landing-img/ad.png',
      title: 'Ad for college cooking',
      duration: '30 Minutes',
      category: 'Meat',
    },
    {
      id: 7,
      title: 'Orange and blueberry sandwich press pancakes',
      image: '/landing-img/pancake.png',
      duration: '30 Minutes',
      category: 'Sweet',
      isLiked: true,
    },
    {
      id: 8,
      title: 'Rice cooker chicken and rice',
      image: '/landing-img/ricemeal.png',
      duration: '30 Minutes',
      category: 'Snack',
      isLiked: false,
    },
    {
      id: 9,
      title: 'Rice cooker pasta',
      image: '/landing-img/pasta.png',
      duration: '30 Minutes',
      category: 'Noodles',
      isLiked: false,
    },
  ];

  return (
    <section className="recipes">
      <div className="recipes-header">
        <h2>Simple and tasty recipes</h2>
        <p>Take a look at some of the best recipes from our community</p>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RecipeGrid;