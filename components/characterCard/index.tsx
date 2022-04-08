import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IShortCharacterInfo from '../../interfaces/IShortCharacterInfo';
import styles from './style.module.scss';

const CharacterCard = React.forwardRef(
  (
    { thumbnail, name, description, id }: IShortCharacterInfo,
    ref: React.LegacyRef<HTMLDivElement> | undefined,
  ) => {
    return (
      <div ref={ref} className={styles.container}>
        <div className={styles.thumbnail}>
          <Image
            src={thumbnail.path + '.' + thumbnail.extension}
            layout="fill"
            alt=""
            placeholder="blur"
            objectFit="cover"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=`}
          />
        </div>
        <div className={styles.info}>
          <h2>{name}</h2>
          {description && <p>{description}</p>}
          <Link href={`/${id}`}>
            <a className={styles.link_button}>Learn more</a>
          </Link>
        </div>
      </div>
    );
  },
);

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;
