import type { RegisterOptions } from 'react-hook-form';
import * as yup from 'yup';

type Rules = {
  [key in keyof Schema]?: RegisterOptions<Schema, key>;
};

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập email',
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
    maxLength: {
      value: 150,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
  },

  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập mật khẩu',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
    maxLength: {
      value: 150,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
  },

  confirmPassword: {
    required: {
      value: true,
      message: 'Vui lòng nhập lại mật khẩu',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
    maxLength: {
      value: 150,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
  },

  username: {
    required: {
      value: true,
      message: 'Vui lòng nhập tên đăng nhập',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
    maxLength: {
      value: 150,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
  },
  fullName: {
    required: {
      value: true,
      message: 'Vui lòng nhập đầy đủ họ và tên',
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
    maxLength: {
      value: 150,
      message: 'Độ dài từ 6 đến 150 ký tự',
    },
  },
};

export const schema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email không đúng định dạng')
    .min(6, 'Độ dài từ 6 đến 150 ký tự')
    .max(150, 'Độ dài từ 6 đến 150 ký tự'),

  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Độ dài từ 6 đến 150 ký tự')
    .max(150, 'Độ dài từ 6 đến 150 ký tự'),

  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .min(6, 'Độ dài từ 6 đến 150 ký tự')
    .max(150, 'Độ dài từ 6 đến 150 ký tự')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),

  username: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .min(6, 'Độ dài từ 6 đến 150 ký tự')
    .max(150, 'Độ dài từ 6 đến 150 ký tự'),

  fullName: yup
    .string()
    .required('Vui lòng nhập đầy đủ họ và tên')
    .min(6, 'Độ dài từ 6 đến 150 ký tự')
    .max(150, 'Độ dài từ 6 đến 150 ký tự'),
  gender: yup
    .string()
    .required('Vui lòng chọn giới tính')
    .oneOf(['Nam', 'Nữ'], 'Giới tính không hợp lệ'),
});

export type Schema = yup.InferType<typeof schema>;
