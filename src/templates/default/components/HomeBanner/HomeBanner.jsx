import styles from './HomeBanner.module.css';

const HomeBanner = () => {
   return (
      <div className={styles.homeBanner}>
         <div className={styles.title}>CREATIVE STUDIO</div>
         <div>in Athens</div>
      </div>
   );
};

export default HomeBanner;
