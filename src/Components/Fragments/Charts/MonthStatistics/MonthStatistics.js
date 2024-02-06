import styles from './MonthStatistics.module.scss';
import {useEffect, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";

function MonthStatistics () {
    let token = useSelector((state) => state.auth.token);
    let language = useSelector((state) => state.app.current_locale)
    let ownerClinics = useSelector((state) => state?.owner?.month_key);
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        postResource('DoctorReworked', 'TotalEntries', token, '', {
            month: ownerClinics,
            year:dayjs().format('YYYY'),
        }).then((response) => {
            setData(response)
            setLoading(false)
        })
    }, [ownerClinics])

  return (
      <div>
          {
              loading ? <Preloader /> : <div className={styles.root}>
                  <div className={styles.title}>Your {dayjs().month(ownerClinics).format('MMMM')}’s statistics</div>
                  <div></div>
                  <div align={'center'} className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.visits}</div>
                      <div className={styles.text}>Visits</div>
                      {
                          language === 'en' ? <span className={styles.rightLine}></span> : <span></span>
                      }

                      <span className={styles.bottonLine}></span>
                  </div>
                  <div align={'center'} className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.appointments_count}</div>
                      <div className={styles.text}>Appointments</div>
                      <span className={styles.bottonLine}></span>
                      {
                          language === 'en' ? <span></span> : <span className={styles.rightLine}></span>
                      }

                  </div>
                  <div align={'center'} className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.telehealth_appointments_count}</div>
                      <div className={styles.text}>Telehealth appointments</div>

                      {
                          language === 'en' ? <span className={styles.rightLine_bottom}></span> : <span></span>
                      }
                  </div>
                  <div align={'center'} className={styles.itemGroup}>
                      <div className={styles.numbers}>{data?.days_off}</div>
                      <div className={styles.text}>Days off</div>
                      {
                          language === 'en' ? <span></span> : <span className={styles.rightLine_bottom}></span>
                      }
                  </div>
              </div>
          }


      </div>

  );
}
export default MonthStatistics;