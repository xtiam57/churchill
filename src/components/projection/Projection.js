import React from 'react';
import styles from './Projection.module.css';

export default function Projection({ children, cite }) {
  return (
    <div className={styles.fit}>
      <div className={styles.wrapper}>
        <div className={styles.cite}>{cite}</div>
        <p dangerouslySetInnerHTML={{ __html: children }} />
      </div>
    </div>
  );
}
