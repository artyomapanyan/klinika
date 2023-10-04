import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {changeLanguage} from "i18next";
import logo from "../../../../dist/Img/logo_klinika.png";
import {Button, Dropdown, Space} from "antd";
import {ArrowLeftOutlined, DownOutlined} from "@ant-design/icons";
import React from "react";

function NavbarOffersHeader({headerState}) {
    let lngs = useSelector((state) => state?.app?.current_locale);
    let dispatch = useDispatch()
    const navigate = useNavigate()

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
        
        <div style={{width:'100%', position:"absolute", top:0, display: "flex", flexDirection:"row", JustifyContent:'space-around', alignItems: 'center'}}
        className={'navbar_offer_new'}>
            {
                headerState ? <div style={{marginLeft:'8%'}}>
                    <div style={{display:'flex',alignItems: 'center'}}>
                    <img src={logo} alt={'logo_klinika'}/>
                    <div className={'back_offer'} onClick={()=>navigate(-1)}>Back to all offers</div>
                     </div>   
                   
                </div> : <Button onClick={()=>navigate(-1)} style={{left:'3%', height: 48, width: 48, backgroundColor:'#FFFFFF3D', color:'white', fontWeight: 900, border:'none'}}><ArrowLeftOutlined /></Button>
            }
            <div className={'all_offers_header_lng'}>
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
export default NavbarOffersHeader;
