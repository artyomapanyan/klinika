import styles from './MonthStatistics.module.scss';

function MonthStatistics () {
  return (
    <div className={styles.root}>
      <div className={styles.itemGroup}>
        <div className={styles.numbers}>40K</div>
        <div className={styles.text}>Visits</div>
        <span className={styles.rightLine}></span>
        <span className={styles.bottonLine}></span>
      </div>
      <div className={styles.itemGroup}>
        <div className={styles.numbers}>145К</div>
        <div className={styles.text}>Appointments</div>
        <span className={styles.bottonLine}></span>
      </div>
      <div className={styles.itemGroup}>
        <div className={styles.numbers}>42</div>
        <div className={styles.text}>Doctors</div>
        <span className={styles.rightLine}></span>
        <span className={styles.bottonLine}></span>
      </div>
      <div className={styles.itemGroup}>
        <div className={styles.numbers}>1.8K</div>
        <div className={styles.text}>Reviews</div>
        <span className={styles.bottonLine}></span>
      </div>
      <div className={styles.itemGroup}>
        <div className={styles.numbers}>42</div>
        <div className={styles.text}>Doctors</div>
        <span className={styles.rightLine}></span>
      </div>
      <div className={styles.itemGroup}>
        <div className={styles.numbers}>1.8K</div>
        <div className={styles.text}>Reviews</div>
      </div>
    </div>
  );
}
export default MonthStatistics;