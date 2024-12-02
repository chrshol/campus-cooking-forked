import * as Yup from 'yup';

export const AddRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  
  imageURL: Yup.string()
    .url('Invalid URL format')
    .required('Image URL is required'),

  instructions: Yup.string()
    .min(20, 'Instructions must be at least 20 characters')
    .required('Instructions are required'),

  appliances: Yup.array()
    .of(Yup.string().required('Appliance is required'))
    .min(1, 'At least one appliance must be selected')
    .required('Appliances are required'),

  ingredients: Yup.string()
    .required('Ingredients are required')
    .min(3, 'Please enter at least one ingredient'),

  categories: Yup.array()
    .of(Yup.string().required('Category is required'))
    .min(1, 'At least one category must be selected')
    .required('Categories are required'),

  owner: Yup.string()
    .email('Invalid email format')
    .required('Owner email is required'),

  userID: Yup.number()
    .positive('User ID must be a positive number')
    .required('User ID is required'),
});
