import React from 'react'
import {Col, Row, Select} from "antd";

import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import {changeLanguage} from "i18next";
import {useDispatch, useSelector} from "react-redux";


function DashboardHeader() {
    let {supported_locales,current_locale} = useSelector((state) => state?.app);
    let dispatch = useDispatch()
    const languageChange = (value) => {
        changeLanguage(value)
        dispatch({
            type:'LANGUAGE_STATE',
            payload:value
        })
        window.location.reload()
    }


    return <Row>
        <Col lg={12}>
        </Col>
        <Col lg={12} style={{display:"flex", justifyContent:"flex-end", alignItems: "center"}} className={'lng_select'}>
            <Select
                defaultValue={current_locale}
                style={{width: 120, borderRadius:15}}
                onChange={languageChange}
                className={'lngSelect'}
            >
                {
                    Object.keys(supported_locales??[]).map((el) => (
                        <Select.Option key={el}>{supported_locales[el].native}</Select.Option>
                    ))
                }
            </Select>
            <HeaderAccount />

        </Col>
    </Row>
}

export default DashboardHeader
