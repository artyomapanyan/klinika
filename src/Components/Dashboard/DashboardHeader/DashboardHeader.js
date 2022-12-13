import React from 'react'
import {Col, Row, Select} from "antd";

import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import i18n, {changeLanguage} from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";


function DashboardHeader() {
    let lngs = useSelector((state) => state?.app?.supported_locales);
    let dispatch = useDispatch()

    const {t} = useTranslation();
    const languageChange = (value) => {
        changeLanguage(value)
        dispatch({
            type:'LANGUAGE_STATE',
            payload:value
        })
    }

    return <Row>
        <Col lg={12}>
        </Col>
        <Col lg={12} style={{display:"flex", justifyContent:"flex-end", alignItems: "center"}}>
            <Select
                defaultValue={i18n.resolvedLanguage}
                style={{width: 80}}
                onChange={(value) => languageChange(value)}
            >
                {
                    Object.keys(lngs).map((el) => (
                        <Select.Option key={el}>{lngs[el].nativeName}</Select.Option>
                    ))
                }
            </Select>
            <HeaderAccount />

        </Col>
    </Row>
}

export default DashboardHeader
