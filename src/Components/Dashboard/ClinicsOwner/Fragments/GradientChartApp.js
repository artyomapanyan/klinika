import {Button, Dropdown, Space, Switch} from "antd";
import {DownOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import '../../../Fragments/Charts/ChartStyles.sass'
import {t} from "i18next";

function GradientChartApp() {


    const items = [
        {
            label: 'English',
            key: 'en',
        },
        {
            label: 'Arabic',
            key: 'ar',
        },
        {
            label: 'English',
            key: 'en',
        },
        {
            label: 'Arabic',
            key: 'ar',
        },

    ];
    const onClick = ({key}) => {
        console.log(key)

    };

    const switchChange = (checked) => {
        console.log(`switch to ${checked}`);
    };


    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:30}}>
            <div className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                Appointments:
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{color: "#BF539E", fontWeight: 400, fontSize:24, marginLeft:15}}>All clinic</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
            <div>
                <Space>
                    <Switch defaultChecked onChange={switchChange} />
                    Previous year
                    <Button type={'secondary'}>{t("12 Month")}</Button>
                    <Button>{t("1/2 Year")}</Button>
                    <Button>{t(" Month ")}</Button>
                    <Button><LeftOutlined /></Button>
                    <Button><RightOutlined /></Button>
                </Space>
            </div>
        </div>
    )
}
export default GradientChartApp;