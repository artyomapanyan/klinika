import './App.css';
import React, {useEffect} from 'react';
import {ConfigProvider} from 'antd';
import hy from "antd/locale/hy_AM";
import {useDispatch, useSelector} from "react-redux";
import "./dist/styles/Styles.sass"
import AppRoutes from "./Components/AppRoutes";
import axios from "axios";
import api from "./Api";


function App() {
    let languageState = useSelector((state) => state.languageState);
    let dispatch = useDispatch()
    axios.defaults.headers.common['Accept-Language'] = languageState
    useEffect(()=>{
        axios.get(`${api.apiEndpoint}${api.version}/app`).then(response=>{
            dispatch({
                type:'APP',
                payload:response
            })
        })
    },[dispatch])

    return (
        <span className={languageState??'en'}>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ce4e99',
                    color: '#fcfcfc',
                },
            }}
            direction={languageState==='ar' ? "rtl" :"ltr" }
            locale={hy}
        >
            <AppRoutes/>
        </ConfigProvider>
        </span>
    );
}

export default App;
