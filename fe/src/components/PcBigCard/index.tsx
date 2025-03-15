import clsx from 'clsx';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '../Typography';
import { TypographyHeading } from '../TypographyHeading';
import styles from './styles.module.css';
type Props = {
  title: string;
  content: string;
  username: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
};

const MAX_HEIGHT = 600;

export const PcBigCard = ({ title, content, username, updatedAt }: Props) => {
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const moduleRef = useRef<HTMLElement | null>(null);

  const updatedAtFormatted = format(
    new Date(updatedAt || ''),
    "d 'tháng' M 'năm' y 'lúc' HH:mm",
    {
      locale: vi,
    }
  );
  useEffect(() => {
    if (moduleRef.current) {
      const { height } = moduleRef.current.getBoundingClientRect();

      setShowBtnLoadMore(height > MAX_HEIGHT);
    }
  }, []);

  return (
    <article className={styles.module} ref={moduleRef}>
      <div className={styles.header}>
        <Typography tag="span" theme="bold">
          {username}
        </Typography>
        {updatedAt && (
          <>
            <Typography tag="span" size="xsmall">
              {updatedAtFormatted}
            </Typography>
          </>
        )}
      </div>
      <div className={styles.body}>
        <TypographyHeading tag="h3">{title}</TypographyHeading>
        <Typography
          tag="p"
          size="small"
          className={clsx(styles.content, showBtnLoadMore && styles.loadMore)}
        >
          {content}
        </Typography>
        {showBtnLoadMore && (
          <Typography
            className={styles.loadMoreBtn}
            tag="span"
            size="small"
            theme="bold"
            onClick={() => {
              setShowBtnLoadMore(false);
            }}
          >
            Load more
          </Typography>
        )}
      </div>
      <div className={styles.footer}>
        <button className={clsx(styles.button, styles.buttonLike)}>
          <Typography tag="span" theme="bold">
            Like
          </Typography>
        </button>
        <button className={clsx(styles.button, styles.buttonComment)}>
          <Typography tag="span" theme="bold">
            Comment
          </Typography>
        </button>
      </div>
    </article>
  );
};
