import {changeLanguage} from "i18next";
import {Button, Dropdown, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ArrowLeftOutlined, DownOutlined} from "@ant-design/icons";
import React from "react";
import logo from "../../dist/Img/logo_klinika.png";

function AuthHeader({headerState}) {
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
        <div style={{width:'100%', position:"absolute", top:40, display: "flex", flexDirection:"row", JustifyContent:'space-around'}}>
            {
                headerState ? <div style={{marginLeft:'20%'}}>
                    <img src={logo} alt={'logo_klinika'}/>
                </div> : <Button style={{left:'3%', height: 48, width: 48, backgroundColor:'#FFFFFF3D', color:'white', fontWeight: 900, border:'none'}}><ArrowLeftOutlined /></Button>
            }
            <div style={{marginLeft:headerState ? '45%' : '90%', cursor:"pointer"}}>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                    style={{color: 'white'}}
                >
                    <Space style={{color: headerState ? "#ce4e99" : 'white', fontWeight: 700}}>
                        {lngs === "ar" ? "Arabic" : "English"}
                        <DownOutlined />
                    </Space>

                </Dropdown>
            </div>

        </div>
    )
}
export default AuthHeader;
