'use server';

import { Recipe, Appliances, Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { hash } from 'bcrypt';



/**
 * Adds a new recipe to the database.
 * @param recipe, an object with the following properties: title, description, imageURL, instructions, appliances, ingredients, categories, owner.
 */
export async function addRecipe(recipe: {
  title: string;
  description: string;
  imageURL: string;
  instructions: string;
  appliances: string[];  // Enum values
  ingredients: string[]; // Ingredient model
  categories: string[];  // Enum values
  owner: string;
  userID: number;
}) {
  // Initialize appliance and category arrays (you can add checks if needed)
  let appliances: Appliances[] = [];
  let categories: Category[] = [];

  // Handle appliances (multiple selected)
  if (recipe.appliances.length > 0) {
    appliances = recipe.appliances.map((appliance) => Appliances[appliance as keyof typeof Appliances]);
  }

  // Handle categories (multiple selected)
  if (recipe.categories.length > 0) {
    categories = recipe.categories.map((category) => Category[category as keyof typeof Category]);
  }

  // Create the recipe in the database
  const newRecipe = await prisma.recipe.create({
    data: {
      title: recipe.title,
      description: recipe.description,
      imageURL: recipe.imageURL,
      instructions: recipe.instructions,
      owner: recipe.owner,
      appliances: {
        set: appliances,  // Enum array for appliances
      },
      ingredients: {
        create: recipe.ingredients.map((ingredient) => ({
          name: ingredient,
        })),
      },
      categories: {
        set: categories,  // Enum array for categories
      },
      userID: recipe.userID,
    },
  });

  // After adding the recipe, redirect to a list or another page
  redirect('/');
}



/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { firstName: string; lastName: string; email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password,
    },
  });
}