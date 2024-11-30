'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    // acceptTerms: boolean;
  };

/** The sign up page. */
const SignUp = () => {
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'), 
      email: Yup.string().required('Email is required').email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<SignUpForm>({
        resolver: yupResolver(validationSchema),
      });

      const onSubmit = async (data: SignUpForm) => {
        // console.log(JSON.stringify(data, null, 2));
        await createUser(data);
        // After creating, signIn with redirect to the add page
        await signIn('credentials', { callbackUrl: '/add', ...data });
      };

      return (
        <div className="auth-container">
          {/* Signup Section */}
          <section className="auth-section">
            <h1 className="auth-title">Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`signup-form-input ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="Enter your first name..."
                    {...register('firstName')}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
    
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`signup-form-input ${errors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Enter your last name..."
                    {...register('lastName')}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
              </div>
    
              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`signup-form-input ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Your email address..."
                    {...register('email')}
                  />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
              </div>
    
              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`signup-form-input ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter password..."
                    {...register('password')}
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
    
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Password Confirmation
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`signup-form-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm password..."
                    {...register('confirmPassword')}
                  />
                  <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
              </div>
    
              <div className="button-wrapper">
                <button type="submit" className="auth-button">
                  Get Cooking
                </button>
              </div>
            </form>
          </section>
        </div>
      );
    };
    
    export default SignUp;