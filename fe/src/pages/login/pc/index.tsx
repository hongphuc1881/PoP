import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../../../api/auth.api';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import internalPath from '../../../constants/path';
import { ErrorResponseApi } from '../../../types/utils.type';
import { schema, Schema } from '../../../utils/rule';
import { isAxiosUnprocessableEntityError } from '../../../utils/utils';
import styles from './styles.module.css';
export const LoginPc = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (body: Pick<Schema, 'email' | 'password'>) =>
      loginAccount(body),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Pick<Schema, 'email' | 'password'>>({
    resolver: yupResolver(schema.pick(['email', 'password'])),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess() {
        navigate('/');
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Schema>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            setError('email', { message: formError.email });
          }
          if (formError?.password) {
            setError('password', { message: formError.password });
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
            {...register('email')}
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
          <label htmlFor="password">Password </label>
          <input
            type="password"
            {...register('password')}
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <Typography tag="span" className={styles.errorMessage}>
              {errors.password.message}
            </Typography>
          )}
        </div>
        <Button
          type="submit"
          size="middle"
          theme="primary"
          className={styles.loginBtn}
          disabled={loginMutation.isPending}
        >
          Login
        </Button>
        <Typography tag="p" textAlign="left" size="small">
          if you do not have an account?{' '}
          <Link to={internalPath.register} className={styles.registerLink}>
            Register
          </Link>{' '}
          here!
        </Typography>
      </form>
    </div>
  );
};
