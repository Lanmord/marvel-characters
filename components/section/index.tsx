import React from 'react';
import styles from './style.module.scss';

const Section = ({ children }: { children: React.ReactNode }) => {
  return <article className={styles.article}>{children}</article>;
};

export default Section;
