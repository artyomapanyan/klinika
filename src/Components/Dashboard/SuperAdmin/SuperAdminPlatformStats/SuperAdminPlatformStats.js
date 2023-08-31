import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import Preloader from "../../../Preloader";
import styles from "../../../Fragments/Charts/MonthStatistics/MonthStatistics.module.scss";
import {t} from "i18next";

function SuperAdminPlatformStats () {
    let token = useSelector((state) => state.auth.token);
    let language = useSelector((state) => state.app.current_locale)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        postResource('SuperAdmin', 'SuperAdminPlatform', token, '', ).then((response) => {

            setData(response)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            {
                loading ? <Preloader /> : <div className={styles.root}>
                    <div className={styles.title}>{t('Platform stats')}</div>
                    <div></div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.users}</div>
                        <div className={styles.text}>{t('Users')}</div>

                        <span className={styles.bottonLine}></span>
                        {
                            language === 'en' ? <span className={styles.rightLine}></span> : <span></span>
                        }
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.appointments}</div>
                        <div className={styles.text}>{t('Appointments')}</div>
                        <span className={styles.bottonLine}></span>
                        {
                            language === 'en' ? <span></span> : <span className={styles.rightLine}></span>
                        }
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.doctors}</div>
                        <div className={styles.text}>Doctors</div>

                        <span className={styles.bottonLine}></span>
                        {
                            language === 'en' ? <span className={styles.rightLine}></span> : <span></span>
                        }
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.reviews}</div>
                        <div className={styles.text}>{t('Reviews')}</div>
                        <span className={styles.bottonLine}></span>
                        {
                            language === 'en' ? <span></span> : <span className={styles.rightLine}></span>
                        }
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.downloads}</div>
                        <div className={styles.text}>{t('Downloads')}</div>
                        {
                            language === 'en' ? <span className={styles.rightLine}></span> : <span></span>
                        }

                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.clinics}</div>
                        <div className={styles.text}>{t('Clinics')}</div>
                        {
                            language === 'en' ? <span></span> : <span className={styles.rightLine}></span>
                        }
                    </div>
                </div>
            }


        </div>

    );
}
export default SuperAdminPlatformStats;