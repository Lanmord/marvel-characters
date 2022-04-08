import { motion, useCycle } from 'framer-motion';
import React, { useState } from 'react';
import styles from './style.module.scss';

const variantsItems = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  closed: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const variantsContainer = {
  open: {
    height: 'auto',

    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  closed: {
    height: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface IProps {
  title: string;
  items: string[];
}

const Accordion = ({ title, items }: IProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className={styles.container}>
      <h2 onClick={() => toggleOpen()}>{title}</h2>

      <motion.div
        initial={false}
        style={{ overflow: 'hidden' }}
        animate={isOpen ? 'open' : 'closed'}
        variants={variantsContainer}>
        <motion.ul variants={variantsItems}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Accordion;
