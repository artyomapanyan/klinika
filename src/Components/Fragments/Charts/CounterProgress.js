import {Space} from "antd";
import arrowGreen from "../../../dist/icons/arrow-green.svg";
import {t} from "i18next";

function CounterProgress({data}) {


    return(
        <Space>
            <Space direction={'vertical'}>
                <div className={'clinic_owner_big_text'}>
                    {data} K
                </div>
                <div style={{color:"#6DAF56"}}>
                    <img alt={'icons'} src={arrowGreen}/>
                    11% / + 12287 $
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
    )
}
export default CounterProgress;