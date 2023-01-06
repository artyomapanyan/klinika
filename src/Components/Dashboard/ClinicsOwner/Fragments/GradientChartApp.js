import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {changeLanguage} from "i18next";
import '../../../Fragments/Charts/ChartStyles.sass'

function GradientChartApp() {
    let a = ['sdf', 'sdf', 'ggg', 'aaa']

    const items = [
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
        changeLanguage(key)

    };
    return(
        <div>
            <div className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                Appointments:
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                    style={{color: 'white', size:'large'}}
                >
                    <Space direction={'horizontal'}>
                        <div style={{color: "#BF539E", fontWeight: 400, fontSize:24}}>All clinic</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
            <div>

            </div>
        </div>
    )
}
export default GradientChartApp;