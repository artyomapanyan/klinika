import {Button, Dropdown, Space, Switch,Radio} from "antd";
import {DownOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import '../../../Fragments/Charts/ChartStyles.sass'
import {t} from "i18next";

function GradientChartApp() {


    const items = [
        {
            label: 'First Clinic',
            key: '1',
        },
        {
            label: 'Second Clinic',
            key: '2',
        },
        {
            label: 'Firth Clinic',
            key: '3',
        },
        {
            label: 'First Clinic',
            key: '4',
        },
        {
            label: 'Second Clinic',
            key: '5',
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
                        <div style={{color: "#BF539E", fontWeight: 400, fontSize:24, marginLeft:15}}>{t("All clinic")}</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
            <div>
                <Space>
                    <Switch defaultChecked onChange={switchChange} />
                    {t("Previous year")}
                    <Radio.Group defaultValue="year" size="large">
                        <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                        <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                        <Radio.Button value="month">{t(" Month ")}</Radio.Button>
                    </Radio.Group>
                    <Button><LeftOutlined /></Button>
                    <Button><RightOutlined /></Button>
                </Space>
            </div>
        </div>
    )
}
export default GradientChartApp;
