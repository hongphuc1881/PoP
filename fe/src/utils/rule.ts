import type { RegisterOptions } from 'react-hook-form';
import * as yup from 'yup';

type Rules = {
  [key in keyof Schema]?: RegisterOptions<Schema, key>;
};

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Please enter your email',
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'This field must be an email',
    },
    minLength: {
      value: 6,
      message: 'Please enter between 6 and 150 characters',
    },
    maxLength: {
      value: 150,
      message: 'Please enter between 6 and 150 characters',
    },
  },

  password: {
    required: {
      value: true,
      message: 'Please enter your password',
    },
    minLength: {
      value: 6,
      message: 'Please enter between 6 and 150 characters',
    },
    maxLength: {
      value: 150,
      message: 'Please enter between 6 and 150 characters',
    },
  },

  confirmPassword: {
    required: {
      value: true,
      message: 'Please re-enter password',
    },
    minLength: {
      value: 6,
      message: 'Please enter between 6 and 150 characters',
    },
    maxLength: {
      value: 150,
      message: 'Please enter between 6 and 150 characters',
    },
  },

  username: {
    required: {
      value: true,
      message: 'Please enter your username',
    },
    minLength: {
      value: 6,
      message: 'Please enter between 6 and 150 characters',
    },
    maxLength: {
      value: 150,
      message: 'Please enter between 6 and 150 characters',
    },
  },
};

export const schema = yup.object({
  email: yup
    .string()
    .required('Please enter your email')
    .email('This field must be an email')
    .min(6, 'Please enter between 6 and 150 characters')
    .max(150, 'Please enter between 6 and 150 characters'),

  password: yup
    .string()
    .required('Please enter your password')
    .min(6, 'Please enter between 6 and 150 characters')
    .max(150, 'Please enter between 6 and 150 characters'),

  confirmPassword: yup
    .string()
    .required('Please re-enter password')
    .min(6, 'Please enter between 6 and 150 characters')
    .max(150, 'Please enter between 6 and 150 characters')
    .oneOf([yup.ref('password')], 'Password does not match'),

  username: yup
    .string()
    .required('Please enter your username')
    .min(6, 'Please enter between 6 and 150 characters')
    .max(150, 'Please enter between 6 and 150 characters'),
});

export type Schema = yup.InferType<typeof schema>;
