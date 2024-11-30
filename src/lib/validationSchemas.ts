import * as Yup from 'yup';

export const signupValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

export const signinValidationSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required(),
});
