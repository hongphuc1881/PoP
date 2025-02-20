import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './styles.module.css';
type Props = {
  tag: 'p' | 'span';
  theme?: 'regular' | 'bold';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  textAlign?: 'center' | 'left' | 'right';
  className?: string;
} & HTMLAttributes<HTMLElement>;
export const Typography = forwardRef<HTMLParagraphElement, Props>(
  (
    {
      tag: Tag = 'p',
      size = 'M',
      theme = 'regular',
      textAlign = 'left',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Tag
        {...props}
        ref={ref}
        className={clsx(
          styles.typography,
          styles[size],
          styles[theme],
          styles[textAlign],
          className
        )}
      />
    );
  }
);
