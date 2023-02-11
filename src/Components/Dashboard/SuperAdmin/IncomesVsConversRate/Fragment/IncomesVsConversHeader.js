import {Button, Space} from "antd";
import {t} from "i18next";
import { LeftOutlined, RightOutlined} from "@ant-design/icons";

function IncomesVsConversHeader() {
    let data = ['Jeddah Clinic', 'Clinic name']
    return(
        <div style={{padding:30}}>
            <Space className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                {t("Incomes vs Conversion Rate")}
                <Button><LeftOutlined /></Button>
                <Button><RightOutlined /></Button>
            </Space>
            <div>
                {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-${key}`}>{itemKey}</Space>)}
            </div>

        </div>
    )
}
export default IncomesVsConversHeader;