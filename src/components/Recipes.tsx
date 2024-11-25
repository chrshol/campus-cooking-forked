import React from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  author: string;
  authorImage: string;
  date:string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Superfood Fruit Salad',
    imageUrl: '/landing-img/acai.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Hailey',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 2,
    title: 'Steak frites in your dorm',
    imageUrl: '/landing-img/steakmeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Western',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 3,
    title: 'Fried rice with veges and eggs',
    imageUrl: '/landing-img/ricemeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Healthy',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 4,
    title: 'Rice cooker burritos',
    imageUrl: '/landing-img/burrito.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Eastern',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 5,
    title: 'Chicken salad and sweet potato fries',
    imageUrl: '/landing-img/loadedfries.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Healthy',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 6,
    title: 'Panini press sandwiches',
    imageUrl: '/landing-img/sandwichmeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Snack',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 7,
    title: 'Lettuce wraps',
    imageUrl: '/landing-img/lettucewrap.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Seafood',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
  {
    id: 8,
    title: 'Ramen soup.. in your rice cooker!',
    imageUrl: '/landing-img/pho.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Japanese',
    authorImage: '/landing-img/acai.png',
    date: 'Novemeber 5, 2024',
  },
];


const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      {/* Placeholder Text */}
      <input type="search" placeholder="Search article, news or recipe..." className="search-placeholder" required />

      {/* Search Button */}
      <div className="search-button">
        <span className="search-button-text">Search</span>
      </div>
    </div>
  );
};

const Author: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <div className="author-container">
    <img src={recipe.authorImage} alt={recipe.author} className="author-image" />
    <h5 className="author">{recipe.author}</h5>
    <svg
      className="vector"
      width="2"
      height="40"
      viewBox="0 0 2 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 0V40" stroke="black" strokeOpacity="0.3" />
    </svg>
    <h5 className="recipe-date">{recipe.date}</h5>
  </div>
);

const Pages: React.FC = () => {
  return (
    <div className="container">
      <h4 className="pages">1</h4>
      <h4 className="pages">2</h4>
      <h4 className="pages">3</h4>
      <h4 className="pages">4</h4>
      <h4 className="pages">5</h4>
      <h4 className="pages">...</h4>
    </div>
  );
};


const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <div className="recipe-card">
    <div className="recipe-image-container">
      <img src={recipe.imageUrl} alt={recipe.title} className="image-mask" />
    </div>
    <div className="recipe-content">
      <h3 className="recipe-name">{recipe.title}</h3>
      <h4 className="recipe-about">{recipe.description}</h4>
      <Author recipe={recipe} />
    </div>
  </div>
);

const Recipes: React.FC = () => (
  <div className="recipe-page">
    <div className="recipe-header">
      <h1 className="header">Community Recipe Blog</h1>
      <h2 className="subheader">
        Level up your health and well-being with these recipes!
      </h2>
      <SearchBar />
    </div>

    {/* Recipe Grid */}
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
    <Pages />
  </div>
);

export default Recipes;
