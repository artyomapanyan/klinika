import styles from './MonthStatistics.module.scss';
import {useEffect, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";

function MonthStatistics () {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner?.month_key);
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        postResource('DoctorReworked', 'TotalEntries', token, '', ).then((response) => {
            setData(response)
            setLoading(false)
        })
    }, [])

  return (
      <div>
          {
              loading ? <Preloader /> : <div className={styles.root}>
                  <div className={styles.title}>Your {dayjs().month(ownerClinics).format('MMMM')}’s statistics</div>
                  <div></div>
                  <div className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.clinic_visit_appointments_count}</div>
                      <div className={styles.text}>Visits</div>
                      <span className={styles.rightLine}></span>
                      <span className={styles.bottonLine}></span>
                  </div>
                  <div className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.appointments_count}</div>
                      <div className={styles.text}>Appointments</div>
                      <span className={styles.bottonLine}></span>
                  </div>
                  <div className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.rating}</div>
                      <div className={styles.text}>{dayjs().month(ownerClinics).format('MMMM')} Rating</div>
                      <span className={styles.rightLine}></span>
                      <span className={styles.bottonLine}></span>
                  </div>
                  <div className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.clinic_visit_appointments_count}</div>
                      <div className={styles.text}>Reviews</div>
                      <span className={styles.bottonLine}></span>
                  </div>
                  <div className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.telehealth_appointments_count}</div>
                      <div className={styles.text}>Telehealth appointments</div>
                      <span className={styles.rightLine}></span>
                  </div>
                  <div className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.days_off}</div>
                      <div className={styles.text}>Days off</div>
                  </div>
              </div>
          }


      </div>

  );
}
export default MonthStatistics;