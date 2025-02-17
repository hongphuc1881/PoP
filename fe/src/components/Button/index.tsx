import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './styles.module.css';

type Props = ComponentPropsWithoutRef<'button'> & {
  theme: 'primary' | 'normal';
  size: 'small' | 'middle' | 'large';
};

export const Button = forwardRef<HTMLButtonElement, Props>(function ButtonBase(
  { className, size, theme, ...props },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(styles.button, styles[size], styles[theme], className)}
    />
  );
});
