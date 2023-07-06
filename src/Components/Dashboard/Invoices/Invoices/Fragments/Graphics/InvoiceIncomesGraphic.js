import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {postResource} from "../../../../../Functions/api_calls";
import dayjs from "dayjs";
import {Space, Spin} from "antd";
import arrowGreen from "../../../../../../dist/icons/arrow-green.svg";
import arrowRed from "../../../../../../dist/icons/arrow-red.svg";
import {t} from "i18next";
import {GMBK} from "../../../../../../functions";

function InvoiceIncomesGraphic() {
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const drReworked = useSelector((state) => state?.owner);
    const [data, setData] = useState({
        count: 0,
        prev_month_count: 0,
        percent_change: 0,
    });

    // useEffect(()=>{
    //     postResource('DoctorReworked','MonthlyAppointments', token,  '',{
    //         year:dayjs().format('YYYY'),
    //         month:drReworked.month_key,
    //     } ).then((response) => {
    //         setData(response)
    //         setLoading(false)
    //     })
    //
    //
    //
    // },[drReworked.month_key])

    return (<Spin spinning={loading}>
            <Space>
                <Space direction={'vertical'} className={'progress_big_div'}>
                    <div className={'clinic_owner_big_text'}>
                        {100}
                    </div>
                    <div style={{color: data.percent_change > 0 ? "#6DAF56" : 200 ? '#a4a2a2' : "rgba(207, 83, 62, 1)"}}>
                        {
                            data.percent_change !== 0 ? <img alt={'icons'} src={data.percent_change > 0 ? arrowGreen : arrowRed}/> : <div></div>
                        }
                        <span style={{fontWeight: 700, marginLeft: 5}}>20%</span>
                    </div>
                </Space>

                <Space direction={'vertical'} style={{marginLeft: 17}}>
                    <div className={'avg_montly'}>
                        <span>{t("Total ")}</span>
                        <span style={{fontWeight: 700}}>{t(50+"’s")}</span>

                    </div>
                    <div className={'dr_counter_text'}>
                        {t("appointments")}
                    </div>
                </Space>
            </Space>
        </Spin>
    )

}

export default InvoiceIncomesGraphic;