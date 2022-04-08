import type { NextPage } from 'next';
import CharacterCard from '../components/characterCard';
import Section from '../components/section';
import styles from '../styles/Home.module.scss';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import fetchCharacters from '../api/fetchCharacters';
import Loader from '../assets/loader.svg';

const Home: NextPage = () => {
  const { ref: loadMoreTriggerRef, inView } = useInView({
    threshold: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['characters', searchQuery],
    async ({ pageParam = 0, queryKey }) => {
      return await fetchCharacters(10, pageParam, queryKey[1]);
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.offset === lastPage.total ? undefined : lastPage.offset + 10,
    },
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <Section>
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
        onChange={handleSearch}
      />
      {status === 'loading' ? (
        <Loader style={{ margin: '30px auto', display: 'block' }} />
      ) : status !== 'success' ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          <div className={styles.list}>
            {data?.pages.map((page, pageIdx) => (
              <React.Fragment key={pageIdx}>
                {page.results.map((charcter, characterIdx) => (
                  <React.Fragment key={pageIdx + characterIdx}>
                    <CharacterCard
                      ref={characterIdx === 4 ? loadMoreTriggerRef : undefined}
                      {...charcter}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>

          {isFetchingNextPage ? (
            <Loader style={{ margin: '30px auto', display: 'block' }} />
          ) : !!searchQuery && !hasNextPage ? (
            <p>Nothing found</p>
          ) : (
            !hasNextPage && <p>Nothing more to load</p>
          )}
        </>
      )}
    </Section>
  );
};

export default Home;
