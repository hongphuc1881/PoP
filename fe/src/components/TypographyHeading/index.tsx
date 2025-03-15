import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './styles.module.css';

type Props = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  theme?: 'regular' | 'bold';
  size?: 'xxl' | 'xl' | 'l' | 'm' | 's';
  textAlign?: 'center' | 'left' | 'right';
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export const TypographyHeading = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      tag: Tag,
      theme = 'regular',
      size = 'm',
      className,
      textAlign = 'left',
      ...props
    },
    ref
  ) => {
    return (
      <Tag
        ref={ref}
        className={clsx(styles.heading, className)}
        data-size={size}
        data-theme={theme}
        data-textalign={textAlign}
        {...props}
      />
    );
  }
);
