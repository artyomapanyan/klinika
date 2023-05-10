import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {postResource} from "../../../Functions/api_calls";
import dayjs from "dayjs";
import {Space, Spin} from "antd";
import arrowGreen from "../../../../dist/icons/arrow-green.svg";
import arrowRed from "../../../../dist/icons/arrow-red.svg";
import {t} from "i18next";
import {GMBK} from "../../../../functions";

function SuperAdminRegisteredClinics() {
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);
    const drReworked = useSelector((state) => state?.owner);
    const [data, setData] = useState({
        count: 0,
        prev_month_count: 0,
        percent_change: 0,
    });



    useEffect(()=>{
        setLoading(true)
        postResource('SuperAdmin','AdminTotalClinic', token,  '',{
            year:dayjs().format('YYYY'),
            month:drReworked.month_key,
        } ).then((response) => {
            setData(response)
            setLoading(false)
        })



    },[drReworked.month_key])




    return (<Spin spinning={loading}>
            <Space>
                <Space direction={'vertical'} className={'dr_progress_big_div'}>
                    <div className={'clinic_owner_big_text'}>
                        {data.clinics}
                    </div>
                    <div style={{color: data.percentage > 0 ? "#6DAF56" : data.percentage == 0 ? '#a4a2a2' : "rgba(207, 83, 62, 1)"}}>
                        {
                            data?.clinics - data?.clinics_prev_month !== 0 ? <img alt={'icons'} src={data.percentage > 0 ? arrowGreen : arrowRed}/> : <div></div>
                        }
                        <span style={{fontWeight: 700, marginLeft: 5}}>{data?.clinics - data?.clinics_prev_month}{
                            data?.clinics - data?.clinics_prev_month !== 0 ? ' New' : ''
                        }</span>
                    </div>
                </Space>

                <Space direction={'vertical'}>
                    <div className={'avg_montly'}>
                        <span>{t("Registered clinics")}, </span>
                        <span style={{fontWeight: 700, color: '#6DAF56'}}>{t(' new')}</span>

                    </div>
                    <div className={'dr_counter_text'}>
                        {t("registration")}
                    </div>
                </Space>
            </Space>
        </Spin>
    )

}

export default SuperAdminRegisteredClinics;