import { NextResponse } from 'next/server';
import { getAllRecipes, searchRecipes } from '@/lib/dbActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search'); // Get the 'search' query parameter

  try {
    let recipes;

    if (searchQuery) {
      // Call a function to fetch filtered recipes based on the search query
      recipes = await searchRecipes(searchQuery);
    } else {
      // Fetch all recipes if no search query is provided
      recipes = await getAllRecipes();
    }

    return NextResponse.json(recipes, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Could not fetch recipes' }, { status: 500 });
  }
}
