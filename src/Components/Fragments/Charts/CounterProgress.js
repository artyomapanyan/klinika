import {Space, Spin} from "antd";
import arrowGreen from "../../../dist/icons/arrow-green.svg";
import {t} from "i18next";
import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {postResource} from "../../Functions/api_calls";
import arrowRed from "../../../dist/icons/arrow-red.svg";

function CounterProgress() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true);
    const [data,setData] = useState({
        incomes:0,
        percentage:0,
        incomes_prev_month:0,
    });

    let date = new Date().getFullYear().toString()

    useEffect(() => {
        postResource('ClinicOwner','MonthlyIncomes', token,  ownerClinics?.id, {year: date, month: ownerClinics?.month_key}).then((response) => {
            setData(response)
            setLoading(false)
        });

    }, [ownerClinics])


    return(
        <Spin spinning={loading}>
            <Space >
                <Space direction={'vertical'} className={'progress_big_div'}>
                    <div className={'clinic_owner_big_text'}>
                        {data?.incomes} K
                    </div>
                    <div style={{color:"#6DAF56"}}>
                        {
                            data?.incomes >= data?.incomes_prev_month ? <div style={{color:"#6DAF56"}}>
                                <img alt={'icons'} src={arrowGreen}/>
                                {`${data?.percentage}% / + ${data?.incomes - data?.incomes_prev_month}`}
                            </div> : <div style={{color:"rgba(207, 83, 62, 1)"}}>
                                <img alt={'icons'} src={arrowRed}/>
                                {`${data?.percentage}% / - ${data?.incomes_prev_month - data?.incomes}`}
                            </div>
                        }
                    </div>
                </Space>
                <Space></Space>
                <Space direction={'vertical'}>
                    <div>
                        {t("Current month")}
                    </div>
                    <div className={'chart_counter_bold_text'}>
                        {t("incomes")}
                    </div>
                </Space>
            </Space>
        </Spin>

    )
}
export default CounterProgress;