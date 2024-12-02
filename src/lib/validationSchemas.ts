import * as Yup from 'yup';
import { Appliances, Category } from '@prisma/client';

/**
 * Validation schema for adding a recipe.
 */
export const AddRecipeSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  imageURL: Yup.string().url('Invalid image URL').required('Image URL is required'),
  instructions: Yup.string().required('Instructions are required'),
  appliances: Yup.array()
    .of(Yup.mixed<Appliances>().oneOf(Object.values(Appliances), 'Invalid appliance selected'))
    .min(1, 'At least one appliance must be selected')
    .required('Appliances are required'),
  ingredients: Yup.array()
    .of(Yup.string().required('Each ingredient must be a string'))
    .min(1, 'At least one ingredient must be provided')
    .required('Ingredients are required'),
  categories: Yup.array()
    .of(Yup.mixed<Category>().oneOf(Object.values(Category), 'Invalid category selected'))
    .min(1, 'At least one category must be selected')
    .required('Categories are required'),
  owner: Yup.string().required('Owner is required'), // User ID
});
