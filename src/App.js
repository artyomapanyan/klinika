import './App.css';
import React from 'react';
import {Button, ConfigProvider} from 'antd';
import hy from "antd/locale/hy_AM";
import {useSelector} from "react-redux";
import "./Styles.sass"

import AppLayout from "./Components/AppLayout";
import {Route, Routes} from "react-router";
import Login from "./Components/Auth/Login";


function App() {
    let redux = useSelector((state) => state);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#fc0398',
                    color: '#fcfcfc',
                },
            }}
            direction={!redux.globalState ? "ltr" : "rtl"}
            locale={hy}
        >
        <Routes>
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'dashboard/*'} element={<AppLayout/>}></Route>
        </Routes>
        </ConfigProvider>
    );
}

export default App;
