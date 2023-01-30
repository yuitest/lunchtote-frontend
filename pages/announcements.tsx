import { NextPage } from 'next';
import useSWR from 'swr';

import CommentarySection from '@/components/atoms/CommentarySection/CommentarySection';
import SubHeading from '@/components/atoms/SubHeading/SubHeading';
import AnnouncementOverview from '@/components/organisms/AnnouncementOverview/AnnouncementOverview';
import Loading from '@/components/organisms/Loading/Loading';
import PageData from '@/components/organisms/PageData/PageData';
import DefaultPage from '@/components/template/DefaultPage/DefaultPage';
import styles from '@/styles/pages/home.module.scss';

type Response = {
  id: number;
  type: AnnouncementType;
  overview: string;
  announcedAt: string;
  updatedAt: string;
}[];

const Announcements: NextPage = () => {
  const { data, error } = useSWR<Response>('/announcements');

  if (error) {
    return (
      <DefaultPage>
        <PageData title="お知らせ一覧" />
        <SubHeading>お知らせ一覧</SubHeading>
        <CommentarySection>
          読み込み中にエラーが発生しました。
        </CommentarySection>
      </DefaultPage>
    );
  }

  if (!data) {
    return (
      <DefaultPage>
        <PageData title="お知らせ一覧" />
        <SubHeading>お知らせ一覧</SubHeading>
        <Loading />
      </DefaultPage>
    );
  }

  return (
    <DefaultPage>
      <PageData title="お知らせ一覧" />
      <SubHeading>お知らせ一覧</SubHeading>
      <section className={styles['announcements']}>
        {data.map((announcement) => (
          <AnnouncementOverview
            key={announcement.id}
            id={announcement.id}
            type={announcement.type}
            overview={announcement.overview}
            announcedAt={new Date(announcement.announcedAt)}
            updatedAt={new Date(announcement.updatedAt)}
          />
        ))}
      </section>
    </DefaultPage>
  );
};

export default Announcements;
