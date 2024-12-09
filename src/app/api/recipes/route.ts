import { NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/dbActions';

export async function GET() {
  try {
    const recipes = await getAllRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: 'Could not fetch recipes' }, { status: 500 });
  }
}
