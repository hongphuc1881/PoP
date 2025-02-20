import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerAccount } from '../../../api/auth.api';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import internalPath from '../../../constants/path';
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
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword']);
    registerAccountMutation.mutate(body, {
      onSuccess() {
        navigate('/');
      },
      onError(error) {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponseApi<Omit<Schema, 'confirmPassword'>>
          >(error)
        ) {
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
          <label htmlFor="email">Email </label>
          <input
            type="email"
            {...register('email', rules.email)}
            id="email"
            placeholder="example@email.com"
          />
          {errors.email && (
            <Typography tag="span" className={styles.errorMessage}>
              {errors.email.message}
            </Typography>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            {...register('username', rules.username)}
            id="username"
            placeholder="John Doe"
          />
          {errors.username && (
            <Typography tag="span" className={styles.errorMessage}>
              {errors.username.message}
            </Typography>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            {...register('password', rules.password)}
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <Typography tag="span" className={styles.errorMessage}>
              {errors.password.message}
            </Typography>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm password </label>
          <input
            type="password"
            {...register('confirmPassword', {
              ...rules.confirmPassword,
              validate: (value) =>
                value === getValues('password') || 'Password does not match',
            })}
            placeholder="Enter your confirm password"
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <Typography tag="span" className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </Typography>
          )}
        </div>

        <Button
          className={styles.registerBtn}
          type="submit"
          size="middle"
          theme="primary"
        >
          Register
        </Button>
        <Typography tag="p" textAlign="left" size="small">
          if you already have an account
          <Link to={internalPath.login} className={styles.loginLink}>
            {' '}
            Login
          </Link>{' '}
          here!
        </Typography>
      </form>
    </div>
  );
};
