import { PrismaClient, Role, Appliances, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database...');

  // Create users concurrently
  const userPromises = config.defaultUsers.map(async (user) => {
    const hashedPassword = await hash(user.password, 10);
    console.log(`  Creating user: ${user.email}`);
    return prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: user.role as Role,
      },
    });
  });
  await Promise.all(userPromises);

  // Create recipes concurrently
  console.log('Creating recipes...');
  const recipePromises = config.defaultRecipes.map(async (recipe) => {
    console.log(`  Adding recipe: ${recipe.title}`);

    // Create the recipe
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        imageURL: recipe.imageURL,
        instructions: recipe.instructions,
        email: recipe.email,
      },
    });

    // Create ingredients for this recipe
    const ingredientPromises = recipe.ingredients.map(async (ingredient) => {
      return prisma.ingredient.create({
        data: {
          name: ingredient.name,
          quantity: ingredient.quantity,
          recipeId: createdRecipe.id,
        },
      });
    });
    await Promise.all(ingredientPromises);

    // Create categories for this recipe
    const categoryPromises = recipe.categories.map(async (category) => {
      return prisma.recipeCategory.create({
        data: {
          category: category as Category,
          recipeId: createdRecipe.id,
        },
      });
    });
    await Promise.all(categoryPromises);

    // Create appliances for this recipe
    const appliancePromises = recipe.appliances.map(async (appliance) => {
      return prisma.recipeAppliance.create({
        data: {
          appliance: appliance as Appliances,
          recipeId: createdRecipe.id,
        },
      });
    });
    await Promise.all(appliancePromises);
  });
  await Promise.all(recipePromises);

  console.log('Database seeding completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });