import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {changeLanguage, t} from "i18next";
import logo from "../../../../dist/icons/favicon.png";
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
            label: t('Arabic'),
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
        <div className={'navbar_offer_new'} >
            <div style={{width:'80%', padding:15, display: "flex", flexDirection:"row", justifyContent:'space-between', alignItems: 'center'}}
                 >

                {
                    headerState ? <div >
                        <div style={{display:'flex',alignItems: 'center'}}>
                            <img src={logo} alt={'logo_klinika'}/>
                            <div className={'back_offer'} onClick={()=>navigate('/offers')}>{t('Back to all offers')}</div>
                        </div>

                    </div> : <Button onClick={()=>navigate(-1)} style={{left:'3%', height: 48, width: 48, backgroundColor:'#FFFFFF3D', color:'white', fontWeight: 900, border:'none'}}><ArrowLeftOutlined /></Button>
                }
                <div className={'all_offers_header_lng'}>
                    {/*<Dropdown*/}
                    {/*    menu={{*/}
                    {/*        items,*/}
                    {/*        onClick,*/}
                    {/*    }}*/}
                    {/*    trigger={['click']}*/}
                    {/*    style={{color: 'white'}}*/}
                    {/*>*/}
                    {/*    <Space style={{color: headerState ? "#ce4e99" : 'white', fontWeight: 700}}>*/}
                    {/*        {lngs === "ar" ? `${t("Arabic")}` : "English"}*/}
                    {/*        <DownOutlined />*/}
                    {/*    </Space>*/}

                    {/*</Dropdown>*/}
                </div>
            </div>
        </div>

    )
}
export default NavbarOffersHeader;
