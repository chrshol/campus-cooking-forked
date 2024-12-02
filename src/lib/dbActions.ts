'use server';

import { Recipe, Appliances, Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { hash } from 'bcrypt';


/**
 * Adds a new recipe to the database.
 * @param recipe An object with the following properties: title, description, imageURL, instructions, appliances, ingredients, categories, and owner.
 */
export async function addRecipe(recipe: {
  title: string;
  description: string;
  imageURL: string;
  instructions: string;
  appliances: Appliances[]; // List of selected appliances
  ingredients: string[]; // List of ingredient names
  categories: Category[]; // List of selected categories
  owner: string; // User's ID
}) {
  try {
    // Create the recipe and handle relationships
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        imageURL: recipe.imageURL,
        instructions: recipe.instructions,
        appliances: recipe.appliances, // Enum stored as array
        categories: recipe.categories, // Enum stored as array
        owner: recipe.owner,
        ingredients: {
          connectOrCreate: recipe.ingredients.map((ingredient) => ({
            where: { name: ingredient },
            create: { name: ingredient },
          })),
        },
        user: {
          connect: { id: parseInt(recipe.owner) }, // Assumes owner is user ID as a string
        },
      },
    });

    // Redirect to the home page, CHANGE LATER TO RECIPES PAGE 
    redirect('/');
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw new Error('Failed to add recipe. Please try again.');
  }
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

