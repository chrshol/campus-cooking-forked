import { PrismaClient, Role, Appliances, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  // Seed Users
  await Promise.all(
    config.defaultUsers.map(async (user) => {
      const hashedPassword = await hash(user.password, 10);
      const role: Role = user.role as Role;

      console.log(`Creating user: ${user.email} with role: ${role}`);
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: hashedPassword,
          role,
        },
      });
    }),
  );

  // // Seed Ingredients
  // await Promise.all(
  //   config.defaultIngredients.map(async (ingredient) => {
  //     console.log(`Adding ingredient: ${ingredient.name}`);
  //     const existingIngredient = await prisma.ingredient.findUnique({
  //       where: { name: ingredient.name },
  //     });

  //     if (existingIngredient) {
  //       console.log(`Ingredient ${ingredient.name} already exists`);
  //     } else {
  //       await prisma.ingredient.create({
  //         data: {
  //           name: ingredient.name,
  //         },
  //       });
  //       console.log(`Ingredient ${ingredient.name} added`);
  //     }
  //   }),
  // );

  // Seed Recipes
  await Promise.all(
    config.defaultRecipes.map(async (recipe) => {
      console.log(`Creating recipe: ${recipe.title}`);
      const user = await prisma.user.findUnique({
        where: { email: 'admin@campuscooking.com' },
      });

      if (!user) {
        console.error(`No admin user found for recipe: ${recipe.title}`);
        return;
      }

      // Find Ingredients
      const ingredients = await prisma.ingredient.findMany({
        where: { name: { in: recipe.ingredients } },
      });

      // Create Recipe
      await prisma.recipe.create({
        data: {
          title: recipe.title,
          description: recipe.description,
          imageURL: recipe.imageURL,
          instructions: recipe.instructions,
          categories: recipe.categories as Category[],
          appliances: recipe.appliances as Appliances[],
          user: {
            connect: { id: user.id },
          },
          ingredients: {
            connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
          },
        },
      });
    }),
  );

  console.log('Database seeding complete');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
