import React from 'react'
import {Col, Row, Select} from "antd";

import "../../../Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import i18n, {changeLanguage} from "i18next";


function DashboardHeader() {



    const lngs = {
        en: {nativeName: 'En'},
        hy: {nativeName: 'Հայ'},
    }
    const languageChange = (value) => {
        changeLanguage(value)
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
