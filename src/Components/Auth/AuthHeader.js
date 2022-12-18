import {changeLanguage} from "i18next";
import {Button, Dropdown, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ArrowLeftOutlined, DownOutlined} from "@ant-design/icons";

function AuthHeader() {
     let lngs = useSelector((state) => state?.app?.current_locale);
    let dispatch = useDispatch()

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
            dispatch({
                type:'LANGUAGE_STATE',
                payload:key
            })
        window.location.reload()
    };

    return (
        <div style={{width:'100%', position:"absolute", top:45, display: "flex", flexDirection:"row", JustifyContent:'space-around'}}>

                <Button style={{left:'3%', height: 48, width: 48, backgroundColor:'#FFFFFF3D', color:'white', fontWeight: 900, border:'none'}}><ArrowLeftOutlined /></Button>
            <div style={{marginLeft:'90%'}}>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                    style={{color: 'white'}}
                >
                    <Space style={{color: "white", fontWeight: 700}}>
                        {lngs === "en" ? "English" : "Arabic"}
                        <DownOutlined />
                    </Space>

                </Dropdown>
            </div>

        </div>
    )
}
export default AuthHeader;
