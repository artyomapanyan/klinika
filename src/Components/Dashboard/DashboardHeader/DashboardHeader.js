import React from 'react'
import {Col, Row, Select} from "antd";

import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import i18n, {changeLanguage} from "i18next";
import {useDispatch, useSelector} from "react-redux";


function DashboardHeader() {
    let lngs = useSelector((state) => state?.app?.supported_locales);
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
        <Col lg={12} style={{display:"flex", justifyContent:"flex-end", alignItems: "center"}}>
            <Select
                defaultValue={i18n.resolvedLanguage}
                style={{width: 80}}
                onChange={languageChange}
            >
                {
                    Object.keys(lngs??[]).map((el) => (
                        <Select.Option key={el}>{lngs[el].nativeName}</Select.Option>
                    ))
                }
            </Select>
            <HeaderAccount />

        </Col>
    </Row>
}

export default DashboardHeader
