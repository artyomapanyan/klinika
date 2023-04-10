import {Button, Radio, Space} from "antd";
import {t} from "i18next";
import { LeftOutlined, RightOutlined} from "@ant-design/icons";

function IncomeChannelChartHead() {
    let data = ['Jeddah Clinic', 'Clinic name', 'Total']
    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:30}}>
            <Space  style={{fontSize:24, fontWeight:600}}>
                {t("Incomes")}
                    {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-${key}`}>{itemKey}</Space>)}
            </Space>
            <div>
                <Space>

                    <Radio.Group defaultValue="year" size="large">
                        <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                        <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                    </Radio.Group>
                    <Button><LeftOutlined /></Button>
                    <Button><RightOutlined /></Button>
                </Space>
            </div>
        </div>
    )
}
export default IncomeChannelChartHead;