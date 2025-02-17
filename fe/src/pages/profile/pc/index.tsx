import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../../api/profile.api';
import { SideBar } from './_components/SideBar';
import styles from './styles.module.css';

export const ProfilePc = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const profile = data?.data.data;

  return (
    <section className={styles.module}>
      <SideBar />
      <div className={styles.main}>main</div>
    </section>
  );
};
