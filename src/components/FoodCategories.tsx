import Link from 'next/link';
import React from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  gradientClass: string;
}

const Categories = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Breakfast',
      image: '/landing-img/musubi.png',
      gradientClass: 'category-breakfast',
    },
    {
      id: 2,
      name: 'Vegan',
      image: '/landing-img/lettuce.png',
      gradientClass: 'category-vegan',
    },
    {
      id: 3,
      name: 'Meat',
      image: '/landing-img/steak.png',
      gradientClass: 'category-meat',
    },
    {
      id: 4,
      name: 'Dessert',
      image: '/landing-img/cake.png',
      gradientClass: 'category-dessert',
    },
    {
      id: 5,
      name: 'Lunch',
      image: '/landing-img/sandwich.png',
      gradientClass: 'category-lunch',
    },
    {
      id: 6,
      name: 'Chocolate',
      image: '/landing-img/chocolate.png',
      gradientClass: 'category-chocolate',
    },
  ];

  return (
    <section className="categories">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <Link href="/recipes">
          <button type="button" className="view-all-btn">
            View All Categories
          </button>
        </Link>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: '/recipes',
              query: { category: category.name }, 
            }}
            passHref
          >
            <div className="category-card cursor-pointer">
              <div className={`category-content ${category.gradientClass}`}>
                <img src={category.image} alt={category.name} className="category-image" />
                <h3 className="category-name line-black">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
