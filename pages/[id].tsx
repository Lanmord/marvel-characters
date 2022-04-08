import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import React from 'react';
import fetchCharacter from '../api/fetchCharacter';
import Accordion from '../components/accordion';
import Section from '../components/section';
import styles from '../styles/CharacterPage.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const data = await fetchCharacter(params?.id);
    const comics = data.results[0].comics.items.map((item) => item.name);
    const series = data.results[0].series.items.map((item) => item.name);
    const stories = data.results[0].stories.items.map((item) => item.name);
    const events = data.results[0].events.items.map((item) => item.name);
    const name = data.results[0].name;
    const description = data.results[0].description;
    const thumbnail = data.results[0].thumbnail.path + '.' + data.results[0].thumbnail.extension;

    return {
      props: {
        comics,
        series,
        stories,
        events,
        name,
        description,
        thumbnail,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const CharacterPage = ({
  comics,
  series,
  stories,
  events,
  name,
  description,
  thumbnail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <Image
            src={thumbnail}
            layout="fill"
            alt=""
            placeholder="blur"
            objectFit="cover"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=`}
          />
        </div>
        <div className={styles.info}>
          <h1>{name}</h1>
          {description && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem porro explicabo
              corporis sed error vitae corrupti cupiditate possimus ipsa iusto, tempora repudiandae
              reiciendis odio neque debitis ratione a laboriosam velit non voluptatem. Quia delectus
              cupiditate sapiente debitis magnam sint, qui quae quos molestias, ducimus voluptatum
              dolor ut a voluptas ad magni obcaecati eius! Tempora culpa velit alias voluptatibus
              ducimus! Vitae, reiciendis est odit unde obcaecati deserunt beatae voluptatum mollitia
              quos distinctio corporis. Necessitatibus quis vero eveniet asperiores, excepturi non
              tenetur magnam expedita debitis! Dicta vitae ullam sint recusandae perspiciatis nam
              repellendus quisquam dolor doloribus. Aspernatur voluptates repellendus hic quas
              dolore!
            </p>
          )}

          {comics.length !== 0 && <Accordion title="comics" items={comics} />}
          {series.length !== 0 && <Accordion title="series" items={series} />}
          {stories.length !== 0 && <Accordion title="stories" items={stories} />}
          {events.length !== 0 && <Accordion title="events" items={events} />}
        </div>
      </div>
    </Section>
  );
};

export default CharacterPage;
