import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {changeLanguage} from "i18next";
import logo from "../../../dist/icons/favicon.png";
import {Button, Dropdown, Space} from "antd";
import {ArrowLeftOutlined, DownOutlined} from "@ant-design/icons";
import React from "react";

function AllOffersMobileHeader() {
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
        <div className={'all_offers_mobile_big_div'}>

                <img src={logo} alt={'logo_klinika'}/>

            <div className={"all_offers_mobile_dropDown_div"}>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                    style={{color: 'white'}}
                >
                    <Space style={{color: "#ce4e99", fontWeight: 700}}>
                        {lngs === "ar" ? "Arabic" : "English"}
                        <DownOutlined />
                    </Space>

                </Dropdown>
            </div>



        </div>
    )
}
export default AllOffersMobileHeader;