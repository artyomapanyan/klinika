import React, {useEffect, useState} from "react";
import {Space, Spin} from "antd";
import arrowGreen from "../../../dist/icons/arrow-green.svg";
import arrowRed from "../../../dist/icons/arrow-red.svg";
import {t} from "i18next";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import dayjs from "dayjs";
import {GMBK} from "../../../functions";

function ClinicManagerProgressCount({dataKey}) {
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);
    const ownerClinics = useSelector((state) => state?.owner);
    const [data, setData] = useState({
        count: 0,
        prev_month_count: 0,
        percent_change: 0,
    });

    useEffect(()=>{
        postResource('ClinicManager',dataKey, token,  '',{
            month:ownerClinics.month_key,
            year:dayjs().format('YYYY')
        } ).then((response) => {
            setData(response)
            setLoading(false)
        })


    },[ownerClinics.month_key])

    return (<Spin spinning={loading}>
            <Space>
                <Space direction={'vertical'} className={'progress_big_div'}>
                    <div className={'clinic_owner_big_text'}>
                        {data.count}
                    </div>
                    <div style={{color: data.percent_change > 0 ? "#6DAF56" : data.percent_change == 0 ? '#a4a2a2' : "rgba(207, 83, 62, 1)", marginLeft:2}}>
                        {
                            data.percent_change !== 0 ? <img alt={'icons'} src={data.percent_change > 0 ? arrowGreen : arrowRed}/> : <div></div>
                        }
                        <span style={{fontWeight: 700, marginLeft: 5}}>{data.percent_change?.toFixed(1)}%</span>
                    </div>
                </Space>
                {
                    dataKey === 'MonthlyTelehealths' ?
                    <Space direction={'vertical'} style={{marginLeft: 17}}>
                        <div className={'dr_counter_text'}>
                            {t("Telehealth")}
                        </div>
                        <div className={'avg_montly'}>
                            <span>{t("Calls in ")}</span>
                            <span style={{fontWeight: 700}}>{t(GMBK(ownerClinics.month_key))}</span>

                        </div>
                    </Space> : <Space direction={'vertical'} style={{marginLeft: 17}}>
                            <div className={'avg_montly'}>
                                <span>{t("Total ")}</span>
                                <span style={{fontWeight: 700}}>{t(GMBK(ownerClinics.month_key)+"’s")}</span>

                            </div>
                            <div className={'dr_counter_text'}>
                                {t("appointments")}
                            </div>
                        </Space>

                }

            </Space>
        </Spin>
    )

}

export default ClinicManagerProgressCount;