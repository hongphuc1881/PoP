import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { registerAccount } from '../../../api/auth.api';
import { Button } from '../../../components/Button';
import { ErrorResponseApi } from '../../../types/utils.type';
import { rules, schema, Schema } from '../../../utils/rule';
import { isAxiosUnprocessableEntityError } from '../../../utils/utils';
import styles from './styles.module.css';
export const RegisterPc = () => {
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirmPassword'>) =>
      registerAccount(body),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Schema>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword']);
    registerAccountMutation.mutate(body, {
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponseApi<Omit<Schema, 'confirmPassword'>>
          >(error)
        ) {
          console.log(error);

          const formError = error.response?.data.data;
          if (formError?.email) {
            setError('email', { message: formError.email });
          }
        }
      },
    });
  });

  return (
    <div className={styles.module}>
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register('email', rules.email)}
            id="email"
            placeholder="Nhập email của bạn"
          />
          <span className={styles.errorMessage}>{errors.email?.message}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Tên đăng nhập: </label>
          <input
            type="text"
            {...register('username', rules.username)}
            id="username"
            placeholder="Nhập tên đăng nhập"
          />
          <span className={styles.errorMessage}>
            {errors.username?.message}
          </span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Mật khẩu: </label>
          <input
            type="password"
            {...register('password', rules.password)}
            id="password"
            placeholder="Nhập mật khẩu"
          />
          <span className={styles.errorMessage}>
            {errors.password?.message}
          </span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Nhập lại mật khẩu: </label>
          <input
            type="password"
            {...register('confirmPassword', {
              ...rules.confirmPassword,
              validate: (value) =>
                value === getValues('password') || 'Mật khẩu chưa khớp',
            })}
            placeholder="Nhập lại mật khẩu"
            id="confirmPassword"
          />
          <span className={styles.errorMessage}>
            {errors.confirmPassword?.message}
          </span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Họ và tên: </label>
          <input
            type="text"
            {...register('fullName', rules.fullName)}
            id="fullName"
            placeholder="Nhập họ và tên"
          />
          <span className={styles.errorMessage}>
            {errors.fullName?.message}
          </span>
        </div>
        <div>
          <label htmlFor="gender">Giới tính: </label>
          <input
            type="radio"
            id="men"
            {...register('gender')}
            value="Nam"
            defaultChecked
          />
          <label htmlFor="men">Nam</label>
          <input type="radio" id="women" {...register('gender')} value="Nữ" />
          <label htmlFor="women">Nữ</label>
        </div>
        <Button type="submit" size="middle" theme="primary">
          Đăng ký
        </Button>
      </form>
    </div>
  );
};
