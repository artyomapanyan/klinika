import React from "react";
import {Space} from "antd";
import arrowGreen from "../../../dist/icons/arrow-green.svg";
import arrowRed from "../../../dist/icons/arrow-red.svg";
import {t} from "i18next";

function DoctorReworkedProgressChart({data}) {
    return(
        <Space>
            <Space direction={'vertical'}>
                <div className={'clinic_owner_big_text'}>
                    {data} K
                </div>
                {
                    data > 17 ? <div style={{color:"#6DAF56"}}>
                        <img alt={'icons'} src={arrowGreen}/>
                        + 12%
                    </div> : <div style={{color:"rgba(207, 83, 62, 1)"}}>
                        <img alt={'icons'} src={arrowRed}/>
                        + 10%
                    </div>
                }

            </Space>
            <Space></Space>
            <Space direction={'vertical'}>
                <div>
                    {t("Total April’s")}
                </div>
                <div className={'chart_counter_bold_text'}>
                    {t("appointments")}
                </div>
            </Space>
        </Space>
    )
}
export default DoctorReworkedProgressChart;