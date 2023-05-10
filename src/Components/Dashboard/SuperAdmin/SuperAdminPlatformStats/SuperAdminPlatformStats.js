import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import Preloader from "../../../Preloader";
import styles from "../../../Fragments/Charts/MonthStatistics/MonthStatistics.module.scss";
import dayjs from "dayjs";

function SuperAdminPlatformStats () {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner?.month_key);
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
                    <div className={styles.title}>Platform stats</div>
                    <div></div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.users}</div>
                        <div className={styles.text}>Users</div>
                        <span className={styles.rightLine}></span>
                        <span className={styles.bottonLine}></span>
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.appointments}</div>
                        <div className={styles.text}>Appointments</div>
                        <span className={styles.bottonLine}></span>
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.doctors}</div>
                        <div className={styles.text}>Doctors</div>
                        <span className={styles.rightLine}></span>
                        <span className={styles.bottonLine}></span>
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.reviews}</div>
                        <div className={styles.text}>Reviews</div>
                        <span className={styles.bottonLine}></span>
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.downloads}</div>
                        <div className={styles.text}>Downloads</div>
                        <span className={styles.rightLine}></span>
                    </div>
                    <div className={styles.itemGroup}>
                        <div className={styles.numbers}>{data?.clinics}</div>
                        <div className={styles.text}>Clinics</div>
                    </div>
                </div>
            }


        </div>

    );
}
export default SuperAdminPlatformStats;