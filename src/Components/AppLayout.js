import React, {useState} from "react";
import {Button, Input, Layout, Progress, Row, Select, Tag} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import i18n, {changeLanguage} from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import "../Styles.sass"
import DashboardMenu from "./Dashboard/DashboardMenu/DashboardMenu";
import DashboardHeader from "./Dashboard/DashboardHeader/DashboardHeader";



function AppLayout(){
    let redux = useSelector((state) => state);
    let dispatch = useDispatch()

    const {t} = useTranslation()

    const [mouseCollapsed, setMauseCollapsed] = useState(true);
    const [btnCollapsed, setBtnCollapsed] = useState(false);
    const lngs = {
        en: {nativeName: 'En'},
        hy: {nativeName: 'Հայ'},
        ru: {nativeName: 'Ру'}
    }

    const ltrToRtl = () => {
        dispatch({
            type: 'GLOBAL_STATE',
            payload: !redux.globalState,
        })
    }

    const onLanguage = () => {
        dispatch({
            type: 'LANGUAGE_STATE',
            payload: !redux.languageState,
        })
    }

    const toggleCollapsed = () => {
        setMauseCollapsed(true);
    };
    const toggleCollapsed1 = () => {
        setMauseCollapsed(false);
    };

    const languageChange = (value) => {
        changeLanguage(value)

    }

    const fixCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }

    return <Layout>
        <div className="all-div">
            <div className="nav" style={{position: "relative", width: 80, zIndex: 99}}>
                <Sider collapsed={mouseCollapsed} style={{position: 'absolute', height: "100vh"}}
                       onMouseEnter={toggleCollapsed1}
                       onMouseLeave={!btnCollapsed ? toggleCollapsed : toggleCollapsed1}>
                    <DashboardMenu mouseCollapsed={mouseCollapsed} fixCollapse={fixCollapse}/>
                </Sider>

            </div>
            <div className="header" style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>
                <DashboardHeader/>

            </div>


            <Content className="content"  style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>
                <Button type={"secondary"} onClick={ltrToRtl}>{!redux.globalState ? 'ltr' : 'rtl'}</Button>
                <Button onClick={onLanguage} type={"primary"}>{!redux.languageState ? 'hy' : 'ru'}</Button>

                <h2>{t('learn')}</h2>
                <Input/>


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
            </Content>
            <div className="footer" style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>

            </div>
        </div>
    </Layout>

}
export default AppLayout
