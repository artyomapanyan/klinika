import React, {useState} from "react";
import {Button, Divider, Input, Layout, Menu, Progress, Row, Select, Tag} from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "../dist/Img/logo.svg";
import logoShort from "../dist/Img/Logo-short.svg";
import {MenuOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import i18n, {changeLanguage} from "i18next";
import dash1 from "../dist/icons/frame1.svg";
import dash2 from "../dist/icons/frame2.svg";
import dash3 from "../dist/icons/frame3.svg";
import dash4 from "../dist/icons/frame4.svg";
import dash5 from "../dist/icons/frame5.svg";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import "../Styles.sass"



function AppLayout(){
    let redux = useSelector((state) => state);
    let dispatch = useDispatch()

    const {t} = useTranslation()

    const [mauseCollapsed, setMauseCollapsed] = useState(true);
    const [btnCollapsed, setBtnCollapsed] = useState(false);
    // function refreshPage() {
    //     window.location.reload(false);
    // }
    const lngs = {
        en: {nativeName: 'En'},
        hy: {nativeName: 'Հայ'},
        ru: {nativeName: 'Ру'}
    }
    const items = [
        {
            key: `/age-categories`,
            label: t("dashboard"),
            icon: <img alt={'icons'} src={dash1}/>,
        },
        {
            key: `/match-event-natures`,
            label: `Schedlue`,
            icon: <img alt={'icons'} src={dash2}/>,
        },
        {
            key: `/age-categories`,
            label: `Offers`,
            icon: <img alt={'icons'} src={dash3}/>,
        },
        {
            label: `Profile`,
            icon: <img alt={'icons'} src={dash4}/>,
            children: [
                {
                    key: 'road-expense-calculator',
                    label: `RoadExpenseCalculator`,
                },
                {
                    key: 'documents/new',
                    label: `NewDocuments`,
                },
            ]
        },
        {
            key: `/match-event-natures`,
            label: `Reviews`,
            icon: <img alt={'icons'} src={dash5}/>,
        },
    ];

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
                <Sider collapsed={mauseCollapsed} style={{position: 'absolute', height: "100vh"}}
                       onMouseEnter={toggleCollapsed1}
                       onMouseLeave={!btnCollapsed ? toggleCollapsed : toggleCollapsed1}>
                    <div style={{
                        overflow: 'hidden', display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {!mauseCollapsed ? <div><img src={logo} alt={'logo'} style={{margin: 20}}/></div> :
                            <img src={logoShort} alt={'logo'} style={{margin: 20}}/>}
                        {!mauseCollapsed ?
                            <Button onClick={fixCollapse} style={{border: 'none'}}><MenuOutlined/></Button> : null}
                    </div>
                    <Divider/>
                    <Menu

                        mode="inline"
                        theme="light"
                        inlineCollapsed={false}
                        triggerSubMenuAction={'click'}
                        subMenuCloseDelay={0}
                        items={items}
                        style={{fontSize: 16}}

                    />
                </Sider>

            </div>
            <div className="header" style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>
                <Row>
                    <Button type={'primary'}>sdsd</Button>

                </Row>

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
                <Tag color="#f50">a</Tag>
                <Progress
                    type="circle"
                    percent={75}
                    width={100}
                    strokeWidth={20}
                />
                <Progress
                    percent={30}
                    strokeWidth={40}
                    style={{width: 200}}
                />
                <Button type={"primary"}>primary</Button>
                <Button type={"secondary"}>secondary</Button>
            </Content>
            <div className="footer" style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>

            </div>
        </div>
    </Layout>

}
export default AppLayout
